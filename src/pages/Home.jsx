import React from 'react'
import StoryBar from '../components/feed/StoryBar'
import PostCard from '../components/feed/PostCard'
import SuggestedUsers from '../components/common/SuggestedUsers'
import { mockPosts } from '../data/mockData'

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen bg-white dark:bg-black">
      {/* Feed Column */}
      <div className="w-full max-w-[468px] border-x border-gray-200 dark:border-gray-800">
        <StoryBar />
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {mockPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden xl:block w-80 ml-16 pt-8">
        <SuggestedUsers />
      </div>
    </div>
  )
}
