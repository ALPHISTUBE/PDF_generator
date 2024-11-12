from pydantic import BaseModel, validator
from typing import List
from datetime import datetime

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

class TokenData(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int  # Number of seconds until expiration
    scope: str

    # Validator to ensure expires_in is an integer
    @validator("expires_in", pre=True, always=True)
    def convert_expires_in(cls, v):
        # If expires_in is a datetime, convert it to seconds remaining
        if isinstance(v, datetime):
            v = int((v - datetime.utcnow()).total_seconds())
        elif not isinstance(v, int):
            # Handle any non-int or non-datetime values
            raise ValueError("expires_in must be an integer or a datetime.")
        return v