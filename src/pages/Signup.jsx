import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    const result = signup(form)
    if (result.success) navigate('/')
    else setError(result.error)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-8 mb-3">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">X</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold dark:text-white" style={{ fontFamily: 'cursive' }}>Xgram</h1>
            <p className="text-gray-500 text-sm mt-2 font-semibold">Sign up to see photos and videos from your friends.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              placeholder="Mobile number or email"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm dark:text-white outline-none focus:border-gray-400"
            />
            <input
              placeholder="Full name"
              value={form.fullName}
              onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
              required
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm dark:text-white outline-none focus:border-gray-400"
            />
            <input
              placeholder="Username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value.toLowerCase().replace(/\s/g, '_') }))}
              required
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm dark:text-white outline-none focus:border-gray-400"
            />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm dark:text-white outline-none focus:border-gray-400"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our <span className="font-semibold">Terms</span>, <span className="font-semibold">Privacy Policy</span> and <span className="font-semibold">Cookies Policy</span>.
            </p>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              Sign up
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <span className="text-sm dark:text-gray-300">Have an account? </span>
          <Link to="/login" className="text-blue-500 font-semibold text-sm">Log in</Link>
        </div>
      </div>
    </div>
  )
}
