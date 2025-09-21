'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Zap, Heart } from 'lucide-react'
import { EventCardProps } from '@/types'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import { InterestTag } from './InterestTag'
import { useState } from 'react'

export function EventCard({ event, variant = 'upcoming', onRSVP }: EventCardProps) {
  const [isRSVPed, setIsRSVPed] = useState(false)
  const [isBoosted, setIsBoosted] = useState(event.isBoosted || false)

  const handleRSVP = async () => {
    if (onRSVP) {
      await onRSVP(event.eventId)
      setIsRSVPed(true)
    }
  }

  const handleBoost = async () => {
    // In a real app, this would trigger a payment
    setIsBoosted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card relative"
    >
      {isBoosted && (
        <div className="absolute -top-2 -right-2 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <Zap className="w-3 h-3 mr-1" />
          Boosted
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text mb-1">{event.eventName}</h3>
          <p className="text-text/80 text-sm mb-2">{event.description}</p>

          <div className="space-y-2 text-sm text-text/60">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(event.dateTime)}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              {event.attendees.length} attending
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        {event.interests.slice(0, 3).map((interest) => (
          <InterestTag key={interest} tag={interest} />
        ))}
        {event.interests.length > 3 && (
          <span className="text-xs text-text/60">+{event.interests.length - 3} more</span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-text/60">
          Created {formatRelativeTime(new Date(Date.now() - 86400000))} {/* Mock: 1 day ago */}
        </div>

        <div className="flex space-x-2">
          {!isBoosted && event.creatorId === 'current-user' && ( // Mock: current user check
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBoost}
              className="flex items-center bg-accent/20 text-accent px-3 py-1 rounded-md text-sm font-medium hover:bg-accent/30 transition-colors"
            >
              <Zap className="w-4 h-4 mr-1" />
              Boost ($0.25)
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRSVP}
            disabled={isRSVPed}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isRSVPed
                ? 'bg-primary text-white'
                : 'bg-primary/20 text-primary hover:bg-primary/30'
            }`}
          >
            <Heart className={`w-4 h-4 mr-1 ${isRSVPed ? 'fill-current' : ''}`} />
            {isRSVPed ? 'Going' : 'RSVP'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

