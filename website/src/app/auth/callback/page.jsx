"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GoogleAuthCallback = () => {

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
            const data = {
                username,
                email,
                accessToken,
                refreshToken
            };
            console.log("Access token:", data);
        }
    }, []);

    return (
        <div>
            <h2>Authenticating...</h2>
            <p>Please wait while we complete the authentication process.</p>
        </div>
    );
};

export default GoogleAuthCallback;
