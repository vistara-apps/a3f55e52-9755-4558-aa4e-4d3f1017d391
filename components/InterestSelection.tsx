'use client';

import { useState } from 'react';
import { InterestTag } from './InterestTag';
import { ActionButton } from './ActionButton';
import { POPULAR_INTERESTS, MAX_INTERESTS_SELECTION } from '../lib/constants';
import { Search, Plus } from 'lucide-react';

interface InterestSelectionProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  className?: string;
}

export function InterestSelection({
  selectedInterests,
  onInterestsChange,
  className,
}: InterestSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [customInterest, setCustomInterest] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const filteredInterests = POPULAR_INTERESTS.filter(interest =>
    interest.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedInterests.includes(interest)
  );

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < MAX_INTERESTS_SELECTION) {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  const handleCustomInterestAdd = () => {
    if (customInterest.trim() && 
        !selectedInterests.includes(customInterest.trim()) &&
        selectedInterests.length < MAX_INTERESTS_SELECTION) {
      onInterestsChange([...selectedInterests, customInterest.trim()]);
      setCustomInterest('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className={`container py-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-heading text-foreground mb-2">
            What are you into?
          </h2>
          <p className="text-body text-foreground/60">
            Select up to {MAX_INTERESTS_SELECTION} interests to find your people
          </p>
        </div>

        {/* Selected Interests */}
        {selectedInterests.length > 0 && (
          <div className="card">
            <h3 className="font-semibold text-foreground mb-3">
              Your Interests ({selectedInterests.length}/{MAX_INTERESTS_SELECTION})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <InterestTag
                  key={interest}
                  tagName={interest}
                  variant="selected"
                  onClick={() => handleInterestToggle(interest)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/60" />
          <input
            type="text"
            placeholder="Search interests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Popular Interests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Popular Interests</h3>
            <ActionButton
              variant="secondary"
              size="sm"
              onClick={() => setShowCustomInput(!showCustomInput)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Custom
            </ActionButton>
          </div>

          {/* Custom Interest Input */}
          {showCustomInput && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter custom interest..."
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                className="input flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCustomInterestAdd();
                  }
                }}
              />
              <ActionButton
                variant="primary"
                size="sm"
                onClick={handleCustomInterestAdd}
                disabled={!customInterest.trim() || selectedInterests.length >= MAX_INTERESTS_SELECTION}
              >
                Add
              </ActionButton>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {filteredInterests.map((interest) => (
              <InterestTag
                key={interest}
                tagName={interest}
                variant="selectable"
                onClick={() => handleInterestToggle(interest)}
              />
            ))}
          </div>

          {filteredInterests.length === 0 && searchTerm && (
            <p className="text-center text-foreground/60 py-8">
              No interests found matching "{searchTerm}"
            </p>
          )}
        </div>

        {/* Selection Limit Warning */}
        {selectedInterests.length >= MAX_INTERESTS_SELECTION && (
          <div className="card bg-accent/10 border-accent/20">
            <p className="text-caption text-accent">
              You've reached the maximum of {MAX_INTERESTS_SELECTION} interests. 
              Remove some to add new ones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
