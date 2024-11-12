import axios from 'axios';
import Cookies from 'js-cookie';

export async function GetUserInfo (){
    // Read the tokens from client-side cookies using js-cookie
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    const tokenType = Cookies.get('token_type');
    const expiresIn = Cookies.get('expires_in');
    const scope = Cookies.get('scope');
    console.log("Access token:", accessToken);

    // Create a JSON object with the token information
    const tokenInfo = {
        accessToken,
        refreshToken,
        tokenType,
        expiresIn,
        scope
    };

    return tokenInfo;
};

export async function fetchEmailAxios() {
    let user = await GetUserInfo(); // Get token from cookies

    if (!user.accessToken) {
        throw new Error("User not authenticated"); // No token, user is not authenticated
    }

    try {
        // Fetch emails with the token included in the request body
        let response = await axios.post("http://localhost:4001/fetch-emails", user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // Ensure credentials are included for authentication
        });

        const data = response.data;
        console.log("Response:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Error fetching emails");
    }
}


const base64toBlob = (base64, mime) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
};

export const saveTransaction = async (transactions) => {
    try {
        const response = await fetch('http://localhost:4001/generate-pdf/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactions)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json();
        const pdfBase64 = data.pdf_base64;
        const pdfBlob = base64toBlob(pdfBase64, 'application/pdf');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        return pdfUrl;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}

export const getTransactionFromSMS = async (sms) => {
    try{
        const response = await fetch('http://localhost:4001/detect-sms/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({'message' : sms})
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
