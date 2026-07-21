import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ArrowLeft } from 'lucide-react'
import { mockPosts, mockComments } from '../data/mockData'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '../contexts/AuthContext'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const post = mockPosts.find(p => p.id === id) || mockPosts[0]
  const [liked, setLiked] = useState(post.liked)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [saved, setSaved] = useState(post.saved)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(mockComments.filter(c => c.postId === post.id))

  const handleLike = () => {
    setLiked(l => !l)
    setLikeCount(c => liked ? c - 1 : c + 1)
  }

  const submitComment = () => {
    if (!comment.trim()) return
    setComments(cs => [...cs, {
      id: Date.now().toString(),
      postId: post.id,
      userId: user.id,
      user: user,
      text: comment,
      likeCount: 0,
      createdAt: new Date().toISOString()
    }])
    setComment('')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Mobile header */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-black z-10">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="dark:text-white" /></button>
        <h1 className="font-bold dark:text-white">Post</h1>
      </div>

      <div className="flex flex-col md:flex-row max-w-5xl mx-auto md:h-screen md:border border-gray-200 dark:border-gray-800 md:rounded-xl md:my-4 overflow-hidden">
        {/* Image side */}
        <div className="md:flex-1 bg-black flex items-center justify-center">
          <img src={post.mediaUrls[0]} alt="" className="w-full md:h-full object-contain" />
        </div>

        {/* Info side */}
        <div className="md:w-96 flex flex-col border-l border-gray-200 dark:border-gray-800">
          {/* Post header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <img
              src={post.user.avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
              onClick={() => navigate(`/profile/${post.user.username}`)}
            />
            <div className="flex-1">
              <p className="font-semibold text-sm dark:text-white">{post.user.username}</p>
              {post.location && <p className="text-xs text-gray-500">{post.location}</p>}
            </div>
            <button><MoreHorizontal size={20} className="dark:text-white" /></button>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {/* Caption */}
            <div className="flex gap-3">
              <img src={post.user.avatar} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              <div>
                <p className="text-sm dark:text-white">
                  <span className="font-semibold mr-1">{post.user.username}</span>
                  {post.caption}
                </p>
                <p className="text-xs text-gray-400 mt-1">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
              </div>
            </div>
            {/* Comments list */}
            {comments.map(c => (
              <div key={c.id} className="flex gap-3">
                <img src={c.user.avatar} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm dark:text-white">
                    <span className="font-semibold mr-1">{c.user.username}</span>
                    {c.text}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}</p>
                    <button className="text-xs text-gray-500 font-semibold">Reply</button>
                  </div>
                </div>
                <button>
                  <Heart size={14} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-3">
                <button onClick={handleLike}>
                  <Heart size={26} className={liked ? 'fill-red-500 text-red-500' : 'dark:text-white'} />
                </button>
                <button><MessageCircle size={26} className="dark:text-white" /></button>
                <button><Send size={24} className="dark:text-white" /></button>
              </div>
              <button onClick={() => setSaved(s => !s)}>
                <Bookmark size={26} className={saved ? 'fill-black dark:fill-white dark:text-white' : 'dark:text-white'} />
              </button>
            </div>
            <p className="font-semibold text-sm dark:text-white mb-1">{likeCount.toLocaleString()} likes</p>
            <p className="text-xs text-gray-400 uppercase mb-3">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
          </div>

          {/* Comment input */}
          <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-2">
            <span className="text-2xl cursor-pointer">😊</span>
            <input
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitComment()}
              placeholder="Add a comment..."
              className="flex-1 text-sm bg-transparent outline-none dark:text-white placeholder-gray-400"
            />
            {comment && (
              <button onClick={submitComment} className="text-blue-500 font-semibold text-sm">Post</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
