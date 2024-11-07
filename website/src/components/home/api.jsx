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
        const response = await fetch('http://localhost:4000/generate-pdf/', {
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
