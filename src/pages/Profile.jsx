import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Grid, Film, Tag, Bookmark, Settings, Link, MoreHorizontal } from 'lucide-react'
import { mockUsers, mockPosts, mockHighlights } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

const tabs = [
  { id: 'posts', icon: Grid, label: 'Posts' },
  { id: 'reels', icon: Film, label: 'Reels' },
  { id: 'tagged', icon: Tag, label: 'Tagged' },
  { id: 'saved', icon: Bookmark, label: 'Saved' }
]

function formatCount(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n
}

export default function Profile() {
  const { username } = useParams()
  const { user: currentUser } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('posts')
  const [following, setFollowing] = useState(false)

  const profileUser = mockUsers.find(u => u.username === username) || currentUser
  const isOwnProfile = profileUser?.username === currentUser?.username
  const userPosts = mockPosts.filter(p => p.userId === profileUser?.id)

  return (
    <div className="min-h-screen bg-white dark:bg-black max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 md:hidden">
        <h1 className="font-bold text-lg dark:text-white">{profileUser?.username}</h1>
        <div className="flex gap-3">
          {isOwnProfile && (
            <button onClick={() => navigate('/settings')}><Settings size={24} className="dark:text-white" /></button>
          )}
          <button><MoreHorizontal size={24} className="dark:text-white" /></button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4">
        <div className="flex items-start gap-8 mb-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {isOwnProfile ? (
              <div className="story-ring cursor-pointer">
                <div className="bg-white dark:bg-black p-0.5 rounded-full">
                  <img src={profileUser?.avatar} alt="" className="w-20 h-20 md:w-36 md:h-36 rounded-full object-cover" />
                </div>
              </div>
            ) : (
              <img src={profileUser?.avatar} alt="" className="w-20 h-20 md:w-36 md:h-36 rounded-full object-cover" />
            )}
          </div>

          {/* Stats & actions */}
          <div className="flex-1">
            {/* Desktop username row */}
            <div className="hidden md:flex items-center gap-4 mb-4">
              <h1 className="text-xl font-light dark:text-white">{profileUser?.username}</h1>
              {profileUser?.isVerified && <span className="text-blue-500">✓</span>}
              {isOwnProfile ? (
                <button
                  onClick={() => navigate('/settings')}
                  className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-1.5 rounded-lg text-sm font-semibold"
                >
                  Edit profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setFollowing(f => !f)}
                    className={`px-6 py-1.5 rounded-lg text-sm font-semibold ${following ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white' : 'bg-blue-500 text-white'}`}
                  >
                    {following ? 'Following' : 'Follow'}
                  </button>
                  <button className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-1.5 rounded-lg text-sm font-semibold">
                    Message
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <div className="text-center md:text-left">
                <p className="font-bold text-base dark:text-white">{profileUser?.postsCount}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">posts</p>
              </div>
              <div className="text-center md:text-left cursor-pointer">
                <p className="font-bold text-base dark:text-white">{formatCount(profileUser?.followersCount)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">followers</p>
              </div>
              <div className="text-center md:text-left cursor-pointer">
                <p className="font-bold text-base dark:text-white">{formatCount(profileUser?.followingCount)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">following</p>
              </div>
            </div>

            {/* Bio desktop */}
            <div className="hidden md:block">
              <p className="font-semibold text-sm dark:text-white">{profileUser?.fullName}</p>
              <p className="text-sm dark:text-gray-200 whitespace-pre-line">{profileUser?.bio}</p>
              {profileUser?.website && (
                <a href={profileUser.website} target="_blank" rel="noreferrer" className="text-blue-500 text-sm flex items-center gap-1 mt-1">
                  <Link size={14} /> {profileUser.website.replace('https://', '')}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio mobile */}
        <div className="md:hidden">
          <p className="font-semibold text-sm dark:text-white">{profileUser?.fullName}</p>
          <p className="text-sm dark:text-gray-200 whitespace-pre-line">{profileUser?.bio}</p>
          {profileUser?.website && (
            <a href={profileUser.website} target="_blank" rel="noreferrer" className="text-blue-500 text-sm flex items-center gap-1 mt-1">
              <Link size={14} /> {profileUser.website.replace('https://', '')}
            </a>
          )}
        </div>

        {/* Mobile actions */}
        <div className="md:hidden mt-3 flex gap-2">
          {isOwnProfile ? (
            <button
              onClick={() => navigate('/settings')}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white py-1.5 rounded-lg text-sm font-semibold"
            >
              Edit profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setFollowing(f => !f)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-semibold ${following ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white' : 'bg-blue-500 text-white'}`}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white py-1.5 rounded-lg text-sm font-semibold">
                Message
              </button>
            </>
          )}
        </div>

        {/* Highlights */}
        {isOwnProfile && (
          <div className="flex gap-4 mt-4 overflow-x-auto hide-scrollbar">
            {mockHighlights.map(h => (
              <div key={h.id} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <img src={h.coverUrl} alt={h.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-gray-700 dark:text-gray-300 w-16 text-center truncate">{h.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-t border-gray-200 dark:border-gray-800">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-3 text-xs uppercase tracking-widest border-t-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <Icon size={18} />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {(activeTab === 'posts' ? userPosts : []).map((post, i) => (
          <div
            key={post.id}
            className="aspect-square relative cursor-pointer group overflow-hidden bg-gray-100 dark:bg-gray-900"
          >
            <img src={post.mediaUrls[0]} alt="" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <span className="text-white font-bold text-sm">❤ {post.likeCount}</span>
              <span className="text-white font-bold text-sm">💬 {post.commentCount}</span>
            </div>
          </div>
        ))}
        {activeTab !== 'posts' && (
          <div className="col-span-3 py-16 text-center text-gray-400 dark:text-gray-600">
            <p className="text-lg">No {tabs.find(t => t.id === activeTab)?.label} yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
