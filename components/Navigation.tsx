'use client'

import { Home, Users, Calendar, User } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Users, label: 'Discover', href: '/discover' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: User, label: 'Profile', href: '/profile' },
]

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-surface border-t border-primary/20 px-4 py-3"
    >
      <div className="max-w-lg mx-auto flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center space-y-1 text-text/60 hover:text-primary transition-colors"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  )
}

