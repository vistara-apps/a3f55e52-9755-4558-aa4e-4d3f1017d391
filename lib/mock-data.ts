import { User, Event, InterestTag, FarcasterProfile } from '@/types'

// Mock interest tags
export const INTEREST_TAGS: InterestTag[] = [
  { tagName: 'Coffee & Chat' },
  { tagName: 'Hiking' },
  { tagName: 'Board Games' },
  { tagName: 'Photography' },
  { tagName: 'Cooking' },
  { tagName: 'Music' },
  { tagName: 'Art' },
  { tagName: 'Sports' },
  { tagName: 'Tech' },
  { tagName: 'Books' },
  { tagName: 'Movies' },
  { tagName: 'Travel' },
  { tagName: 'Fitness' },
  { tagName: 'Gaming' },
  { tagName: 'Dancing' },
]

// Mock users
export const MOCK_USERS: User[] = [
  {
    farcasterId: 'alice',
    displayName: 'Alice Chen',
    bio: 'Coffee enthusiast and amateur photographer',
    interests: ['Coffee & Chat', 'Photography', 'Art'],
    connections: ['bob', 'charlie'],
  },
  {
    farcasterId: 'bob',
    displayName: 'Bob Smith',
    bio: 'Hiking and outdoor adventures',
    interests: ['Hiking', 'Photography', 'Sports'],
    connections: ['alice', 'diana'],
  },
  {
    farcasterId: 'charlie',
    displayName: 'Charlie Brown',
    bio: 'Board game collector and strategy enthusiast',
    interests: ['Board Games', 'Tech', 'Gaming'],
    connections: ['alice', 'eve'],
  },
  {
    farcasterId: 'diana',
    displayName: 'Diana Prince',
    bio: 'Fitness coach and healthy living advocate',
    interests: ['Fitness', 'Cooking', 'Sports'],
    connections: ['bob', 'frank'],
  },
  {
    farcasterId: 'eve',
    displayName: 'Eve Johnson',
    bio: 'Music producer and DJ',
    interests: ['Music', 'Dancing', 'Tech'],
    connections: ['charlie', 'grace'],
  },
]

// Mock Farcaster profiles
export const MOCK_FARCASTER_PROFILES: Record<string, FarcasterProfile> = {
  alice: {
    fid: 123,
    username: 'alice',
    displayName: 'Alice Chen',
    bio: 'Coffee enthusiast and amateur photographer',
    pfp: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    followerCount: 1250,
    followingCount: 340,
  },
  bob: {
    fid: 456,
    username: 'bob',
    displayName: 'Bob Smith',
    bio: 'Hiking and outdoor adventures',
    pfp: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followerCount: 890,
    followingCount: 210,
  },
  charlie: {
    fid: 789,
    username: 'charlie',
    displayName: 'Charlie Brown',
    bio: 'Board game collector and strategy enthusiast',
    pfp: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followerCount: 567,
    followingCount: 180,
  },
}

// Mock events
export const MOCK_EVENTS: Event[] = [
  {
    eventId: 'event_1',
    eventName: 'Coffee & Photography Walk',
    description: 'Let\'s grab coffee and take some photos around the city!',
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    location: 'Downtown Coffee Shop',
    attendees: ['alice', 'bob'],
    creatorId: 'alice',
    interests: ['Coffee & Chat', 'Photography'],
    isPublic: true,
    isBoosted: false,
  },
  {
    eventId: 'event_2',
    eventName: 'Board Game Night',
    description: 'Weekly board game gathering. All skill levels welcome!',
    dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    location: 'Game Cafe',
    attendees: ['charlie', 'eve'],
    creatorId: 'charlie',
    interests: ['Board Games', 'Gaming'],
    isPublic: true,
    isBoosted: true,
  },
  {
    eventId: 'event_3',
    eventName: 'Hiking Adventure',
    description: 'Full day hike with scenic views. Bring water and snacks!',
    dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    location: 'Mountain Trail Head',
    attendees: ['bob', 'diana'],
    creatorId: 'bob',
    interests: ['Hiking', 'Sports', 'Fitness'],
    isPublic: true,
    isBoosted: false,
  },
]

// Mock API functions
export async function getFarcasterProfile(farcasterId: string): Promise<FarcasterProfile | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return MOCK_FARCASTER_PROFILES[farcasterId] || null
}

export async function getUsersWithInterests(interests: string[]): Promise<User[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))

  return MOCK_USERS.filter(user =>
    user.interests.some(interest => interests.includes(interest))
  )
}

export async function getEvents(): Promise<Event[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))
  return MOCK_EVENTS
}

export async function createEvent(event: Omit<Event, 'eventId' | 'attendees'>): Promise<Event> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const newEvent: Event = {
    ...event,
    eventId: generateEventId(),
    attendees: [event.creatorId], // Creator is automatically attending
  }

  MOCK_EVENTS.push(newEvent)
  return newEvent
}

export async function rsvpToEvent(eventId: string, farcasterId: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const event = MOCK_EVENTS.find(e => e.eventId === eventId)
  if (event && !event.attendees.includes(farcasterId)) {
    event.attendees.push(farcasterId)
  }
}

export async function boostEvent(eventId: string): Promise<void> {
  // Simulate API delay and payment processing
  await new Promise(resolve => setTimeout(resolve, 1500))

  const event = MOCK_EVENTS.find(e => e.eventId === eventId)
  if (event) {
    event.isBoosted = true
  }
}

// Helper function
function generateEventId(): string {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

