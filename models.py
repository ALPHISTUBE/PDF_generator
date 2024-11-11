from pydantic import BaseModel
from typing import List

class Transaction(BaseModel):
    report_name: str
    date: str
    merchant: str
    category: str
    status: str
    way: str
    amount: str
    attachment: List[str]

class SMS(BaseModel):
    message: str