import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { mockExploreGrid } from '../data/mockData'
import { Heart, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const tabs = ['All', 'Photos', 'Videos', 'Reels']

export default function Explore() {
  const [activeTab, setActiveTab] = useState('All')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const items = mockExploreGrid

  return (
    <div className="min-h-screen bg-white dark:bg-black max-w-4xl mx-auto px-2">
      {/* Search bar */}
      <div className="sticky top-0 bg-white dark:bg-black py-4 px-2 z-10">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-3 py-2.5">
          <Search size={18} className="text-gray-500" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-sm dark:text-white placeholder-gray-400"
          />
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {items.map((item, i) => {
          const isTall = i % 6 === 2
          return (
            <div
              key={item.id}
              className={`relative cursor-pointer group overflow-hidden bg-gray-100 dark:bg-gray-900 ${isTall ? 'row-span-2' : ''}`}
              style={{ aspectRatio: isTall ? '1/2' : '1/1' }}
              onClick={() => navigate(`/post/${item.id}`)}
            >
              <img
                src={item.mediaUrls[0]}
                alt=""
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <span className="text-white font-bold flex items-center gap-1 text-sm">
                  <Heart size={18} className="fill-white text-white" /> {item.likeCount?.toLocaleString() || 0}
                </span>
                <span className="text-white font-bold flex items-center gap-1 text-sm">
                  <MessageCircle size={18} className="fill-white text-white" /> {item.commentCount || 0}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
