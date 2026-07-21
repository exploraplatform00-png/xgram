import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Moon, Sun, User, Lock, Bell, Eye } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const tabs = [
  { id: 'profile', label: 'Edit Profile', icon: User },
  { id: 'privacy', label: 'Privacy', icon: Eye },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Moon }
]

export default function Settings() {
  const { user, updateProfile, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    bio: user?.bio || '',
    website: user?.website || '',
    email: user?.email || ''
  })

  const handleSave = () => {
    updateProfile(form)
    alert('Profile updated!')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-black z-10">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="dark:text-white" /></button>
        <h1 className="text-xl font-bold dark:text-white">Settings</h1>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col py-4">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white border-l-2 border-black dark:border-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                <Icon size={18} /> {tab.label}
              </button>
            )
          })}
          <div className="mt-auto px-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => { logout(); navigate('/login') }}
              className="text-red-500 text-sm font-semibold"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Mobile tabs */}
          <div className="md:hidden flex gap-2 overflow-x-auto hide-scrollbar mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap font-medium ${activeTab === tab.id ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <div className="max-w-md">
              <h2 className="text-xl font-bold dark:text-white mb-6">Edit Profile</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <img src={user?.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                <button className="text-blue-500 font-semibold text-sm">Change photo</button>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'fullName', label: 'Name' },
                  { key: 'username', label: 'Username' },
                  { key: 'bio', label: 'Bio', multiline: true },
                  { key: 'website', label: 'Website' },
                  { key: 'email', label: 'Email' }
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold dark:text-white mb-1">{field.label}</label>
                    {field.multiline ? (
                      <textarea
                        value={form[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        rows={3}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-gray-900 dark:text-white outline-none focus:border-blue-500 resize-none"
                      />
                    ) : (
                      <input
                        value={form[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-gray-900 dark:text-white outline-none focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}
                <button
                  onClick={handleSave}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm"
                >
                  Save changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="max-w-md">
              <h2 className="text-xl font-bold dark:text-white mb-6">Appearance</h2>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon size={22} className="text-white" /> : <Sun size={22} />}
                  <div>
                    <p className="font-semibold dark:text-white">{theme === 'dark' ? 'Dark' : 'Light'} Mode</p>
                    <p className="text-sm text-gray-500">Switch between dark and light themes</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          )}

          {['privacy', 'security', 'notifications'].includes(activeTab) && (
            <div className="max-w-md">
              <h2 className="text-xl font-bold dark:text-white mb-6">{tabs.find(t => t.id === activeTab)?.label}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings will be available here. Connect your backend to enable these features.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
