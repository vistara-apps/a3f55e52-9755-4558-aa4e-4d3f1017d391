'use client'

import { motion } from 'framer-motion'
import { MessageCircle, UserPlus } from 'lucide-react'
import { ProfileCardProps } from '@/types'
import { getFarcasterProfile } from '@/lib/mock-data'
import { useState, useEffect } from 'react'
import { FarcasterProfile } from '@/types'
import { InterestTag } from './InterestTag'

export function ProfileCard({ user, variant = 'displayInterests' }: ProfileCardProps) {
  const [profile, setProfile] = useState<FarcasterProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [user.farcasterId])

  const loadProfile = async () => {
    try {
      const profileData = await getFarcasterProfile(user.farcasterId)
      setProfile(profileData)
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-surface rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-surface rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-surface rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {profile?.pfp && (
              <img
                src={profile.pfp}
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <h3 className="font-semibold text-text">{user.displayName}</h3>
              <p className="text-sm text-text/60">@{user.farcasterId}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-accent/20 text-accent rounded-full hover:bg-accent/30 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap">
          {user.interests.slice(0, 3).map((interest) => (
            <InterestTag key={interest} tag={interest} />
          ))}
          {user.interests.length > 3 && (
            <span className="text-xs text-text/60">+{user.interests.length - 3} more</span>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-start space-x-4">
        {profile?.pfp && (
          <img
            src={profile.pfp}
            alt={user.displayName}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-text">{user.displayName}</h3>
              <p className="text-sm text-text/60">@{user.farcasterId}</p>
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-sm px-3 py-1"
              >
                Message
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm px-3 py-1"
              >
                Connect
              </motion.button>
            </div>
          </div>

          {user.bio && (
            <p className="text-text/80 mb-3">{user.bio}</p>
          )}

          <div className="flex items-center space-x-4 text-sm text-text/60 mb-3">
            <span>{profile?.followerCount || 0} followers</span>
            <span>{user.connections.length} connections</span>
          </div>

          {variant === 'displayInterests' && (
            <div>
              <h4 className="font-medium text-text mb-2">Interests</h4>
              <div className="flex flex-wrap">
                {user.interests.map((interest) => (
                  <InterestTag key={interest} tag={interest} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
