export const saveTransaction = async (transactions) => {
    try {
        const response = await fetch('http://0.0.0.0:4000/generate-pdf/', {
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
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        const fs = require('fs');
        const path = require('path');
        const pdfPath = path.join(__dirname, 'public', 'generated.pdf');
        fs.writeFileSync(pdfPath, pdfBuffer);
        
        return pdfPath;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
