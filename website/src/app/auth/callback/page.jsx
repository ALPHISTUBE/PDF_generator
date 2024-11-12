"use client";
import { useEffect } from 'react';

const GoogleAuthCallback = () => {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get("access_token");

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }

            console.log("Access token:", accessToken);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl text-gray-800">Success</h2>
            <p className="text-gray-600">Sign up Successful</p>
        </div>
    );
};

export default GoogleAuthCallback;
