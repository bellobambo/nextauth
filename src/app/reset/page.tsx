"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [resetSuccessful, setResetSuccessful] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter()

    const resetPassword = async (e: any) => {
        e.preventDefault()
        if (password !== confirmedPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            await axios.post('/api/users/reset', { token, password });
            toast.success('Password Reset Successfully.');
            setResetSuccessful(true);
            setTimeout(() => {
                router.push('/login')
            }, 2000);
        } catch (error: any) {
            toast.error('Error resetting password.');
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-black">
            <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-[400px]">
                <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                {resetSuccessful ? (
                    <p className="text-green-500 mb-4">Password reset successful!</p>
                ) : (
                    <>
                        {error && (
                            <p className="text-red-500 mb-4">Error resetting password.</p>
                        )}

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
                        <form onSubmit={resetPassword}>
                            <input
                                type="password"
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="w-full mt-4 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
                                placeholder="Confirm Password"
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Reset Password
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
