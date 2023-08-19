"use client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react'
import axios  from "axios"

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup Success", response.data);
      setTimeout(() => {
        router.push('/login');
      }, 2000)
      toast.success('Signup successful!');
    } catch (error: any) {
      console.log("Sign up failed", error.message);
      toast.error(`Signup failed: ${error.message}`);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-black'>
      <Toaster />
      <h1 className="text-white text-2xl mb-4">{loading ? "Processing" : "Signup"}</h1>
      <hr className="w-20 border-gray-400 mb-4" />
      <label htmlFor="username" className="text-white">
        Username
      </label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
        placeholder='Enter your username'
      />
      <br />
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
        onClick={onSignup}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>

      <Link href='/login' className='text-white'>Login</Link>
    </div>
  )
}
