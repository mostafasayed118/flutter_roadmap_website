# Deployment Guide

A step-by-step guide to deploying FlutterPath to production using Convex (backend) and Vercel (frontend).

---

## Step 1: Deploy Convex Backend

The Convex backend contains your database schema, queries, mutations, and seed data. It must be deployed first.

### 1.1 Create a Convex Account

If you haven't already, sign up at [convex.dev](https://convex.dev) (free tier available).

### 1.2 Link Your Project

```bash
npx convex login
```

This opens a browser window to authenticate and link your local project to your Convex account.

### 1.3 Deploy to Production

```bash
npx convex deploy --prod
```

This will:
- Push all your Convex functions (`schema.ts`, `progress.ts`, `skills.ts`, `timeTracker.ts`, `seed.ts`) to production
- Create a production deployment with a unique URL

After deployment, you'll see output like:

```
Deployed to production deployment: happy-otter-123
URL: https://happy-otter-123.convex.cloud
```

**Save this URL** — you'll need it for Vercel.

### 1.4 Seed the Production Database

If this is your first deployment, the production database is empty. You need to seed it:

1. Navigate to your production app (once deployed)
2. Go to the **Roadmap** page
3. Click **"Load Roadmap Data"**
4. Go to the **Skills Checklist** page — skills auto-initialize on first load

Alternatively, you can use the Convex Dashboard to run the seed mutation manually:

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

Vercel will auto-detect Next.js. Use these settings:

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

### 3.1 Verify the App is Live

1. Open your Vercel deployment URL
2. You should see the Dashboard page
3. Navigate to each page to ensure everything loads

### 3.2 Verify Convex Connection

If the app shows a "Convex Configuration Missing" error:
- The `NEXT_PUBLIC_CONVEX_URL` environment variable is not set correctly
- Go to Vercel → Settings → Environment Variables and verify the value

### 3.3 Seed Data (if needed)

If the Roadmap page shows "No roadmap data yet":
1. Click **"Load Roadmap Data"** on the Roadmap page
2. Wait a few seconds for the seed mutation to complete
3. Refresh the page — all 34 weeks should appear

### 3.4 Test Real-time Sync

1. Open the app in two browser tabs
2. Check a topic in one tab
3. Verify it updates instantly in the other tab

### 3.5 Verify Study Time Tracker

1. Click **"Log Session"** in the top navbar
2. Log a study session (e.g., 30 minutes)
3. Verify it appears in the Dashboard study time card
4. Verify the week badge appears on the Roadmap page

---

## Troubleshooting

### Build Fails on Vercel

**Error:** `No address provided to ConvexReactClient`

**Fix:** Ensure `NEXT_PUBLIC_CONVEX_URL` is set in Vercel environment variables for all environments (Production, Preview, Development).

### Convex Functions Not Deploying

**Error:** `Not authenticated`

**Fix:** Run `npx convex login` locally, then `npx convex deploy --prod` again.

### Blank Page After Deploy

**Fix:** Check the browser console for errors. Most likely:
1. Missing environment variable → check Vercel settings
2. Convex schema mismatch → run `npx convex deploy --prod` again

### Slow Initial Load

**Fix:** The first load may be slow if the Convex database is cold. Subsequent loads are fast due to Convex's caching.

---

## Production Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | ✅ Yes | Your Convex production deployment URL |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | Optional | Convex site URL for HTTP actions |
| `CONVEX_DEPLOYMENT` | Optional | Only needed for CLI deployment commands |

---

## Rollback

If a deployment goes wrong:

1. **Vercel:** Go to **Deployments** → find the last working deployment → click **Promote to Production**
2. **Convex:** Go to [dashboard.convex.dev](https://dashboard.convex.dev) → your project → **Deployments** → promote a previous deployment

---

<div align="center">

**Happy deploying! 🚀**

</div>
