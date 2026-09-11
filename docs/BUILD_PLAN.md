# KeyNest Build Plan for Cursor

## Product definition
KeyNest is a real-estate social network with:
- Consumer social feed
- Property marketplace
- Agent and brokerage profiles
- Creator network
- KeyPoints internal rewards economy
- Boost / Ads Manager
- Lead attribution
- Professional CRM
- Creator Marketplace

## Phase 1 — Foundation
- Next.js App Router
- Supabase Auth + Postgres
- Role system: member / creator / agent / broker / admin
- User onboarding
- Responsive design system
- Global navigation
- Image/media storage
- Analytics event envelope

## Phase 2 — Social network
- Feed ranking
- Posts + Reels
- Follow graph
- Likes, comments, saves, shares
- Public collections
- Neighborhood/building following
- Notifications
- Direct messaging

## Phase 3 — Real estate graph
- Listing creation
- Agent association
- Property detail page
- Search / filtering
- Map support
- Open house events
- Listing lifecycle
- Property analytics

## Phase 4 — Professional OS
- Agent verification workflow
- Brokerage/team accounts
- Lead inbox
- CRM stages
- Calendar/showing requests
- Attribution source persisted to lead
- Listing performance dashboard

## Phase 5 — Creator economy
- Creator activation
- Creator links / promo codes / QR
- Qualified engagement scoring
- KP wallet + immutable ledger
- Creator tiers
- Anti-fraud risk engine
- Reinvestment tools

## Phase 6 — Monetization
- Stripe subscriptions
- Pro / Team plans
- KeyPoints package purchases
- Boost campaigns
- Sponsored surfaces
- AI content credits
- Store assets

## Phase 7 — Creator Marketplace
- Campaign briefs
- Creator applications
- Deliverables
- Approval workflow
- Performance reporting
- Payout/reinvestment controls
- Dispute workflow

## Phase 8 — External advertising
- Meta / Google / TikTok integrations where permitted
- Housing-ad policy enforcement
- Creative generation
- External campaign status + metrics
- Media spend vs KeyNest fee breakout

## Recommended engineering architecture
- Next.js 15
- TypeScript
- Supabase Auth/Postgres/Storage/Realtime
- Stripe Billing + Connect only after legal/business model is finalized
- Vercel
- PostHog or equivalent analytics
- Resend for transactional email
- Twilio optional for SMS/voice
- Mapbox or Google Maps for maps/geocoding
- Background jobs via Supabase Edge Functions / Vercel cron / queue provider

## Security rules
- RLS on every user-owned table
- Admin operations use server-only service role
- Never expose service role key to client
- Rate limit comments/messages/creator-link events
- Store KP in ledger transactions, never client-controlled balances
- Creator rewards are calculated server-side
- Campaign approval before external distribution
