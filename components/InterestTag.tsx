'use client';

import { cn } from '../lib/utils';

interface InterestTagProps {
  tagName: string;
  variant?: 'selectable' | 'display' | 'selected';
  onClick?: () => void;
  className?: string;
}

export function InterestTag({ 
  tagName, 
  variant = 'display', 
  onClick,
  className 
}: InterestTagProps) {
  const baseClasses = 'tag';
  
  const variantClasses = {
    selectable: 'tag-selectable',
    display: 'tag-display',
    selected: 'tag-selected',
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {tagName}
    </span>
  );
}
