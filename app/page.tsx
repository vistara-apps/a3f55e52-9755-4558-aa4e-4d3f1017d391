'use client';

import { useState } from 'react';
import { InterestSelection } from '../components/InterestSelection';
import { InterestFeed } from '../components/InterestFeed';
import { MeetupPlanner } from '../components/MeetupPlanner';
import { ProfileCard } from '../components/ProfileCard';
import { Navigation } from '../components/Navigation';
import { Users, Calendar, Home, User } from 'lucide-react';

type Tab = 'home' | 'discover' | 'events' | 'profile';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [userInterests, setUserInterests] = useState<string[]>([]);
  // Mock context for now
  const context = { user: { fid: '1', displayName: 'Anonymous' } };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <InterestFeed userInterests={userInterests} />;
      case 'discover':
        return <InterestSelection onInterestsChange={setUserInterests} selectedInterests={userInterests} />;
      case 'events':
        return <MeetupPlanner userInterests={userInterests} />;
      case 'profile':
        return (
          <div className="container py-6">
            <ProfileCard
              user={{
                farcasterId: context?.user?.fid?.toString() || '1',
                displayName: context?.user?.displayName || 'Anonymous',
                bio: 'Finding my vibe on Base',
                interests: userInterests,
                connections: []
              }}
              variant="displayInterests"
            />
          </div>
        );
      default:
        return <InterestFeed userInterests={userInterests} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-heading text-accent">VibeFindr</h1>
              <p className="text-caption text-foreground/60">Connect with your people</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pb-20">
        {renderContent()}
      </div>

      {/* Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          { id: 'home', label: 'Feed', icon: Home },
          { id: 'discover', label: 'Discover', icon: Users },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'profile', label: 'Profile', icon: User },
        ]}
      />
    </div>
  );
}
