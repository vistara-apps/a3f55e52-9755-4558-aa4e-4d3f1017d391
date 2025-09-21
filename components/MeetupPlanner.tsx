'use client';

import { useState } from 'react';
import { ActionButton } from './ActionButton';
import { InterestTag } from './InterestTag';
import { Modal } from './Modal';
import { EventCard } from './EventCard';
import { MeetupFormData, Event } from '../lib/types';
import { EVENT_TYPES, BOOST_PRICE } from '../lib/constants';
import { generateId, formatDate } from '../lib/utils';
import { Plus, Calendar, MapPin, Users, Globe, Lock } from 'lucide-react';

interface MeetupPlannerProps {
  userInterests: string[];
  className?: string;
}

export function MeetupPlanner({ userInterests, className }: MeetupPlannerProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<string[]>([]);
  const [formData, setFormData] = useState<MeetupFormData>({
    eventName: '',
    description: '',
    dateTime: '',
    location: '',
    interests: [],
    isPublic: true,
  });

  const handleCreateEvent = () => {
    if (!formData.eventName || !formData.dateTime || !formData.location) {
      return;
    }

    const newEvent: Event = {
      eventId: generateId(),
      eventName: formData.eventName,
      description: formData.description,
      dateTime: formData.dateTime,
      location: formData.location,
      attendees: ['current-user'], // Auto-attend own events
      creatorId: 'current-user',
      interests: formData.interests,
      isPublic: formData.isPublic,
      maxAttendees: formData.maxAttendees,
    };

    setEvents([newEvent, ...events]);
    setAttendingEvents([...attendingEvents, newEvent.eventId]);
    setShowCreateModal(false);
    setFormData({
      eventName: '',
      description: '',
      dateTime: '',
      location: '',
      interests: [],
      isPublic: true,
    });
  };

  const handleRSVP = (eventId: string) => {
    if (attendingEvents.includes(eventId)) {
      setAttendingEvents(attendingEvents.filter(id => id !== eventId));
      setEvents(events.map(event => 
        event.eventId === eventId 
          ? { ...event, attendees: event.attendees.filter(id => id !== 'current-user') }
          : event
      ));
    } else {
      setAttendingEvents([...attendingEvents, eventId]);
      setEvents(events.map(event => 
        event.eventId === eventId 
          ? { ...event, attendees: [...event.attendees, 'current-user'] }
          : event
      ));
    }
  };

  const handleBoost = (eventId: string) => {
    // In a real app, this would trigger a payment flow
    setEvents(events.map(event => 
      event.eventId === eventId 
        ? { ...event, isBoosted: true }
        : event
    ));
  };

  const handleInterestToggle = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    }
  };

  const upcomingEvents = events.filter(event => new Date(event.dateTime) > new Date());
  const pastEvents = events.filter(event => new Date(event.dateTime) <= new Date());

  return (
    <div className={`container py-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading text-foreground">Plan a Vibe</h2>
            <p className="text-body text-foreground/60">
              Create and discover casual meetups
            </p>
          </div>
          <ActionButton
            variant="primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </ActionButton>
        </div>

        {/* Quick Event Types */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Quick Start</h3>
          <div className="grid grid-cols-2 gap-2">
            {EVENT_TYPES.slice(0, 6).map((eventType) => (
              <button
                key={eventType}
                onClick={() => {
                  setFormData({ ...formData, eventName: eventType });
                  setShowCreateModal(true);
                }}
                className="p-3 bg-surface border border-border rounded-md text-left hover:bg-muted transition-colors duration-200"
              >
                <span className="text-caption font-medium text-foreground">
                  {eventType}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Upcoming Events ({upcomingEvents.length})
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.eventId}
                  event={event}
                  variant="upcoming"
                  onRSVP={() => handleRSVP(event.eventId)}
                  onBoost={() => handleBoost(event.eventId)}
                  isAttending={attendingEvents.includes(event.eventId)}
                  canBoost={event.creatorId === 'current-user'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Past Events ({pastEvents.length})
            </h3>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.eventId}
                  event={event}
                  variant="past"
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
            <h3 className="text-heading text-foreground mb-2">No events yet</h3>
            <p className="text-body text-foreground/60 mb-6">
              Create your first event to start connecting with your people
            </p>
            <ActionButton
              variant="primary"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Event
            </ActionButton>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Event"
        variant="input"
      >
        <div className="space-y-4">
          {/* Event Name */}
          <div>
            <label className="block text-caption font-medium text-foreground mb-2">
              Event Name *
            </label>
            <input
              type="text"
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              placeholder="Coffee Chat, Park Hangout, etc."
              className="input"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-caption font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What's this event about?"
              rows={3}
              className="input resize-none"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-caption font-medium text-foreground mb-2">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              className="input"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-caption font-medium text-foreground mb-2">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Local Cafe, Central Park, etc."
              className="input"
            />
          </div>

          {/* Max Attendees */}
          <div>
            <label className="block text-caption font-medium text-foreground mb-2">
              Max Attendees (Optional)
            </label>
            <input
              type="number"
              value={formData.maxAttendees || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                maxAttendees: e.target.value ? parseInt(e.target.value) : undefined 
              })}
              placeholder="Leave empty for unlimited"
              min="2"
              max="50"
              className="input"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-caption font-medium text-foreground mb-2">
              Related Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {userInterests.map((interest) => (
                <InterestTag
                  key={interest}
                  tagName={interest}
                  variant={formData.interests.includes(interest) ? 'selected' : 'selectable'}
                  onClick={() => handleInterestToggle(interest)}
                />
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div>
            <label className="block text-caption font-medium text-foreground mb-2">
              Event Privacy
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFormData({ ...formData, isPublic: true })}
                className={`flex-1 p-3 rounded-md border transition-colors duration-200 ${
                  formData.isPublic
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface text-foreground border-border hover:bg-muted'
                }`}
              >
                <Globe className="w-4 h-4 mx-auto mb-1" />
                <div className="text-caption font-medium">Public</div>
                <div className="text-xs opacity-80">Discoverable by interests</div>
              </button>
              <button
                onClick={() => setFormData({ ...formData, isPublic: false })}
                className={`flex-1 p-3 rounded-md border transition-colors duration-200 ${
                  !formData.isPublic
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface text-foreground border-border hover:bg-muted'
                }`}
              >
                <Lock className="w-4 h-4 mx-auto mb-1" />
                <div className="text-caption font-medium">Private</div>
                <div className="text-xs opacity-80">Share via link only</div>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <ActionButton
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
              className="flex-1"
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={handleCreateEvent}
              disabled={!formData.eventName || !formData.dateTime || !formData.location}
              className="flex-1"
            >
              Create Event
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
