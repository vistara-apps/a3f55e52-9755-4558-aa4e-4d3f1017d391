'use client';

import { Event } from '../lib/types';
import { InterestTag } from './InterestTag';
import { ActionButton } from './ActionButton';
import { cn, formatDate } from '../lib/utils';
import { Calendar, MapPin, Users, Zap } from 'lucide-react';

interface EventCardProps {
  event: Event;
  variant?: 'upcoming' | 'past';
  onRSVP?: () => void;
  onBoost?: () => void;
  isAttending?: boolean;
  canBoost?: boolean;
  className?: string;
}

export function EventCard({
  event,
  variant = 'upcoming',
  onRSVP,
  onBoost,
  isAttending = false,
  canBoost = false,
  className,
}: EventCardProps) {
  const isPast = variant === 'past';
  const isUpcoming = variant === 'upcoming';

  return (
    <div className={cn('card animate-slide-up', className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{event.eventName}</h3>
            {event.isBoosted && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-accent/20 rounded-sm">
                <Zap className="w-3 h-3 text-accent" />
                <span className="text-xs text-accent font-medium">Boosted</span>
              </div>
            )}
          </div>
          <p className="text-body text-foreground/80 mb-2">{event.description}</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-caption text-foreground/60">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(event.dateTime)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-caption text-foreground/60">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-caption text-foreground/60">
          <Users className="w-4 h-4" />
          <span>
            {event.attendees.length} attending
            {event.maxAttendees && ` / ${event.maxAttendees} max`}
          </span>
        </div>
      </div>

      {/* Interests */}
      {event.interests.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {event.interests.slice(0, 4).map((interest) => (
              <InterestTag
                key={interest}
                tagName={interest}
                variant="display"
              />
            ))}
            {event.interests.length > 4 && (
              <span className="text-caption text-foreground/60">
                +{event.interests.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {isUpcoming && (
        <div className="flex gap-2">
          {onRSVP && (
            <ActionButton
              variant={isAttending ? "secondary" : "primary"}
              size="sm"
              onClick={onRSVP}
              className="flex-1"
            >
              {isAttending ? 'Cancel RSVP' : 'RSVP'}
            </ActionButton>
          )}
          
          {canBoost && onBoost && (
            <ActionButton
              variant="accent"
              size="sm"
              onClick={onBoost}
            >
              <Zap className="w-4 h-4 mr-1" />
              Boost ($0.25)
            </ActionButton>
          )}
        </div>
      )}

      {isPast && (
        <div className="text-caption text-foreground/60">
          Event completed • {event.attendees.length} attended
        </div>
      )}
    </div>
  );
}
