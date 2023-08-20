"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function VerifyEmailPage() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            toast.success('Email Verified!');
            setVerified(true)
        } catch (error: any) {
            toast.error('Error verifying email.'); // Changed this line to toast.error
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")

    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: 'green',
                        },
                    },
                    error: {
                        style: {
                            background: 'red',
                        },
                    },
                }}
            />
            <h1 className="text-white text-2xl mb-4">Verify Email</h1>
            <h2 className="text-white mb-4">{token ? `${token}` : "No token"}</h2>

            {
                verified && (
                    <div className="text-white">
                        <h2 className="text-green-500 text-lg mb-2">Email Verified</h2>
                        <Link href='/login' className="text-blue-500 hover:underline">
                            Go to Login
                        </Link>
                    </div>
                )
            }

            {error && (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
                    <h2 className="text-red-500 text-lg mb-2">Error</h2>
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            )}

        </div>
    )

}
