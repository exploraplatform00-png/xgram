import React, { useState } from 'react'
import { mockNotifications } from '../data/mockData'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const navigate = useNavigate()

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, isRead: true })))
  const unreadCount = notifications.filter(n => !n.isRead).length

  const groups = [
    { label: 'New', items: notifications.filter(n => !n.isRead) },
    { label: 'Earlier', items: notifications.filter(n => n.isRead) }
  ]

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-10">
        <h1 className="text-xl font-bold dark:text-white">Notifications</h1>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-blue-500 font-semibold">Mark all read</button>
        )}
      </div>

      {groups.map(group => group.items.length > 0 && (
        <div key={group.label}>
          <p className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">{group.label}</p>
          {group.items.map(n => (
            <div
              key={n.id}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${!n.isRead ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
            >
              <img
                src={n.actor.avatar}
                alt={n.actor.username}
                className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                onClick={() => navigate(`/profile/${n.actor.username}`)}
              />
              <p className="flex-1 text-sm dark:text-gray-200">
                <span className="font-semibold dark:text-white">{n.actor.username}</span>
                {' '}{n.text}
                <span className="text-gray-400 ml-1">{formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}</span>
              </p>
              {n.type === 'follow' && (
                <button className="bg-blue-500 text-white text-sm font-semibold px-4 py-1.5 rounded-lg">
                  Follow
                </button>
              )}
              {n.postThumb && (
                <img src={n.postThumb} alt="" className="w-11 h-11 object-cover rounded-sm flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
