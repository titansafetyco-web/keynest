# KeyNest Platform

KeyNest is a real-estate social network + agent operating system.

## Locked deployment targets

These are the only allowed destinations. Do not create a second GitHub repo, Vercel project, Supabase project, or Google Cloud billing account for this app.

- GitHub: https://github.com/titansafetyco-web/keynest.git
- Production: https://keynest-dynodos7a-titan-energy.vercel.app/
- Supabase: https://ovjmmpcqtsxlpdkcyute.supabase.co
- Vercel team: https://vercel.com/titanenergy
- Google Cloud: titansafetyco@gmail.com / billing 015F35-A9F296-BA7E5B

## Included

- Public homepage at `/`
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

## Google Maps / Places

Paused until Google Cloud billing on `titansafetyco@gmail.com` / `015F35-A9F296-BA7E5B` is open. Location search is a plain text field. Do not wire Maps/Places from another Google account.

## Supabase

1. Confirm the project URL is `https://ovjmmpcqtsxlpdkcyute.supabase.co`.
2. Paste the anon and service-role keys into `.env.local` and the Vercel project env.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Replace the mock data in `lib/mock-data.ts` with database queries incrementally.

## Deploy

Production is **only** https://keynest-dynodos7a-titan-energy.vercel.app/ on the **titanenergy** Vercel team, built from `main` on https://github.com/titansafetyco-web/keynest.git.

Do not `git push` or `vercel --prod` to any other remote or project.

If the Vercel CLI is logged into the **titanenergy** account, link this folder to the existing KeyNest project (do not create a new one) and commit `.vercel/project.json`:

```bash
vercel link
```

This machine is not on titanenergy, so that file is not generated here. After keys are set:

```bash
git push origin main
```

Vercel should build from `main`. In the Vercel project env set:

- `NEXT_PUBLIC_SUPABASE_URL=https://ovjmmpcqtsxlpdkcyute.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL=https://keynest-dynodos7a-titan-energy.vercel.app`

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
