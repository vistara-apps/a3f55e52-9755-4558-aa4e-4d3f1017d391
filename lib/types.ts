export interface User {
  farcasterId: string;
  displayName: string;
  bio: string;
  interests: string[];
  connections: string[];
  avatar?: string;
}

export interface InterestTag {
  tagName: string;
  popularity?: number;
}

export interface Event {
  eventId: string;
  eventName: string;
  description: string;
  dateTime: string;
  location: string;
  attendees: string[];
  creatorId: string;
  interests: string[];
  isPublic: boolean;
  isBoosted?: boolean;
  maxAttendees?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface MeetupFormData {
  eventName: string;
  description: string;
  dateTime: string;
  location: string;
  interests: string[];
  isPublic: boolean;
  maxAttendees?: number;
}

export type TabId = 'home' | 'discover' | 'events' | 'profile';

export interface NavigationTab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
