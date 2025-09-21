'use client';

import { useState, useEffect } from 'react';
import { EventCard } from './EventCard';
import { ProfileCard } from './ProfileCard';
import { InterestTag } from './InterestTag';
import { ActionButton } from './ActionButton';
import { Event, User } from '../lib/types';
import { POPULAR_INTERESTS } from '../lib/constants';
import { generateId, getCommonInterests } from '../lib/utils';
import { TrendingUp, Users, Calendar, Sparkles } from 'lucide-react';

interface InterestFeedProps {
  userInterests: string[];
  className?: string;
}

export function InterestFeed({ userInterests, className }: InterestFeedProps) {
  const [feedEvents, setFeedEvents] = useState<Event[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [trendingInterests, setTrendingInterests] = useState<string[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<string[]>([]);

  // Mock data generation
  useEffect(() => {
    // Generate mock events
    const mockEvents: Event[] = [
      {
        eventId: generateId(),
        eventName: 'Coffee & Crypto Chat',
        description: 'Casual discussion about the latest in DeFi and Base ecosystem',
        dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Downtown Coffee Shop',
        attendees: ['user1', 'user2', 'user3'],
        creatorId: 'user1',
        interests: ['Coffee', 'Crypto', 'DeFi'],
        isPublic: true,
        isBoosted: true,
      },
      {
        eventId: generateId(),
        eventName: 'Park Photography Walk',
        description: 'Bring your camera and explore the city with fellow photographers',
        dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Central Park',
        attendees: ['user2', 'user4'],
        creatorId: 'user2',
        interests: ['Photography', 'Art', 'Hiking'],
        isPublic: true,
        maxAttendees: 8,
      },
      {
        eventId: generateId(),
        eventName: 'Web3 Builders Meetup',
        description: 'Connect with other developers building on Base',
        dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Tech Hub Downtown',
        attendees: ['user3', 'user5', 'user6', 'user7'],
        creatorId: 'user3',
        interests: ['Tech', 'Web3', 'Startups'],
        isPublic: true,
      },
    ];

    // Generate mock users
    const mockUsers: User[] = [
      {
        farcasterId: 'user1',
        displayName: 'Alex Chen',
        bio: 'Coffee enthusiast & DeFi researcher',
        interests: ['Coffee', 'Crypto', 'DeFi', 'Reading'],
        connections: [],
      },
      {
        farcasterId: 'user2',
        displayName: 'Sarah Kim',
        bio: 'Street photographer capturing city vibes',
        interests: ['Photography', 'Art', 'Travel', 'Music'],
        connections: [],
      },
      {
        farcasterId: 'user3',
        displayName: 'Marcus Johnson',
        bio: 'Building the future on Base',
        interests: ['Tech', 'Web3', 'Startups', 'Gaming'],
        connections: [],
      },
    ];

    setFeedEvents(mockEvents);
    setSuggestedUsers(mockUsers);
    setTrendingInterests(['Coffee', 'Photography', 'Web3', 'Art', 'Crypto']);
  }, []);

  const handleRSVP = (eventId: string) => {
    if (attendingEvents.includes(eventId)) {
      setAttendingEvents(attendingEvents.filter(id => id !== eventId));
    } else {
      setAttendingEvents([...attendingEvents, eventId]);
    }
  };

  const handleConnect = (userId: string) => {
    // In a real app, this would send a connection request
    console.log('Connecting with user:', userId);
  };

  const handleMessage = (userId: string) => {
    // In a real app, this would open a DM
    console.log('Messaging user:', userId);
  };

  // Filter events based on user interests
  const relevantEvents = feedEvents.filter(event => 
    userInterests.length === 0 || 
    event.interests.some(interest => userInterests.includes(interest))
  );

  // Filter users based on common interests
  const relevantUsers = suggestedUsers.filter(user => 
    userInterests.length === 0 || 
    getCommonInterests(userInterests, user.interests).length > 0
  );

  return (
    <div className={`container py-6 ${className}`}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center">
          <h2 className="text-heading text-foreground mb-2">
            Welcome to VibeFindr
          </h2>
          <p className="text-body text-foreground/60">
            Discover events and people that match your vibe
          </p>
        </div>

        {/* Trending Interests */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Trending Now</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingInterests.map((interest) => (
              <InterestTag
                key={interest}
                tagName={interest}
                variant="display"
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-lg font-semibold text-foreground">{feedEvents.length}</div>
            <div className="text-caption text-foreground/60">Events</div>
          </div>
          <div className="card text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-lg font-semibold text-foreground">{suggestedUsers.length}</div>
            <div className="text-caption text-foreground/60">People</div>
          </div>
          <div className="card text-center">
            <Sparkles className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-lg font-semibold text-foreground">{userInterests.length}</div>
            <div className="text-caption text-foreground/60">Interests</div>
          </div>
        </div>

        {/* Suggested People */}
        {relevantUsers.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              People You Might Vibe With
            </h3>
            <div className="space-y-4">
              {relevantUsers.slice(0, 3).map((user) => (
                <ProfileCard
                  key={user.farcasterId}
                  user={user}
                  variant="compact"
                  currentUserInterests={userInterests}
                  onConnect={() => handleConnect(user.farcasterId)}
                  onMessage={() => handleMessage(user.farcasterId)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        {relevantEvents.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Events For You
            </h3>
            <div className="space-y-4">
              {relevantEvents.map((event) => (
                <EventCard
                  key={event.eventId}
                  event={event}
                  variant="upcoming"
                  onRSVP={() => handleRSVP(event.eventId)}
                  isAttending={attendingEvents.includes(event.eventId)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {userInterests.length === 0 && (
          <div className="card text-center py-8">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-heading text-foreground mb-2">
              Let's find your vibe!
            </h3>
            <p className="text-body text-foreground/60 mb-6">
              Select some interests to discover events and people that match your vibe
            </p>
            <ActionButton variant="primary">
              Get Started
            </ActionButton>
          </div>
        )}

        {/* No Relevant Content */}
        {userInterests.length > 0 && relevantEvents.length === 0 && relevantUsers.length === 0 && (
          <div className="card text-center py-8">
            <Calendar className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
            <h3 className="text-heading text-foreground mb-2">
              No matches yet
            </h3>
            <p className="text-body text-foreground/60 mb-6">
              We couldn't find events or people matching your interests. Try adding more interests or create your own event!
            </p>
            <div className="flex gap-3 justify-center">
              <ActionButton variant="secondary">
                Add More Interests
              </ActionButton>
              <ActionButton variant="primary">
                Create Event
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
