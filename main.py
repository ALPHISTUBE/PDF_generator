import uvicorn
import pdfkit
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import base64
from sms_2_transaction import SMS, is_transactional, read_latest_email, get_transaction_info

# Path to the HTML file
html_file_path = os.path.abspath('pdf_format/index.html')

# Convert HTML file to PDF
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=False,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Transaction(BaseModel):
    report_name: str
    date: str
    merchant: str
    category: str
    status: str
    way: str
    amount: str  # Change to string to match the payload
    attachment: List[str]

@app.post("/generate-pdf/")
def generate_pdf(transactions: List[Transaction]):
    # Create HTML content
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
        amount = float(transaction.amount)  # Convert amount to float
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

    # Save HTML content to a file
    with open('temp.html', 'w') as file:
        file.write(html_content)

    # Convert HTML file to PDF
    pdfkit.from_file('temp.html', 'output.pdf')

    # Read the PDF file and encode it to base64
    with open('output.pdf', 'rb') as pdf_file:
        pdf_base64 = base64.b64encode(pdf_file.read()).decode('utf-8')

    return {"pdf_base64": pdf_base64}

@app.post("/detect-sms/")
async def detect_sms(sms: SMS):
    # Detect whether the SMS is transactional or not
    if is_transactional(sms.message):
        return {"data": get_transaction_info(sms.message), "message": "This is a transactional SMS"}
    else:
        return {"status": "non-transaction", "message": "This is not a transactional SMS"}

@app.get("/read-latest-email")
async def get_latest_email():
    email_data = read_latest_email()
    return email_data

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4001)
