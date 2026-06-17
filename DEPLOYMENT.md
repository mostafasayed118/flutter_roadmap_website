<div align="center">

# FlutterPath — Deployment Guide

### Ship your progress tracker to production in three steps.

</div>

---

## Overview

FlutterPath is deployed as two independent services:

| Layer | Service | URL |
|-------|---------|-----|
| **Backend** | Convex | `https://your-project.convex.cloud` |
| **Frontend** | Vercel | `https://your-project.vercel.app` |

The backend must be deployed first — the frontend needs the production Convex URL to connect.

---

## Step 1: Deploy the Convex Backend

The Convex backend contains your database schema, serverless functions, and seed data. Deploy it before the frontend.

### 1.1 Create a Convex Account

If you haven't already, sign up at [convex.dev](https://convex.dev) (free tier available).

### 1.2 Authenticate Locally

```bash
npx convex login
```

This opens a browser window to authenticate and link your local project to your Convex account.

### 1.3 Deploy to Production

```bash
npx convex deploy --prod
```

This command:

- Pushes all Convex functions (`schema.ts`, `progress.ts`, `skills.ts`, `timeTracker.ts`, `seed.ts`) to production
- Creates a production deployment with a unique, persistent URL
- Validates the schema against your existing data

After deployment, you'll see output like:

```
Deployed to production deployment: happy-otter-123
URL: https://happy-otter-123.convex.cloud
```

> **Save this URL** — you'll need it when configuring Vercel in Step 2.

### 1.4 Seed the Production Database

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

> Replace `your-project.convex.cloud` with the URL from Step 1.3.

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

## Step 3: Post-Deployment Checks

Run through these checks after your first deployment to ensure everything works.

### 3.1 Verify the App is Live

1. Open your Vercel deployment URL
2. You should see the Dashboard page with the progress ring and stats
3. Navigate to each page (Roadmap, Skills, Resources, Cheat Sheet) to ensure everything loads

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

### 3.5 Verify Study Time Tracker

1. Click **"Log Session"** in the top navbar
2. Log a study session (e.g., 30 minutes with a note)
3. Verify it appears in the Dashboard study time card
4. Verify the week badge appears on the Roadmap page

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `No address provided to ConvexReactClient` | Missing environment variable | Set `NEXT_PUBLIC_CONVEX_URL` in Vercel for all environments, then redeploy |
| `Not authenticated` | Convex CLI session expired | Run `npx convex login` locally, then `npx convex deploy --prod` again |
| Blank page after deploy | Multiple possible causes | Check browser console; most likely missing env var or schema mismatch |
| Slow initial load | Cold Convex database | Normal on first request — subsequent loads are fast due to Convex caching |
| Roadmap shows "No data" | Production DB not seeded | Click "Load Roadmap Data" or run `seed:seedRoadmap` from the Convex Dashboard |

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
