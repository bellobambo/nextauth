"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = useState(false);


    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log("login success", response.data)
            toast.success('login successful!');
            router.push("/profile")
        } catch (error : any)  {
            console.log("Login failed", error.message)
            toast.success('failed to Login!');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)

        }

    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-black'>
            <Toaster />
            <h1 className="text-white text-2xl mb-4">{ loading ? "Processing"  : "Login"}</h1>
            <label htmlFor="email" className="text-white">
                Email
            </label>
            <input
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
                placeholder='Enter your email'
            />
            <br />
            <label htmlFor="password" className="text-white">
                Password
            </label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
                placeholder='Enter your password'
            />
            <br />
            <button
                onClick={onLogin}
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Login
            </button>

            <Link href='/signup' className='text-white'>Sign up</Link>
        </div>
    )
}
