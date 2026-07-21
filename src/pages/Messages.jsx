import React, { useState } from 'react'
import { Search, Edit, Send, Smile, Image, ArrowLeft } from 'lucide-react'
import { mockConversations, mockMessages } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { formatDistanceToNow } from 'date-fns'

export default function Messages() {
  const { user } = useAuth()
  const [active, setActive] = useState(null)
  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState(mockMessages)

  const sendMessage = () => {
    if (!newMsg.trim() || !active) return
    const msg = { id: Date.now().toString(), senderId: user.id, text: newMsg, createdAt: new Date().toISOString() }
    setMessages(m => ({ ...m, [active.id]: [...(m[active.id] || []), msg] }))
    setNewMsg('')
  }

  const activeMessages = active ? (messages[active.id] || []) : []

  return (
    <div className="flex h-screen bg-white dark:bg-black">
      {/* Conversations list */}
      <div className={`${active ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-gray-200 dark:border-gray-800`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg dark:text-white">{user?.username}</h2>
            <button><Edit size={22} className="dark:text-white" /></button>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input placeholder="Search" className="flex-1 bg-transparent outline-none text-sm dark:text-white placeholder-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockConversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setActive(conv)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 ${active?.id === conv.id ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
            >
              <img src={conv.participant.avatar} alt="" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${conv.unread > 0 ? 'font-bold text-black dark:text-white' : 'font-medium text-gray-800 dark:text-gray-200'}`}>
                    {conv.participant.username}
                  </p>
                  <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(conv.lastMessageTime), { addSuffix: false })}</p>
                </div>
                <p className={`text-sm truncate ${conv.unread > 0 ? 'font-semibold text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{conv.unread}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      {active ? (
        <div className="flex flex-col flex-1">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <button className="md:hidden" onClick={() => setActive(null)}>
              <ArrowLeft size={22} className="dark:text-white" />
            </button>
            <img src={active.participant.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-semibold dark:text-white">{active.participant.username}</p>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {activeMessages.map(msg => {
              const isMe = msg.senderId === user?.id
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && (
                    <img src={active.participant.avatar} alt="" className="w-8 h-8 rounded-full object-cover mr-2 self-end flex-shrink-0" />
                  )}
                  <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${isMe ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center gap-3">
            <button><Smile size={26} className="text-gray-500" /></button>
            <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-2 gap-2">
              <input
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Message..."
                className="flex-1 bg-transparent outline-none text-sm dark:text-white placeholder-gray-400"
              />
            </div>
            <button><Image size={26} className="text-gray-500" /></button>
            {newMsg ? (
              <button onClick={sendMessage}><Send size={24} className="text-blue-500" /></button>
            ) : (
              <button><span className="text-2xl">❤️</span></button>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col gap-3">
          <div className="w-20 h-20 rounded-full border-2 border-black dark:border-white flex items-center justify-center">
            <Send size={36} className="dark:text-white" />
          </div>
          <p className="text-xl font-light dark:text-white">Your messages</p>
          <p className="text-sm text-gray-500">Send a message to start a chat.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">Send message</button>
        </div>
      )}
    </div>
  )
}
