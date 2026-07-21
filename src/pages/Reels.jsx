import React, { useState } from 'react'
import { Heart, MessageCircle, Send, MoreHorizontal, Music } from 'lucide-react'
import { mockReels } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

export default function Reels() {
  const [likes, setLikes] = useState({})
  const navigate = useNavigate()

  const toggleLike = (id) => setLikes(l => ({ ...l, [id]: !l[id] }))
  const formatCount = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n

  return (
    <div className="h-screen overflow-y-scroll reel-container snap-y snap-mandatory bg-black">
      {mockReels.map(reel => (
        <div
          key={reel.id}
          className="reel-item snap-start relative w-full h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background */}
          <img
            src={reel.thumbnailUrl}
            alt="Reel"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />

          {/* Right actions */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/profile/${reel.user.username}`)}
            >
              <div className="story-ring">
                <div className="bg-black p-0.5 rounded-full">
                  <img src={reel.user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                </div>
              </div>
            </div>

            <button onClick={() => toggleLike(reel.id)} className="flex flex-col items-center gap-1">
              <Heart
                size={28}
                className={likes[reel.id] ? 'fill-red-500 text-red-500' : 'text-white'}
              />
              <span className="text-white text-xs font-semibold">{formatCount(reel.likeCount)}</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <MessageCircle size={28} className="text-white" />
              <span className="text-white text-xs font-semibold">{formatCount(reel.commentCount)}</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <Send size={26} className="text-white" />
              <span className="text-white text-xs font-semibold">Share</span>
            </button>

            <button>
              <MoreHorizontal size={26} className="text-white" />
            </button>

            {/* Spinning music disc */}
            <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-gray-800 flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
              <Music size={16} className="text-white" />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-8 left-4 right-20 z-10">
            <button
              className="font-bold text-white mb-1"
              onClick={() => navigate(`/profile/${reel.user.username}`)}
            >
              @{reel.user.username}
            </button>
            <p className="text-white text-sm mb-2">{reel.caption}</p>
            <div className="flex items-center gap-2">
              <Music size={14} className="text-white" />
              <div className="overflow-hidden">
                <p className="text-white text-xs animate-marquee whitespace-nowrap">
                  {reel.audioTrack} · {reel.audioArtist}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
