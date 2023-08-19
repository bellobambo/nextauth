"use client"

import axios from 'axios'
import Link from 'next/link';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation';


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async() => {

        try {
           await axios.get("/api/users/logout")
            toast.success('Logout successful!');
            setTimeout(() => {
                router.push('/login')

            }, 200);
        } catch (error: any) {
            console.log("Could not log you out", + error)
            toast.error(error.message);

        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('api/users/me')
        console.log(res.data)
        setData(res.data.data._id)

    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <Toaster />
            <h1 className="text-white text-2xl mb-4">Profile</h1>
            <hr className="w-20 border-gray-400 mb-4" />
            <p className="text-white">Profile page</p>
            <h2 className='p-3 bg-purple-500 rounded-md'>{ data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}> {data} </Link> }</h2>
            <br />
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300" onClick={logout}>
                Logout
            </button>
            <br />
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-red-300" onClick={getUserDetails}>
                Get User Details
            </button>
        </div>
    );
}
