import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { mockStories } from '../../data/mockData'
import { useAuth } from '../../contexts/AuthContext'
import StoryViewer from './StoryViewer'

export default function StoryBar() {
  const { user } = useAuth()
  const [viewingStory, setViewingStory] = useState(null)

  return (
    <>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar py-4 px-4 border-b border-gray-200 dark:border-gray-800">
        {/* Your Story */}
        <div className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0">
          <div className="relative">
            <img src={user?.avatar} alt="Your story" className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-black flex items-center justify-center">
              <Plus size={10} className="text-white" />
            </div>
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300 w-16 text-center truncate">Your Story</span>
        </div>

        {/* Others' Stories */}
        {mockStories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0"
            onClick={() => setViewingStory(story)}
          >
            <div className={`story-ring ${story.seen ? 'opacity-50' : ''}`}>
              <div className="bg-white dark:bg-black p-0.5 rounded-full">
                <img
                  src={story.user.avatar}
                  alt={story.user.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300 w-16 text-center truncate">
              {story.user.username}
            </span>
          </div>
        ))}
      </div>

      {viewingStory && (
        <StoryViewer story={viewingStory} onClose={() => setViewingStory(null)} stories={mockStories} />
      )}
    </>
  )
}
