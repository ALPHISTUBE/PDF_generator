from datetime import datetime
from typing import List
from dotenv import load_dotenv
import os
from models import SMS
from google_auth_oauthlib.flow import Flow
load_dotenv()

country_currency_codes = sorted([
    "AFN", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYN", "BZD", "BMD", 
    "BTN", "BOB", "BAM", "BWP", "BRL", "BND", "BGN", "BIF", "CVE", "KHR", "CAD", "KYD", "XAF", "XPF", "CLP", "CNY", 
    "COP", "KMF", "CDF", "CRC", "HRK", "CUP", "CZK", "DKK", "DJF", "DOP", "XCD", "EGP", "ERN", "ETB", "EUR", "FJD", 
    "GMD", "GEL", "GHS", "GIP", "GTQ", "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "IRR", "IQD", 
    "ILS", "JMD", "JPY", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LBP", "LSL", "LRD", "LYD", "MOP", "MKD", "MGA", 
    "MWK", "MYR", "MVR", "MRU", "MUR", "MXN", "MDL", "MNT", "MAD", "MZN", "MMK", "NAD", "NPR", "ANG", "TWD", "NZD", 
    "NIO", "NGN", "KPW", "NOK", "OMR", "PKR", "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON", "RUB", "RWF", 
    "SHP", "WST", "STN", "SAR", "RSD", "SCR", "SLL", "SGD", "SBD", "SOS", "ZAR", "KRW", "SSP", "LKR", "SDG", "SRD", 
    "SZL", "SEK", "CHF", "SYP", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "GBP", 
    "USD", "UYU", "UZS", "VUV", "VES", "VND", "YER", "ZMW", "ZWL"
])

country_currency_sign = sorted([
    "؋", "L", "دج", "Kz", "$", "֏", "ƒ", "$", "₼", "$", "ب.د", "৳", "$", "Br", "$", "$", "Nu.", "Bs.", "KM", "P", "R$", 
    "$", "лв", "FBu", "$", "៛", "$", "$", "FCFA", "₣", "$", "¥", "$", "CF", "₡", "kn", "₱", "Kč", "kr", "Fdj", "RD$", 
    "$", "£", "Nfk", "Br", "€", "$", "D", "₾", "₵", "£", "Q", "FG", "$", "G", "L", "$", "Ft", "kr", "₹", "Rp", "﷼", 
    "ع.د", "₪", "$", "¥", "د.ا", "лв", "Sh", "د.ك", "лв", "₭", "ل.ل", "L", "$", "ل.د", "MOP$", "ден", "Ar", "MK", 
    "RM", "Rf", "UM", "₨", "$", "L", "₮", "MAD", "MT", "K", "$", "₨", "ƒ", "$", "$", "C$", "₦", "₩", "kr", "﷼", 
    "₨", "B/.", "K", "₲", "S/.", "₱", "zł", "﷼", "lei", "₽", "FRw", "£", "T", "Db", "﷼", "дин", "₨", "Le", "$", 
    "$", "Sh", "R", "₩", "£", "Rs", "£", "$", "E", "kr", "CHF", "£", "ЅМ", "Sh", "฿", "T$", "$", "د.ت", "₺", "m", 
    "Sh", "₴", "د.إ", "£", "$", "$", "лв", "VT", "Bs.S", "₫", "﷼", "ZK", "Z$"
])

transactional_keywords = ['transaction', 'payment', 'purchase', 'order', 'confirmation', 'receipt', 'invoice', 'bill', 'pay', 'charge', 'transfer', 'credited', 'debited', 'withdrawn', 'deposit']

banks = {
    "BDT": ["DBBL", "BRAC", "EBL", "UCBL", "MTBL", "IFIC", "NBL", "SIBL", "EXIM", "SJIBL", "MBL", "PBL", "RBL", "SBL", "TBL", "UBL"]
}

types = {
    'Income' : ['debit', 'deposit', 'payment', 'insurance', 'premium'],
    'Expense' : ['credited', 'withdrawn', 'charge', 'bill', 'transfer'],
    'Asset' : ['purchase', 'order'],
    'Liability' : ['confirmation', 'receipt', 'invoice', 'loan', 'repayment']
}

def is_transactional(message: str) -> bool:
    message_lower = message.lower()
    for keyword in transactional_keywords:
        if keyword in message_lower:
            return True
    return False

def get_transaction_info(message: str) -> bool:
    currency = None
    amount = None
    type = None
    merchant = None
    bank = None
    ac = None
    balance = None
    
    message_lower = message.lower()
    for code in country_currency_codes:
        if code.lower() in message_lower:
            currency = code
            break
    if currency == None:
        currency = 'USD'
    replacements = {
        "account": "ac",
        "no": "",
        "$": "",
        ",": "",
        ":": "",
        "debited" : currency.lower(),
        "credited" : currency.lower(),
        "repayment" : currency.lower(),
        "payment" : currency.lower(),
        "charged" : currency.lower(),
        "bill" : currency.lower(),
        "premium" : currency.lower(),
    }
    for old, new in replacements.items():
        message_lower = message_lower.replace(old, new)
    keywords = message_lower.split(" ")
    print(keywords)
    serial_search = ['AC','balance', currency.lower(), 'date', 'time', 'bank', 'type']
    for search in serial_search:
        for i in range(len(keywords)):
            if keywords[i] == 'ac':
                ac = keywords[i + 1]
            elif search == keywords[i] and search == currency.lower():
                amount = get_amount(keywords, i, amount)
            elif search == 'date':
                date = is_date(keywords[i])
            elif search == 'time':
                time = is_time(keywords[i])
            elif search == 'balance' and keywords[i] == 'balance':
                balance = get_balance(keywords, i, currency.lower(), balance)
            elif search == 'bank':
                bank = next((b for b in banks.get(currency, []) if b.lower() in message_lower), None)
            elif search == 'type':
                type = get_type(keywords[i], type)
    return {
        "date" : f"{date} {time}",
        "ac": ac,
        "currency": currency,
        "type": type,
        "merchant": merchant,
        "bank": bank,
        "amount": amount,
        "balance": balance
    }        

def is_date(string: str) -> bool:
    try:
        date = datetime.strptime(string, "%Y-%m-%d")
        return date
    except ValueError:
        return None
    
def is_time(string: str) -> datetime:
    try:
        time = datetime.strptime(string, "%H:%M:%S")
        return time
    except ValueError:
        return None


def get_balance(keywords: List[str], i: int, currency : str, balance) -> str:
    for j in range(i-3, i):
        try:
            if j >= 0:
                if keywords[j] == currency:
                    keywords[j] = ''
                else:
                    balance = float(keywords[j])
                    return balance
        except ValueError:
            continue
    for j in range(i+1, i+4):
        try:
            if j <= len(keywords) - 1:
                if keywords[j] == currency:
                    keywords[j] = ''
                else:
                    balance = float(keywords[j])
                    return balance
        except ValueError:
            continue
    return balance

def get_amount(keywords: List[str], i: int, amount) -> str:
    for j in range(i-3, i):
        try:
            if j >= 0:
                amount = float(keywords[j])
                return amount
        except ValueError:
            continue
    for j in range(i+1, i+4):
        try:
            if j <= len(keywords) - 1:
                amount = float(keywords[j])
                return amount
        except ValueError:
            continue
    return amount

def get_type(keyword : str, type):
    print(keyword)
    for key, keywords in types.items():
        if keyword in keywords:
            return key
    return type

CLIENT_ID = os.environ["CLIENT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]
REDIRECT_URI = os.environ["REDIRECT_URI"]
SCOPES = os.environ["SCOPES"]

flow = Flow.from_client_config(
    {
        "web": {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "redirect_uris": [REDIRECT_URI],
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
        }
    },
    scopes=SCOPES,
    redirect_uri=REDIRECT_URI,
)