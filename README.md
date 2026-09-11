# KeyNest Platform

KeyNest is a real-estate social network + agent operating system.

## Locked deployment targets

- GitHub: https://github.com/titansafetyco-web/keynest.git
- Supabase: https://ovjmmpcqtsxlpdkcyute.supabase.co
- Vercel team: https://vercel.com/titanenergy

## Included

- Public marketing homepage at `/`
- In-app social shell at `/home`
- Explore / search
- Property detail pages
- Agent and creator profiles
- Creator Network / KeyPoints wallet
- Boost / internal advertising console
- Professional CRM dashboard
- Supabase starter client/server utilities
- SQL schema for users, listings, posts, follows, saves, comments, KP ledger, campaigns and leads

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

`.env.example` already points `NEXT_PUBLIC_SUPABASE_URL` at the locked Supabase project. Add the anon and service-role keys locally. Never commit `.env.local`.

## Supabase

1. Confirm the project URL is `https://ovjmmpcqtsxlpdkcyute.supabase.co`.
2. Paste the anon and service-role keys into `.env.local` and the Vercel project env.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Replace the mock data in `lib/mock-data.ts` with database queries incrementally.

## Deploy

The production app is intended to live on the **titanenergy** Vercel team, connected to the GitHub repo above. After keys are set:

```bash
git push origin main
```

Vercel should build from `main`. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_APP_URL` in the Vercel project.

## Recommended implementation order

1. Auth + profiles
2. Listings + feed
3. Follows / saves / comments
4. Agent verification
5. Creator profiles + KeyPoints ledger
6. Boost campaigns
7. CRM leads + pipeline
8. Billing / subscriptions
9. Creator marketplace
10. External advertising integrations

## Compliance

Do not pay unlicensed users transaction-linked referral compensation without legal review. Keep creator rewards tied to legitimate marketing/content activity.
