import uvicorn
import pdfkit
import os
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2 import Credentials
from googleapiclient.discovery import build
from pydantic import BaseModel
from typing import List
import base64
from models import Transaction
from sms_2_transaction import SMS, is_transactional, get_transaction_info, flow


html_file_path = os.path.abspath('pdf_format/index.html')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
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

@app.get("/auth/google")
async def google_login():
    authorization_url, state = flow.authorization_url(
        access_type="offline", include_granted_scopes="true"
    )
    return RedirectResponse(authorization_url)
    
@app.get("/auth/google/callback")
async def google_callback(request: Request):
    flow.fetch_token(authorization_response=str(request.url))
    credentials = flow.credentials
    request.state.credentials = credentials_to_dict(credentials)
    return RedirectResponse(url="/fetch-emails")

def credentials_to_dict(credentials):
    return {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes,
    }

@app.get("/fetch-emails")
async def fetch_emails(request: Request):
    if not request.state.credentials:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    credentials = Credentials(**request.state.credentials)
    service = build("gmail", "v1", credentials=credentials)
    results = service.users().messages().list(userId="me", labelIds=["INBOX"], maxResults=5).execute()
    messages = results.get("messages", [])

    email_data = []
    for message in messages:
        msg = service.users().messages().get(userId="me", id=message["id"]).execute()
        email_data.append({
            "id": msg["id"],
            "snippet": msg["snippet"],
        })

    return JSONResponse(content={"emails": email_data})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4001)
