"use client";

import React, { useEffect } from 'react';

const GoogleLogin = () => {
    const handleGoogleLogin = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/user/auth/google/");
            const { auth_url } = await res.json();
            window.location.href = auth_url;
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Parse query parameters from the URL
            const params = new URLSearchParams(window.location.search);
            const username = params.get("username");
            const email = params.get("email");
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");

            // Store tokens and user info securely
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
            }

            console.log("Access token:", accessToken);
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <button 
                onClick={handleGoogleLogin} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Login with Google
            </button>
        </div>
    );
};

export default GoogleLogin;