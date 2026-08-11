<div align="center">

# FlutterPath — Deployment Guide

### Ship your progress tracker to production in four steps.

</div>

---

## 🔐 Before You Deploy: Clerk Auth + Single-User Allowlist

FlutterPath is a **single-user app**: every Convex handler operates on the one
fixed dataset key (`test-user-123`, enforced in `convex/lib/auth.ts`).
[Clerk](https://clerk.com) authentication gates the public API, and an
**allowlist** decides which Clerk users may use the app at all.

**Setup steps:**

1. Create a Clerk application and copy its keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` into `.env.local`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` into `.env.local` — server-side
     `auth.protect()` (every route layout/page) redirects signed-out visitors
     to this route
   - Your Clerk JWT issuer (e.g. `https://<your-app>.clerk.accounts.dev`) as
     `CLERK_JWT_ISSUER` in the **Convex deployment** environment:
     `npx convex env set CLERK_JWT_ISSUER https://<your-app>.clerk.accounts.dev`
2. Set the allowlist of Clerk user IDs that may use the app (comma-separated)
   in the **Convex deployment** environment. Handlers fail closed if it's
   unset:
   `npx convex env set ALLOWED_USER_IDS user_abc123,user_def456`
3. Deploy the Convex functions (`npx convex deploy`) — this pushes
   `convex/auth.config.ts` and the guarded handlers.
4. Deploy the Next.js app with the Clerk keys configured.

> Find your Clerk user ID in the Clerk dashboard (Users) or via
> `useUser().user.id` in the app — that's the value the allowlist matches.

**5. (If upgrading from the pre-auth app) Re-assign the legacy data once:**

Everything written before authentication was introduced lives under the fixed
key `test-user-123`. One-time, after the allowlist is set, run the migration
so that data belongs to the first allowlisted user (the app's owner) instead
of being orphaned:

```bash
npx convex run migrations/reassignLegacyUser:reassignLegacyUser
```

It reports a per-table count of re-keyed rows (`userProgress`, `skillsChecklist`,
`studySessions`, `userStreaks`, `userGoals`, `userBookmarks`, `userBadges`,
`projectShowcase`). It is **idempotent** — re-running it when no
`test-user-123` rows remain is a no-op (`alreadyMigrated: true`), and it fails
closed if `ALLOWED_USER_IDS` is unset. Run it **before** the first real user
starts writing new rows, so there's nothing to merge later.

**5b. (If you went the other way) Merge intermediate per-user rows back:**

If any rows were ever written under a real Clerk user ID instead of the fixed
key (e.g. after running step 5, or while a build keyed rows by the
authenticated subject), they're invisible to the app — the handlers only read
`test-user-123`. Merge them back so nothing is orphaned:

```bash
npx convex run migrations/mergePerUserRows:mergePerUserRows
```

Rows without a duplicate are re-keyed in place; rows that collide with an
existing `test-user-123` row are merged (progress/skills checklists are
unioned, streaks take the best values, and bookmarks/badges/goals keep the
existing row). It is **idempotent** — once no non-`test-user-123` rows remain,
re-running it is a no-op (`alreadyMerged: true`).

---

## Overview

FlutterPath is deployed as two independent services:

| Layer | Service | URL |
|-------|---------|-----|
| **Backend** | Convex | `https://your-project.convex.cloud` |
| **Frontend** | Vercel | `https://your-project.vercel.app` |

The backend must be deployed first — the frontend needs the production Convex URL to connect.

---

## Prerequisites

Before deploying, ensure you have:

- A **Vercel account** (free tier works) — [Sign up](https://vercel.com)
- A **Convex account** (free tier sufficient) — [Sign up](https://convex.dev)
- Your **GitHub repository** connected to Vercel
- **Node.js** 18+ installed locally (for CLI commands)

---

## Step 1: Deploy the Convex Backend

The Convex backend contains your database schema, serverless functions, and seed data. Deploy it before the frontend.

### 1.1 Authenticate Locally

```bash
npx convex login
```

This opens a browser window to authenticate and link your local project to your Convex account.

### 1.2 Deploy to Production

```bash
npx convex deploy --prod
```

This command:

- Pushes all Convex functions (`schema.ts`, `progress.ts`, `skills.ts`, `timeTracker.ts`, `badges.ts`, `goals.ts`, `streaks.ts`, `bookmarks.ts`, `showcase.ts`, `seed.ts`) to production
- Creates a production deployment with a unique, persistent URL
- Validates the schema against your existing data

After deployment, you'll see output like:

```
Deployed to production deployment: happy-otter-123
URL: https://happy-otter-123.convex.cloud
```

> **Save this URL** — you'll need it when configuring Vercel in Step 2.

### 1.3 Seed the Production Database

Your production database is empty on first deploy. You need to populate it with the 34-week roadmap data.

**Option A — Via the App (Recommended)**

1. Once the frontend is deployed (or locally with `npm run dev`), navigate to the **Roadmap** page
2. Click **"Load Roadmap Data"**
3. Wait a few seconds — all 10 phases and 34 weeks will appear
4. Navigate to the **Skills Checklist** page — the 9 categories auto-initialize on first load

**Option B — Via the Convex Dashboard**

1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Select your project
3. Navigate to **Functions** → `seed:seedRoadmap`
4. Click **Run**

---

## Step 2: Deploy to Vercel

### 2.1 Connect Your Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click **Import**

### 2.2 Configure the Project

Vercel auto-detects Next.js. Verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Build Command** | `next build` |
| **Output Directory** | `.next` |
| **Install Command** | `npm install` |

### 2.3 Set Environment Variables

In the Vercel dashboard, go to **Settings → Environment Variables** and add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | `https://your-project.convex.cloud` | Production, Preview, Development |

> Replace `your-project.convex.cloud` with the URL from Step 1.2.

**Important:** Set this variable for **all three environments** (Production, Preview, Development) to ensure pull request previews and development branches also work correctly.

### 2.4 Deploy

Click **Deploy**. Vercel will:

1. Install dependencies
2. Build the Next.js app
3. Deploy to its global edge network

The first build takes ~60 seconds. Subsequent builds are faster (~30 seconds).

### 2.5 Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain (e.g., `flutterpath.dev`)
3. Update your DNS records as instructed by Vercel
4. SSL certificate is provisioned automatically

---

## Step 3: Verify Deployment

Run through these checks after your first deployment to ensure everything works.

### 3.1 Verify the App is Live

- [ ] Open your Vercel deployment URL
- [ ] You should see the Dashboard page with the progress ring and stats
- [ ] Navigate to each page (Roadmap, Skills, Docs, Cheat Sheet, Resources) to ensure everything loads

### 3.2 Verify Convex Connection

If the app shows a "Convex Configuration Missing" error:

- The `NEXT_PUBLIC_CONVEX_URL` environment variable is not set correctly
- Go to **Vercel → Settings → Environment Variables** and verify the value
- Redeploy the app after fixing

### 3.3 Seed Data (if needed)

If the Roadmap page shows "No roadmap data yet":

1. Click **"Load Roadmap Data"** on the Roadmap page
2. Wait a few seconds for the seed mutation to complete
3. Refresh the page — all 34 weeks should appear

### 3.4 Test Real-time Sync

1. Open the app in two browser tabs (or on two devices)
2. Check a topic in one tab
3. Verify it updates instantly in the other tab — no refresh needed

### 3.5 Verify Study Timer

1. Click the timer in the top navbar
2. Start a Pomodoro session (25 minutes)
3. Verify the countdown updates every second
4. Verify the browser notification fires when the timer completes
5. Verify the session is saved and appears in the Dashboard

### 3.6 Verify Knowledge Base

1. Navigate to the **Docs** page
2. Use the search bar to search for "Provider" — results should appear instantly
3. Click a category (e.g., "Bloc/Cubit") — entries should load lazily
4. Click a difficulty badge to filter by level

### 3.7 Verify Badges

1. Complete a week's topics on the Roadmap page
2. Navigate to the Dashboard — the **week-warrior** badge should appear in the badge showcase
3. A confetti celebration should fire on the first badge unlock

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `No address provided to ConvexReactClient` | Missing environment variable | Set `NEXT_PUBLIC_CONVEX_URL` in Vercel for all environments, then redeploy |
| `Not authenticated` | Convex CLI session expired | Run `npx convex login` locally, then `npx convex deploy --prod` again |
| Blank page after deploy | Multiple possible causes | Check browser console; most likely missing env var or schema mismatch |
| Slow initial load | Cold Convex database | Normal on first request — subsequent loads are fast due to Convex caching |
| Roadmap shows "No data" | Production DB not seeded | Click "Load Roadmap Data" or run `seed:seedRoadmap` from the Convex Dashboard |
| Timer not persisting | localStorage not available | Ensure the app is served over HTTPS (Vercel handles this automatically) |
| Search returns no results | Knowledge base not loaded | Navigate to Docs page first — categories lazy-load on initial visit |

---

## Production Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Your Convex production deployment URL |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | No | Convex site URL for HTTP actions |
| `CONVEX_DEPLOYMENT` | No | Only needed for CLI deployment commands (not used at runtime) |

---

## Rollback

If a deployment goes wrong:

### Vercel Rollback

1. Go to **Deployments** in your Vercel project dashboard
2. Find the last working deployment
3. Click the **⋯** menu → **Promote to Production**

### Convex Rollback

1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Select your project
3. Navigate to **Deployments**
4. Find the last working deployment → click **Promote**

---

<div align="center">

**Happy deploying!**

</div>
