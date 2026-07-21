import React, { useState, useRef } from 'react'
import { X, Image, MapPin, Tag } from 'lucide-react'

export default function CreatePostModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [preview, setPreview] = useState(null)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setStep(2)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setStep(2)
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <button onClick={onClose}><X size={22} className="dark:text-white" /></button>
          <h2 className="font-semibold dark:text-white">
            {step === 1 ? 'Create new post' : 'New post'}
          </h2>
          {step === 2 && (
            <button
              className="text-blue-500 font-semibold text-sm"
              onClick={() => { alert('Post created! (Connect your backend to save)'); onClose() }}
            >
              Share
            </button>
          )}
          {step === 1 && <div className="w-6" />}
        </div>

        {step === 1 ? (
          // Upload step
          <div
            className="flex flex-col items-center justify-center py-20 gap-4 cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
          >
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Image size={32} className="text-gray-500" />
            </div>
            <div className="text-center">
              <p className="text-xl dark:text-white mb-1">Drag photos and videos here</p>
              <p className="text-sm text-gray-500">or click to select from your device</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Select from computer
            </button>
            <input ref={fileRef} type="file" className="hidden" accept="image/*,video/*" onChange={handleFile} />
          </div>
        ) : (
          // Caption step
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img src={preview} alt="Preview" className="w-full aspect-square object-cover" />
            </div>
            <div className="md:w-1/2 flex flex-col p-4 gap-4">
              <textarea
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Write a caption..."
                rows={5}
                className="w-full resize-none text-sm dark:text-white bg-transparent outline-none border-b border-gray-200 dark:border-gray-700 pb-3"
                maxLength={2200}
              />
              <p className="text-xs text-gray-400 text-right">{caption.length}/2,200</p>
              <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
                <MapPin size={18} className="text-gray-500" />
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Add location"
                  className="flex-1 text-sm bg-transparent outline-none dark:text-white placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-2 pb-3">
                <Tag size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">Tag people</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
