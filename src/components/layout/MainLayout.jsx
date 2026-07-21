import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Home, Search, Compass, Film, MessageCircle, Bell, PlusSquare, User, Menu, X, LogOut, Settings, Moon, Sun } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import CreatePostModal from '../common/CreatePostModal'
import SearchModal from '../common/SearchModal'

export default function MainLayout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [showCreate, setShowCreate] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { to: '/', icon: Home, label: 'Home', exact: true },
    { icon: Search, label: 'Search', action: () => setShowSearch(true) },
    { to: '/explore', icon: Compass, label: 'Explore' },
    { to: '/reels', icon: Film, label: 'Reels' },
    { to: '/messages', icon: MessageCircle, label: 'Messages' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
    { icon: PlusSquare, label: 'Create', action: () => setShowCreate(true) },
    { to: `/profile/${user?.username}`, icon: User, label: 'Profile' }
  ]

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black z-40 px-3 py-6">
        {/* Logo */}
        <div className="px-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-xl font-bold dark:text-white tracking-tight">Xgram</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-700 dark:text-gray-200 font-medium"
                >
                  <Icon size={24} />
                  <span>{item.label}</span>
                </button>
              )
            }
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-3 py-3 rounded-xl transition-colors font-medium ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white font-bold'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`
                }
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* More / Settings at bottom */}
        <div className="relative">
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-700 dark:text-gray-200 font-medium"
          >
            <Menu size={24} />
            <span>More</span>
          </button>

          {moreOpen && (
            <div className="absolute bottom-14 left-0 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
              <button
                onClick={() => { navigate('/settings'); setMoreOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm dark:text-white"
              >
                <Settings size={18} /> Settings
              </button>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm dark:text-white"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-red-500"
              >
                <LogOut size={18} /> Log Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pb-16 md:pb-0 min-h-screen bg-white dark:bg-black">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 z-40 flex items-center justify-around px-2 py-2">
        <NavLink to="/" end className={({ isActive }) => `p-2 ${isActive ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          <Home size={26} />
        </NavLink>
        <button onClick={() => setShowSearch(true)} className="p-2 text-gray-500 dark:text-gray-400">
          <Search size={26} />
        </button>
        <NavLink to="/reels" className={({ isActive }) => `p-2 ${isActive ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          <Film size={26} />
        </NavLink>
        <button onClick={() => setShowCreate(true)} className="p-2 text-gray-500 dark:text-gray-400">
          <PlusSquare size={26} />
        </button>
        <NavLink to={`/profile/${user?.username}`} className={({ isActive }) => `p-2 ${isActive ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          <img src={user?.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
        </NavLink>
      </nav>

      {/* Modals */}
      {showCreate && <CreatePostModal onClose={() => setShowCreate(false)} />}
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </div>
  )
}
