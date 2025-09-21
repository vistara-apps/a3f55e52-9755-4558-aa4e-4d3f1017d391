'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Users } from 'lucide-react'
import { ModalProps } from '@/types'
import { createEvent } from '@/lib/mock-data'
import { InterestSelector } from './InterestSelector'

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onEventCreated: () => void
}

export function CreateEventModal({ isOpen, onClose, onEventCreated }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    dateTime: '',
    location: '',
    interests: [] as string[],
    isPublic: true,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.eventName || !formData.dateTime || !formData.location) return

    setLoading(true)
    try {
      await createEvent({
        eventName: formData.eventName,
        description: formData.description,
        dateTime: new Date(formData.dateTime),
        location: formData.location,
        creatorId: 'current-user', // Mock current user
        interests: formData.interests,
        isPublic: formData.isPublic,
      })
      onEventCreated()
      // Reset form
      setFormData({
        eventName: '',
        description: '',
        dateTime: '',
        location: '',
        interests: [],
        isPublic: true,
      })
    } catch (error) {
      console.error('Failed to create event:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInterestSelect = (interests: string[]) => {
    setFormData(prev => ({ ...prev, interests }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-surface rounded-lg shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text">Plan a Vibe</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface/80 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-text" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Name */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={formData.eventName}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
                    placeholder="e.g., Coffee & Chat"
                    className="input w-full"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell people what this event is about..."
                    className="input w-full h-24 resize-none"
                    rows={3}
                  />
                </div>

                {/* Date & Time */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Date & Time
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text/60" />
                    <input
                      type="datetime-local"
                      value={formData.dateTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateTime: e.target.value }))}
                      className="input w-full pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text/60" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Downtown Coffee Shop"
                      className="input w-full pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Related Interests
                  </label>
                  <InterestSelector
                    selectedInterests={formData.interests}
                    onInterestSelect={handleInterestSelect}
                    maxSelections={3}
                  />
                </div>

                {/* Privacy */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                      className="rounded border-primary/20"
                    />
                    <span className="text-sm text-text">Make this event public (discoverable by shared interests)</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !formData.eventName || !formData.dateTime || !formData.location}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </div>
                    ) : (
                      'Create Event'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
