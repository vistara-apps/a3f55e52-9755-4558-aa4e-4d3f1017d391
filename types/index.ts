export interface User {
  farcasterId: string;
  displayName: string;
  bio?: string;
  interests: string[];
  connections: string[]; // Array of farcasterIds
}

export interface InterestTag {
  tagName: string;
}

export interface Event {
  eventId: string;
  eventName: string;
  description: string;
  dateTime: Date;
  location: string;
  attendees: string[]; // Array of farcasterIds
  creatorId: string;
  interests: string[]; // Related interests
  isPublic: boolean;
  isBoosted?: boolean;
}

export interface Profile {
  fid: number;
  username: string;
  displayName: string;
  bio?: string;
  pfp?: string;
  followerCount: number;
  followingCount: number;
}

// API Response types
export interface FarcasterProfile {
  fid: number;
  username: string;
  displayName: string;
  bio?: string;
  pfp?: string;
  followerCount: number;
  followingCount: number;
}

// Component props types
export interface ProfileCardProps {
  user: User;
  profile?: FarcasterProfile;
  variant?: 'displayInterests' | 'compact';
}

export interface EventCardProps {
  event: Event;
  variant?: 'upcoming' | 'past';
  onRSVP?: (eventId: string) => void;
}

export interface InterestTagProps {
  tag: string;
  variant?: 'selectable' | 'display';
  onClick?: (tag: string) => void;
  selected?: boolean;
}

export interface ActionButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'confirmation' | 'input';
}
