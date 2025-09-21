# VibeFindr - Base MiniApp

Connect with your people, find your vibe.

A Base MiniApp for discovering shared interests and planning casual meetups within the Farcaster ecosystem.

## Features

- **Interest-Based Discovery**: Find like-minded people through shared interests
- **Casual Meetup Planner**: Create and join low-stakes social gatherings
- **Interest Feed**: Discover trending interests and upcoming events
- **Micro-transactions**: Boost events for increased visibility ($0.25)
- **Social Integration**: Built for the Farcaster ecosystem

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network
- **Wallet**: MiniKit + OnchainKit integration
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd vibefindr
npm install
```

2. **Set up environment variables**:
```bash
cp .env.local.example .env.local
```

Add your OnchainKit API key to `.env.local`:
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open in Base App**:
Navigate to `http://localhost:3000` in Base App or compatible Farcaster client.

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main app component
├── providers.tsx      # MiniKit + OnchainKit providers
├── globals.css        # Global styles and design tokens
├── loading.tsx        # Loading UI
└── error.tsx          # Error boundary

components/
├── InterestSelection.tsx   # Interest discovery interface
├── MeetupPlanner.tsx      # Event creation and management
├── InterestFeed.tsx       # Main feed with events and people
├── ProfileCard.tsx        # User profile display
├── EventCard.tsx          # Event display and interaction
├── InterestTag.tsx        # Interest tag component
├── ActionButton.tsx       # Reusable button component
├── Modal.tsx              # Modal dialog component
└── Navigation.tsx         # Bottom navigation

lib/
├── types.ts           # TypeScript type definitions
├── constants.ts       # App constants and configuration
└── utils.ts           # Utility functions
```

## Design System

The app uses a custom dark theme with the following tokens:

- **Colors**: Dark background with blue primary and orange accent
- **Typography**: Display, Heading, Body, and Caption styles
- **Spacing**: Consistent 4px-based spacing scale
- **Components**: Modular, reusable UI components

## Features Implementation

### Interest Discovery
- Select up to 5 interests from popular categories
- Add custom interests
- Find users with matching interests
- Visual interest matching indicators

### Event Planning
- Quick-start templates for common event types
- Public/private event options
- RSVP functionality
- Event boosting with micro-transactions

### Social Feed
- Personalized event recommendations
- User suggestions based on interests
- Trending interests display
- Real-time activity updates

## Micro-transactions

- **Event Boost**: $0.25 to increase event visibility
- **VibeCheck Premium**: $1/month for enhanced matching (future feature)
- Powered by Base Network for low-cost transactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
