# PDF Transaction Generator

A web application for creating and saving transactions as a PDF. The backend is built with **FastAPI** and uses `pdfkit` to generate PDFs, while the frontend is built with **Next.js**. Users can add transactions on the frontend and save them as a PDF, which is generated by the backend and returned as a Base64-encoded string.

## Project Structure


## Features

- **Add Transaction**: Adds a transaction to a table in the front end.
- **Save Transaction as PDF**: Sends all transactions to the backend via a POST request, generates a PDF, and returns it as a Base64-encoded string.

## Prerequisites

- Python 3.8+ (backend)
- Node.js and npm (frontend)
- `wkhtmltopdf` installed on your system (required by `pdfkit` for PDF generation)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/pdf-transaction-generator.git
   cd pdf-transaction-generator
2. **Backend Setup:**
   ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
   
3. **Frontend Setup:**
   ```bash
    cd website
    npm install  # Or `yarn install`

3. **Server Start:**
   ```bash
   #start 2 terminal for both server
   #backend
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   python main.py
   #frontend
   cd website
   npm run dev
## Preview
![Screenshot from 2024-11-07 11-10-47](https://github.com/user-attachments/assets/67bfc960-7354-4097-921a-3287d785c875)
![Screenshot from 2024-11-07 11-11-03](https://github.com/user-attachments/assets/b7664dd5-d81f-4740-be75-1bf76dbb3e4f)
![Screenshot from 2024-11-07 11-29-45](https://github.com/user-attachments/assets/fe1f0ae2-9bec-4b6c-9361-f3a534bf6a0b)
![Screenshot from 2024-11-07 11-30-06](https://github.com/user-attachments/assets/bf57cd14-52b5-4748-8d8d-0978f9602596)
