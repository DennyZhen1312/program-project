'use client'

import React, { useState, useEffect } from 'react'
import { useSignUp, useUser } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation'

export default function SignUpPage() {
  const { user } = useUser()
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [password, setPassword] = useState('')

  const token = useSearchParams().get('__clerk_ticket')

  useEffect(() => {
    if (user?.id) {
      router.push('/')
    }
  }, [user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLoaded || !token) return

    try {
      const signUpAttempt = await signUp.create({
        strategy: 'ticket',
        ticket: token,
        password,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.push('/')
      } else {
        console.error(signUpAttempt)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white border border-slate-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Complete Your Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-black outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:opacity-90"
          >
            Complete Signup
          </button>
        </form>
      </div>
    </div>
  )
}
