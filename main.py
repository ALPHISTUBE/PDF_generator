import html
import re
import uvicorn
import pdfkit
import os
from fastapi import FastAPI, Depends, HTTPException, Request, Cookie
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google.auth.transport.requests import Request as GoogleRequest
import google
from typing import List
import base64
from models import Transaction, TokenData, SMS
from sms_2_transaction import is_transactional, get_transaction_info
from google_auth_oauthlib.flow import Flow
import ast
import json
from html2text import html2text


html_file_path = os.path.abspath('pdf_format/index.html')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Only allow your frontend origin
    allow_credentials=True,  # Allow credentials like cookies
    allow_methods=["GET", "POST"],  # Adjust methods if needed
    allow_headers=["*"],  # Allow all headers
)

@app.post("/generate-pdf/")
def generate_pdf(transactions: List[Transaction]):
    html_content = """
    <html>
    <head>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 10px;
                text-align: left;
            }
        </style>
    </head>
    <body>
        <h2>Transaction Report</h2>
        <table>
            <tr>
                <th>Report Name</th>
                <th>Date</th>
                <th>Merchant</th>
                <th>Category</th>
                <th>Status</th>
                <th>Way</th>
                <th>Amount</th>
            </tr>
    """
    total_amount = 0
    for transaction in transactions:
        amount = float(transaction.amount)
        html_content += f"""
            <tr>
                <td>{transaction.report_name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.merchant}</td>
                <td>{transaction.category}</td>
                <td>{transaction.status}</td>
                <td>{transaction.way}</td>
                <td>{amount}</td>
            </tr>
        """
        total_amount += amount

    html_content += f"""
        </table>
        <h3>Total Amount: {total_amount}</h3>
    </body>
    </html>
    """

    with open('temp.html', 'w') as file:
        file.write(html_content)

    pdfkit.from_file('temp.html', 'output.pdf')

    with open('output.pdf', 'rb') as pdf_file:
        pdf_base64 = base64.b64encode(pdf_file.read()).decode('utf-8')

    return {"pdf_base64": pdf_base64}

@app.post("/detect-sms/")
async def detect_sms(sms: SMS):
    if is_transactional(sms.message):
        return {"data": get_transaction_info(sms.message), "message": "This is a transactional SMS"}
    else:
        return {"status": "non-transaction", "message": "This is not a transactional SMS"}

@app.get("/auth/google/")
async def auth_google():
    authorization_url, state = flow.authorization_url(
        access_type="offline", prompt="consent"
    )
    return RedirectResponse(authorization_url)

@app.get("/auth/google/callback")
async def auth_google_callback(request: Request):
    flow.fetch_token(authorization_response=str(request.url))
    credentials = flow.credentials

    token_data = TokenData(
        access_token=credentials.token,
        refresh_token=credentials.refresh_token,
        token_type="Bearer",
        expires_in=credentials.expiry,
        scope=" ".join(credentials.scopes),
    )

    # Create a redirect response
    response = RedirectResponse(url="http://localhost:3000/mail-to-transaction-info")

    # Set each token data separately in the cookie
    response.set_cookie(key="access_token", value=token_data.access_token, secure=True)
    response.set_cookie(key="refresh_token", value=token_data.refresh_token, secure=True)
    response.set_cookie(key="token_type", value=token_data.token_type, secure=True)
    response.set_cookie(key="expires_in", value=int(token_data.expires_in), secure=True)
    response.set_cookie(key="scope", value=token_data.scope, secure=True)

    return response

@app.post("/refresh-token")
async def refresh_token(refresh_token: str):
    try:
        # Refresh the token
        credentials = Credentials(
            token=None,
            refresh_token=refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=os.environ["CLIENT_ID"],
            client_secret=os.environ["CLIENT_SECRET"],
        )
        credentials.refresh(GoogleRequest())
        # Return the new access token
        return {
            "access_token": credentials.token,
            "expires_in": credentials.expiry,
            "token_type": credentials.token_type,
            "scope": " ".join(credentials.scopes),
        }
    except Exception as e:
        print("Error refreshing token:", e)
        raise HTTPException(status_code=500, detail="Failed to refresh token")

def strip_html_tags(html_text):
    return html2text(html_text)

@app.post("/fetch-emails")
async def fetch_emails(token_data: dict):
    if not token_data:
        raise HTTPException(status_code=401, detail="User not authenticated")

    if not all(key in token_data for key in ["accessToken", "refreshToken", "tokenType", "scope"]):
        raise HTTPException(status_code=400, detail="Missing required token fields")

    try:
        credentials = Credentials(
            token=token_data["accessToken"],
            refresh_token=token_data["refreshToken"],
            token_uri="https://oauth2.googleapis.com/token",
            scopes=token_data["scope"].split(),
        )
        service = build("gmail", "v1", credentials=credentials)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to initialize Gmail service")

    try:
        results = service.users().messages().list(
            userId="me",
            labelIds=["INBOX"],
            maxResults=5,
            q="newer_than:1d -category:social -category:promotions"
        ).execute()
        
        messages = results.get("messages", [])
        email_data = []

        for message in messages:
            # Fetch full message details for each email ID
            msg = service.users().messages().get(userId="me", id=message["id"], format="full").execute()

            # Extract headers and body
            payload = msg.get("payload", {})
            headers = payload.get("headers", [])
            parts = payload.get("parts", [])

            # Extract specific header fields
            subject = next((header["value"] for header in headers if header["name"] == "Subject"), None)
            sender = next((header["value"] for header in headers if header["name"] == "From"), None)

            # Find the plain text or HTML part of the message body
            body_html = ""
            body_text = ""
            for part in parts:
                mime_type = part.get("mimeType")
                body_data = part.get("body", {}).get("data")
                
                if body_data:
                    decoded_data = base64.urlsafe_b64decode(body_data).decode("utf-8")
                    if mime_type == "text/plain":
                        body_text = decoded_data
                    elif mime_type == "text/html":
                        body_html = decoded_data
                        body_text = strip_html_tags(decoded_data)
            
            email_data.append({
                "id": msg["id"],
                "threadId": msg["threadId"],
                "subject": subject,
                "sender": sender,
                "snippet": msg["snippet"],
                "body": body_text,
                "data": {
                    "status": "transaction" if is_transactional(body_text) else "non-transaction",
                    "message": "This is a transactional email" if is_transactional(body_text) else "This is not a transactional email",
                    "info": get_transaction_info(body_text) if is_transactional(body_text) else ""
                }
            })

        return JSONResponse(content={"emails": email_data})

    except Exception as e:
        if isinstance(e, google.auth.exceptions.RefreshError):
            raise HTTPException(status_code=401, detail="Token expired or invalid")
        else:
            raise HTTPException(status_code=500, detail="Failed to fetch emails")



if __name__ == "__main__":
    client_id = os.environ["CLIENT_ID"]
    client_secret = os.environ["CLIENT_SECRET"]
    redirect_url = os.environ["REDIRECT_URI"]
    scope = [os.environ["SCOPES"]]

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": client_id,
                "client_secret": client_secret,
                "redirect_uris": [redirect_url],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/userinfo.email", "openid"],
        redirect_uri=redirect_url,
    )

    uvicorn.run(app, host="0.0.0.0", port=4001)
