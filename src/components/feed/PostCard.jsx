import React, { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked)
  const [saved, setSaved] = useState(post.saved)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [imgIndex, setImgIndex] = useState(0)
  const navigate = useNavigate()

  const handleLike = () => {
    setLiked(l => !l)
    setLikeCount(c => liked ? c - 1 : c + 1)
  }

  const formatCaption = (caption) => {
    return caption.split(/(\s#\w+)/g).map((part, i) =>
      part.trim().startsWith('#')
        ? <span key={i} className="text-blue-500 cursor-pointer hover:underline">{part}</span>
        : part
    )
  }

  const formatCount = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n.toString()
  }

  return (
    <article className="border-b border-gray-200 dark:border-gray-800 max-w-[468px] mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/profile/${post.user.username}`)}
        >
          <div className="story-ring">
            <div className="bg-white dark:bg-black p-0.5 rounded-full">
              <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm dark:text-white flex items-center gap-1">
              {post.user.username}
              {post.user.isVerified && <span className="text-blue-500 text-xs">✓</span>}
            </p>
            {post.location && <p className="text-xs text-gray-500 dark:text-gray-400">{post.location}</p>}
          </div>
        </div>
        <button className="text-gray-600 dark:text-gray-300"><MoreHorizontal size={20} /></button>
      </div>

      {/* Media */}
      <div className="relative bg-gray-100 dark:bg-gray-900 aspect-square overflow-hidden">
        <img
          src={post.mediaUrls[imgIndex]}
          alt="Post"
          className="w-full h-full object-cover"
          onDoubleClick={handleLike}
        />
        {post.mediaType === 'carousel' && (
          <>
            {imgIndex > 0 && (
              <button
                onClick={() => setImgIndex(i => i - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {imgIndex < post.mediaUrls.length - 1 && (
              <button
                onClick={() => setImgIndex(i => i + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow"
              >
                <ChevronRight size={18} />
              </button>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {post.mediaUrls.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === imgIndex ? 'bg-blue-500' : 'bg-white/60'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="transition-transform active:scale-125">
              <Heart
                size={26}
                className={liked ? 'fill-red-500 text-red-500' : 'text-gray-800 dark:text-gray-200'}
              />
            </button>
            <button onClick={() => navigate(`/post/${post.id}`)}>
              <MessageCircle size={26} className="text-gray-800 dark:text-gray-200" />
            </button>
            <button>
              <Send size={24} className="text-gray-800 dark:text-gray-200" />
            </button>
          </div>
          <button onClick={() => setSaved(s => !s)}>
            <Bookmark
              size={26}
              className={saved ? 'fill-black dark:fill-white text-black dark:text-white' : 'text-gray-800 dark:text-gray-200'}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm dark:text-white mb-1">{formatCount(likeCount)} likes</p>

        {/* Caption */}
        <p className="text-sm dark:text-gray-100">
          <span
            className="font-semibold cursor-pointer mr-1"
            onClick={() => navigate(`/profile/${post.user.username}`)}
          >
            {post.user.username}
          </span>
          {formatCaption(post.caption)}
        </p>

        {/* Comment count */}
        {post.commentCount > 0 && (
          <button
            onClick={() => navigate(`/post/${post.id}`)}
            className="text-sm text-gray-500 dark:text-gray-400 mt-1"
          >
            View all {formatCount(post.commentCount)} comments
          </button>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-400 mt-1 uppercase">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>

        {/* Add comment */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
          />
          <button className="text-blue-500 font-semibold text-sm">Post</button>
        </div>
      </div>
    </article>
  )
}
