import React, { useState } from 'react'
import { X, Search } from 'lucide-react'
import { mockUsers, mockHashtags } from '../../data/mockData'
import { useNavigate } from 'react-router-dom'

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filteredUsers = query
    ? mockUsers.filter(u => u.username.includes(query.toLowerCase()) || u.fullName.toLowerCase().includes(query.toLowerCase()))
    : []

  const filteredTags = query
    ? mockHashtags.filter(h => h.tag.includes(query.toLowerCase()))
    : []

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white dark:bg-black w-full max-w-sm h-full shadow-2xl flex flex-col md:ml-64">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold dark:text-white mb-4">Search</h2>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-sm dark:text-white placeholder-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')}><X size={16} className="text-gray-500" /></button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!query ? (
            <div className="p-4">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Recent</p>
              <p className="text-sm text-gray-400 text-center mt-8">No recent searches.</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredUsers.map(u => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl cursor-pointer"
                  onClick={() => handleUserClick(u.username)}
                >
                  <img src={u.avatar} alt={u.username} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm dark:text-white">{u.username} {u.isVerified && <span className="text-blue-500">✓</span>}</p>
                    <p className="text-xs text-gray-500">{u.fullName}</p>
                  </div>
                </div>
              ))}
              {filteredTags.map(h => (
                <div key={h.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl cursor-pointer">
                  <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-xl">#</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm dark:text-white">#{h.tag}</p>
                    <p className="text-xs text-gray-500">{(h.postCount / 1000000).toFixed(1)}M posts</p>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && filteredTags.length === 0 && (
                <p className="text-center text-gray-400 text-sm mt-8">No results for "{query}"</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
