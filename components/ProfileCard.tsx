'use client';

import { User } from '../lib/types';
import { InterestTag } from './InterestTag';
import { ActionButton } from './ActionButton';
import { cn, getCommonInterests } from '../lib/utils';
import { MessageCircle, UserPlus } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  variant?: 'displayInterests' | 'compact';
  currentUserInterests?: string[];
  onConnect?: () => void;
  onMessage?: () => void;
  className?: string;
}

export function ProfileCard({
  user,
  variant = 'displayInterests',
  currentUserInterests = [],
  onConnect,
  onMessage,
  className,
}: ProfileCardProps) {
  const commonInterests = getCommonInterests(currentUserInterests, user.interests);
  const isCompact = variant === 'compact';

  return (
    <div className={cn('card animate-fade-in', className)}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold">
            {user.displayName.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">
                {user.displayName}
              </h3>
              {!isCompact && (
                <p className="text-caption text-foreground/60 mt-1">
                  {user.bio}
                </p>
              )}
            </div>
            
            {/* Action buttons for other users */}
            {(onConnect || onMessage) && (
              <div className="flex gap-2 ml-2">
                {onMessage && (
                  <ActionButton
                    variant="secondary"
                    size="sm"
                    onClick={onMessage}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </ActionButton>
                )}
                {onConnect && (
                  <ActionButton
                    variant="primary"
                    size="sm"
                    onClick={onConnect}
                  >
                    <UserPlus className="w-4 h-4" />
                  </ActionButton>
                )}
              </div>
            )}
          </div>

          {/* Interests */}
          {user.interests.length > 0 && (
            <div className="space-y-2">
              {commonInterests.length > 0 && currentUserInterests.length > 0 && (
                <div>
                  <p className="text-caption text-accent mb-1">
                    {commonInterests.length} shared interest{commonInterests.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {commonInterests.slice(0, isCompact ? 2 : 5).map((interest) => (
                      <InterestTag
                        key={interest}
                        tagName={interest}
                        variant="selected"
                      />
                    ))}
                    {commonInterests.length > (isCompact ? 2 : 5) && (
                      <span className="text-caption text-foreground/60">
                        +{commonInterests.length - (isCompact ? 2 : 5)} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {!isCompact && (
                <div>
                  <p className="text-caption text-foreground/60 mb-1">All interests</p>
                  <div className="flex flex-wrap gap-1">
                    {user.interests.slice(0, 8).map((interest) => (
                      <InterestTag
                        key={interest}
                        tagName={interest}
                        variant="display"
                      />
                    ))}
                    {user.interests.length > 8 && (
                      <span className="text-caption text-foreground/60">
                        +{user.interests.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
