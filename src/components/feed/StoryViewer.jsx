import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function StoryViewer({ story, stories, onClose }) {
  const [current, setCurrent] = useState(stories.findIndex(s => s.id === story.id))
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          goNext()
          return 0
        }
        return p + 2
      })
    }, 100)
    return () => clearInterval(interval)
  }, [current])

  const goNext = () => {
    if (current < stories.length - 1) setCurrent(c => c + 1)
    else onClose()
  }

  const goPrev = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  const currentStory = stories[current]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-sm h-full max-h-screen md:max-h-[90vh] md:rounded-2xl overflow-hidden">
        {/* Background Image */}
        <img src={currentStory.mediaUrl} alt="" className="w-full h-full object-cover" />

        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: i < current ? '100%' : i === current ? `${progress}%` : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={currentStory.user.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-white" />
            <span className="text-white font-semibold text-sm">{currentStory.user.username}</span>
            <span className="text-white/70 text-xs">2h</span>
          </div>
          <button onClick={onClose} className="text-white">
            <X size={22} />
          </button>
        </div>

        {/* Nav zones */}
        <button onClick={goPrev} className="absolute left-0 top-0 w-1/3 h-full" />
        <button onClick={goNext} className="absolute right-0 top-0 w-1/3 h-full" />
      </div>
    </div>
  )
}
