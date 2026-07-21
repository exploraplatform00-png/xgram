import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockUsers } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore session from localStorage
    const saved = localStorage.getItem('xgram_user')
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch {}
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Mock login — replace with real API call
    const found = mockUsers.find(u => u.email === email)
    if (found) {
      setUser(found)
      localStorage.setItem('xgram_user', JSON.stringify(found))
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const signup = (data) => {
    const newUser = {
      id: Date.now().toString(),
      ...data,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=833AB4&color=fff`,
      bio: '',
      website: '',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      isVerified: false,
      isAdmin: false,
      createdAt: new Date().toISOString()
    }
    setUser(newUser)
    localStorage.setItem('xgram_user', JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('xgram_user')
  }

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('xgram_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
