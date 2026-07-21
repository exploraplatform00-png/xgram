import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUsers } from '../../data/mockData'
import { useAuth } from '../../contexts/AuthContext'

export default function SuggestedUsers() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [followed, setFollowed] = useState({})
  const suggestions = mockUsers.filter(u => u.id !== user?.id).slice(0, 5)

  const formatCount = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n

  return (
    <div className="w-80 hidden xl:block fixed right-8 top-8">
      {/* Current user */}
      <div className="flex items-center gap-3 mb-4">
        <img src={user?.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-sm dark:text-white">{user?.username}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.fullName}</p>
        </div>
        <button className="text-blue-500 text-sm font-semibold">Switch</button>
      </div>

      {/* Suggested header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Suggested for you</span>
        <button className="text-sm font-semibold dark:text-white">See All</button>
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        {suggestions.map(suggested => (
          <div key={suggested.id} className="flex items-center gap-3">
            <img
              src={suggested.avatar}
              alt={suggested.username}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={() => navigate(`/profile/${suggested.username}`)}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold dark:text-white truncate cursor-pointer"
                onClick={() => navigate(`/profile/${suggested.username}`)}
              >
                {suggested.username}
                {suggested.isVerified && <span className="text-blue-500 ml-1 text-xs">✓</span>}
              </p>
              <p className="text-xs text-gray-400">{formatCount(suggested.followersCount)} followers</p>
            </div>
            <button
              onClick={() => setFollowed(f => ({ ...f, [suggested.id]: !f[suggested.id] }))}
              className={`text-sm font-semibold ${followed[suggested.id] ? 'text-gray-500' : 'text-blue-500'}`}
            >
              {followed[suggested.id] ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-6">
        © 2025 XGram — From Base44
      </p>
    </div>
  )
}
