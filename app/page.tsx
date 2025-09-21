'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Calendar, Sparkles } from 'lucide-react'
import { Event, User } from '@/types'
import { getEvents, getUsersWithInterests } from '@/lib/mock-data'
import { EventCard } from '@/components/EventCard'
import { ProfileCard } from '@/components/ProfileCard'
import { InterestSelector } from '@/components/InterestSelector'
import { Navigation } from '@/components/Navigation'
import { CreateEventModal } from '@/components/CreateEventModal'

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    if (selectedInterests.length > 0) {
      loadUsersWithInterests()
    } else {
      setUsers([])
    }
  }, [selectedInterests])

  const loadInitialData = async () => {
    try {
      const eventsData = await getEvents()
      setEvents(eventsData)
    } catch (error) {
      console.error('Failed to load events:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUsersWithInterests = async () => {
    try {
      const usersData = await getUsersWithInterests(selectedInterests)
      setUsers(usersData)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  const handleInterestSelect = (interests: string[]) => {
    setSelectedInterests(interests)
  }

  const handleEventCreated = async () => {
    await loadInitialData()
    setIsCreateEventOpen(false)
  }

  const handleRSVP = async (eventId: string) => {
    // In a real app, this would call an API
    console.log('RSVP to event:', eventId)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-accent" />
            <h1 className="text-2xl font-bold text-text">VibeFindr</h1>
          </div>
          <div className="text-sm text-text/60">Connect with your vibe</div>
        </div>
      </motion.header>

      {/* Interest Selector */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-accent" />
          What are you into?
        </h2>
        <InterestSelector
          selectedInterests={selectedInterests}
          onInterestSelect={handleInterestSelect}
        />
      </motion.section>

      {/* People with Shared Interests */}
      {users.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" />
            People with similar vibes
          </h2>
          <div className="space-y-4">
            {users.slice(0, 3).map((user) => (
              <ProfileCard key={user.farcasterId} user={user} variant="compact" />
            ))}
          </div>
        </motion.section>
      )}

      {/* Interest Feed */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-accent" />
          Upcoming events
        </h2>
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard
              key={event.eventId}
              event={event}
              variant="upcoming"
              onRSVP={handleRSVP}
            />
          ))}
        </div>
      </motion.section>

      {/* Create Event CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <button
          onClick={() => setIsCreateEventOpen(true)}
          className="btn-primary w-full py-3 text-lg font-semibold"
        >
          Plan a Vibe
        </button>
        <p className="text-sm text-text/60 mt-2">
          Create a casual meetup and connect with like-minded people
        </p>
      </motion.section>

      {/* Navigation */}
      <Navigation />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  )
}

