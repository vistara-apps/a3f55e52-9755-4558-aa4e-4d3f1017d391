'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { INTEREST_TAGS } from '@/lib/mock-data'
import { InterestTag } from './InterestTag'

interface InterestSelectorProps {
  selectedInterests: string[]
  onInterestSelect: (interests: string[]) => void
  maxSelections?: number
}

export function InterestSelector({
  selectedInterests,
  onInterestSelect,
  maxSelections = 5
}: InterestSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestSelect(selectedInterests.filter(i => i !== interest))
    } else if (selectedInterests.length < maxSelections) {
      onInterestSelect([...selectedInterests, interest])
    }
  }

  const handleRemoveInterest = (interest: string) => {
    onInterestSelect(selectedInterests.filter(i => i !== interest))
  }

  return (
    <div className="space-y-4">
      {/* Selected Interests */}
      {selectedInterests.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedInterests.map((interest) => (
            <motion.div
              key={interest}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
            >
              {interest}
              <button
                onClick={() => handleRemoveInterest(interest)}
                className="ml-2 hover:bg-primary/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Interest Grid */}
      <div className="grid grid-cols-2 gap-2">
        {INTEREST_TAGS.slice(0, isExpanded ? undefined : 6).map((tag) => (
          <InterestTag
            key={tag.tagName}
            tag={tag.tagName}
            variant="selectable"
            selected={selectedInterests.includes(tag.tagName)}
            onClick={() => handleInterestToggle(tag.tagName)}
          />
        ))}
      </div>

      {/* Show More/Less Button */}
      {INTEREST_TAGS.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary text-sm hover:underline"
        >
          {isExpanded ? 'Show less' : `Show ${INTEREST_TAGS.length - 6} more`}
        </button>
      )}

      {/* Selection Counter */}
      <div className="text-xs text-text/60">
        {selectedInterests.length}/{maxSelections} interests selected
      </div>
    </div>
  )
}

