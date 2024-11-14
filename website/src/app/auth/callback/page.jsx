"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GoogleAuthCallback = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get("access_token");
            const email = params.get("email");
            const username = params.get("username");
            router.push(`/login?email=${email}&username=${username}&token=${accessToken}`);
        }
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl text-gray-800">Success</h2>
            <p className="text-gray-600">Sign up Successful</p>
        </div>
    );
};

export default GoogleAuthCallback;
