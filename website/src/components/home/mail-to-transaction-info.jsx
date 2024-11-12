'use client'
import { useEffect, useState } from 'react';
import { GetUserInfo, fetchEmailAxios } from './api';
import Cookies from 'js-cookie';

export default function Mail_To_Transaction_Info() {
    const [emails, setEmails] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async () => {
        try {
            window.location.href = 'http://localhost:4001/auth/google';
        } catch (error) {
            console.error("Error initiating login:", error);
        }
    };

    const fetchEmails = async () => {
        try {
            console.log("Fetching emails...");
            const response = await fetchEmailAxios();
            setEmails(response.emails);
            console.log("Response:", emails);
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token){
            setIsAuthenticated(true);
            console.log("User authenticated", isAuthenticated);
        }
        // Only fetch emails if the user is authenticated
        if (token) {
            fetchEmails();
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8 text-stone-800">Email Dashboard</h1>
            {!isAuthenticated ? (
                <button
                    onClick={handleLogin}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Login with Google
                </button>
            ) : (
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-stone-800">Recent Emails</h2>
                    {emails.length > 0 ? (
                        emails.map((email) => (
                            <div key={email.id} className="border-b border-gray-200 py-4">
                                <p className="text-gray-700 mb-4"><strong>Subject:</strong> {email.subject}</p>
                                <p className="text-gray-700 mb-4"><strong>Sender:</strong> {email.sender}</p>
                                <p className="text-gray-700 mb-4"><strong>Snippet:</strong> {email.snippet}</p>
                                <p className="text-gray-700 mb-4"><strong>Body:</strong> {email.body}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No emails found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
