import React, { useState } from 'react'
import { Users, FileText, Flag, TrendingUp, ShieldCheck, Trash2, Ban } from 'lucide-react'
import { mockUsers, mockPosts, mockNotifications } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const tabs = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'reports', label: 'Reports', icon: Flag }
]

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <ShieldCheck size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold dark:text-white mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-4">You need admin privileges to access this page.</p>
          <button onClick={() => navigate('/')} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">Go Home</button>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Total Users', value: mockUsers.length, icon: Users, color: 'blue' },
    { label: 'Total Posts', value: mockPosts.length, icon: FileText, color: 'green' },
    { label: 'Reports', value: 3, icon: Flag, color: 'red' },
    { label: 'Active Today', value: 2, icon: TrendingUp, color: 'purple' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">X</span>
          </div>
          <h1 className="text-xl font-bold dark:text-white">XGram Admin</h1>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 min-h-screen py-4">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-500 border-r-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                <Icon size={18} /> {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold dark:text-white mb-6">Overview</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(stat => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        <Icon size={18} className={`text-${stat.color}-500`} />
                      </div>
                      <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                    </div>
                  )
                })}
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <h3 className="font-semibold dark:text-white mb-3">Recent Activity</h3>
                {mockNotifications.slice(0, 5).map(n => (
                  <div key={n.id} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <img src={n.actor.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <p className="text-sm dark:text-gray-300">
                      <span className="font-semibold">{n.actor.username}</span> {n.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-bold dark:text-white mb-6">User Management</h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400">User</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Email</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Posts</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map(u => (
                      <tr key={u.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="text-sm font-semibold dark:text-white">{u.username}</p>
                              <p className="text-xs text-gray-400">{u.fullName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{u.email}</td>
                        <td className="px-4 py-3 text-sm dark:text-white">{u.postsCount}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg" title="Ban user">
                              <Ban size={16} />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h2 className="text-xl font-bold dark:text-white mb-6">Content Moderation</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mockPosts.map(post => (
                  <div key={post.id} className="relative group rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img src={post.mediaUrls[0]} alt="" className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button className="bg-red-500 text-white p-2 rounded-full"><Trash2 size={16} /></button>
                      <button className="bg-yellow-500 text-white p-2 rounded-full"><Flag size={16} /></button>
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">@{post.user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-xl font-bold dark:text-white mb-6">Reports</h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 text-center">
                <Flag size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No pending reports. You're all caught up!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
