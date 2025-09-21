# VibeFindr

Connect with your people, find your vibe - A Base MiniApp for discovering shared interests and planning casual meetups within the Farcaster ecosystem.

## 🚀 Features

### Core Features

- **Interest-Based Discovery**: Select hobbies and interests to find other Farcaster users with overlapping passions
- **Casual Meetup Planner**: Create and discover low-stakes social gatherings (coffee chats, park hangouts, etc.)
- **Interest Feed**: Curated feed of popular interests, upcoming events, and community trends

### Business Model

- **Freemium with Micro-transactions**:
  - Free: Basic discovery and event creation
  - Premium: Enhanced matching ($1/month) and event visibility boosts ($0.25 per boost)
- **Base Network Integration**: On-chain micro-transactions for boosts and premium features

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blockchain**: Base Network (Ethereum L2)
- **Wallet**: Coinbase Wallet SDK
- **TypeScript**: Full type safety

## 📁 Project Structure

```
vibefindr/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── CreateEventModal.tsx
│   ├── EventCard.tsx
│   ├── InterestSelector.tsx
│   ├── InterestTag.tsx
│   ├── Navigation.tsx
│   └── ProfileCard.tsx
├── lib/                   # Utility functions
│   ├── mock-data.ts       # Mock data and API functions
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript type definitions
│   └── index.ts
└── public/                # Static assets
```

## 🎨 Design System

### Colors
- **Background**: `hsl(220, 20%, 15%)`
- **Text**: `hsl(220, 20%, 95%)`
- **Accent**: `hsl(30, 90%, 60%)` (Orange)
- **Primary**: `hsl(220, 85%, 55%)` (Blue)
- **Surface**: `hsl(220, 20%, 20%)`

### Typography
- **Display**: `text-3xl font-bold`
- **Heading**: `text-2xl font-semibold`
- **Body**: `text-base font-normal`
- **Caption**: `text-sm font-medium`

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting (via ESLint)

## 🔗 API Integration

### Farcaster API
- **Purpose**: User profile data and social connections
- **Status**: Mock implementation ready for real API integration
- **Docs**: [Farcaster Developer Docs](https://docs.farcaster.xyz/)

### Base Network
- **Purpose**: Micro-transactions for event boosts and premium features
- **Status**: Wallet integration ready
- **Docs**: [Base Documentation](https://docs.base.org/)

## 📱 User Flows

### Interest Discovery Flow
1. User opens the app
2. Selects 3-5 interests from predefined list
3. App displays users with matching interests
4. User can view profiles and initiate connections

### Event Creation Flow
1. User navigates to "Plan a Vibe" section
2. Inputs event details (name, description, date/time, location)
3. Selects relevant interests
4. Chooses public/private visibility
5. Optionally boosts event for increased visibility

## 🔒 Security & Privacy

- **Wallet Integration**: Secure connection to Base network
- **Data Privacy**: User data handled according to Farcaster privacy policies
- **Transaction Security**: On-chain micro-transactions with proper gas estimation

## 📈 Future Enhancements

- **DeSS Integration**: Decentralized Social Score for enhanced relationship graphing
- **Advanced Filters**: Location-based and proximity-based matching
- **Event Templates**: Pre-built event types for common activities
- **Community Features**: Interest-based groups and communities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for the Farcaster ecosystem
- Powered by Base network
- Inspired by the need for meaningful social connections

