# The Polished Piggy

Mobile auto detailing for Greater Cincinnati. 100% veteran owned. Headlight restoration is the ad offer and lives at `/headlights`.

Domain: [PolishedPiggyCleaning.com](https://polishedpiggycleaning.com)

## Local

```bash
npm install
npm run dev
```

Runs at http://localhost:8080

```bash
npm run build
npm run preview
```

## What’s in here

- Public site and booking form
- Staff inbox at `/inbox` (sign-in required)
- Homepage is full mobile detailing
- `/headlights` is the Meta ad / DM landing

## Notes

Bookings land in the inbox. For production, point the database at Postgres (Neon or similar) and set Better Auth env vars.

Starting prices live in `src/lib/business.ts`.
