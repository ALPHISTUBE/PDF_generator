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
                <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4 text-stone-800">Recent Emails</h2>
                    {emails.length > 0 ? (
                        emails.map((email) => (
                            <div key={email.id} className="border-b border-gray-200 py-4 break-words">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 pr-4">
                                        <p className="text-gray-700 mb-4"><strong>Subject:</strong> {email.subject}</p>
                                        <p className="text-gray-700 mb-4"><strong>Sender:</strong> {email.sender}</p>
                                        <p className="text-gray-700 mb-4"><strong>Snippet:</strong> {email.snippet}</p>
                                        <p className="text-gray-700 mb-4"><strong>Body:</strong> {email.body}</p>
                                    </div>
                                    <div className="col-span-1 pl-4">
                                        {typeof email.data.info === 'object' && email.data.info !== null ? (
                                            <>
                                                <p className="text-gray-700 mb-4 bg-green-200 text-center border-2 border-stone-200 rounded-md"><strong>Message:</strong> {email.data.message}</p>
                                                <table className="min-w-full bg-white text-slate-800 border border-gray-200">
                                                    <tbody>
                                                        {Object.entries(email.data.info).map(([key, value]) => (
                                                            <tr key={key} className='grid grid-cols-2 border border-stone-200'>
                                                                <td className="font-semibold text-center py-2 border-stone-800">{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                                                                <td className="text-center py-2">
                                                                    <span className={`inline-block px-2 py-1 rounded-md ${value ? 'bg-green-200' : 'bg-red-200'}`}>
                                                                        {value !== null && value !== "" ? value : 'N/A'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </>
                                        ) : (
                                            <p className="text-gray-700 mb-4 bg-yellow-200 text-center border-2 border-stone-200 rounded-md"><strong>Message:</strong> {email.data.message}</p>
                                        )}
                                    </div>
                                </div>
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
