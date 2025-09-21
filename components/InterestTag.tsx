'use client'

import { motion } from 'framer-motion'
import { InterestTagProps } from '@/types'
import { getInterestColor } from '@/lib/utils'

export function InterestTag({
  tag,
  variant = 'display',
  selected = false,
  onClick
}: InterestTagProps) {
  const colorClass = getInterestColor(tag)

  if (variant === 'selectable') {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick?.(tag)}
        className={`
          px-3 py-2 rounded-md text-sm font-medium transition-all
          ${selected
            ? `${colorClass} text-white shadow-md`
            : 'bg-surface text-text hover:bg-surface/80 border border-primary/20'
          }
        `}
      >
        {tag}
      </motion.button>
    )
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-block px-2 py-1 rounded text-xs font-medium ${colorClass} text-white mr-2 mb-2`}
    >
      {tag}
    </motion.span>
  )
}

