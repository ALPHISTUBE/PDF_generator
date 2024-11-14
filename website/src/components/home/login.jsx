'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { googleLogin } from '@/components/home/api';

const Login = () => {
    const handleLogin = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const email = params.get("email");
        const username = params.get("username");
        if (!token) {
            console.error('No token found in cookies');
            return;
        }

        try {
            await googleLogin(token, email, username);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        handleLogin();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <p className='text-slate-800 text-4xl font-bold'>SUCCESS</p>
        </div>
    );
};

export default Login;
