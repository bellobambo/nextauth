"use client"
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Import the toast function from react-hot-toast

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleResetRequest = async () => {
        try {
            await axios.post('/api/users/forgotpassword', { email });
            toast.success('Password reset link sent successfully! Check your email.');
            console.log("reset success");
        } catch (error: any) {
            toast.error('Error sending reset link. Please try again.');
            console.log(error);
            throw new Error(error.message);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-black">
            <div className="bg-white p-8 shadow-md rounded-lg w-1/2">
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

                <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
                <input
                    className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={handleResetRequest}
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
