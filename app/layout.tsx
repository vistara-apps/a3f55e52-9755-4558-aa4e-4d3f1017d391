import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VibeFindr',
  description: 'Connect with your people, find your vibe - A Base MiniApp for discovering shared interests and planning casual meetups',
  keywords: ['Farcaster', 'social', 'interests', 'meetups', 'Base', 'miniapp'],
  authors: [{ name: 'VibeFindr Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-bg">
          {children}
        </div>
      </body>
    </html>
  )
}
