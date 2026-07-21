import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(email, password)
    if (result.success) navigate('/')
    else setError('Invalid email or password. Try: alex@xgram.com / password123')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-8 mb-3">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">X</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold dark:text-white" style={{ fontFamily: 'cursive' }}>Xgram</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm dark:text-white outline-none focus:border-gray-400"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm dark:text-white outline-none focus:border-gray-400"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              Log in
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-black px-3 text-sm text-gray-500">OR</span>
            </div>
          </div>

          <button className="w-full text-center text-blue-900 dark:text-blue-400 font-semibold text-sm flex items-center justify-center gap-2">
            <span>🔵</span> Log in with Facebook
          </button>

          <div className="text-center mt-4">
            <Link to="#" className="text-sm text-blue-900 dark:text-blue-400">Forgot password?</Link>
          </div>
        </div>

        {/* Sign up link */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <span className="text-sm dark:text-gray-300">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 font-semibold text-sm">Sign up</Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Hint: alex@xgram.com / password123
        </p>
      </div>
    </div>
  )
}
