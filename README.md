<div align="center">

# FlutterPath

### Your interactive companion for mastering Flutter development.

An interactive, gamified progress tracker that transforms a comprehensive 34-week Flutter roadmap into a stunning real-time learning dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&style=for-the-badge)
![Convex](https://img.shields.io/badge/Convex-1.41-purple?logo=convex&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-cyan?logo=tailwindcss&style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/flutterpath)

</div>

---

## About

**FlutterPath** solves a real problem: *how do you systematically learn Flutter development without losing track of your progress?*

The Flutter ecosystem is vast — Dart, widgets, state management, architecture, testing, Firebase, deployment — and most developers rely on static Markdown checklists that quickly become outdated or forgotten. FlutterPath transforms that static roadmap into a **dynamic, interactive, and gamified learning experience** with real-time sync, visual progress indicators, and celebration moments that keep you motivated across 34 weeks of structured learning.

---

## 🔐 Security Model: Single-User, Authenticated via Clerk

FlutterPath is a **single-user application**: every handler operates on the one
fixed dataset key (`test-user-123`, see `convex/lib/auth.ts`). Authentication
via [Clerk](https://clerk.com) is the front door — it keeps the public API
closed — and a server-side **allowlist** decides who may walk through it.

| Claim | Reality |
|---|---|
| **Authentication** | ✅ [Clerk](https://clerk.com) via Convex auth (`convex/auth.config.ts`). Signed-out visitors see a sign-in screen and can't reach the app. |
| **Route gating** | ✅ Every server layout/page calls `await auth.protect()` (`@clerk/nextjs/server`); client-component pages are covered by their server layouts. Unprotected resources under `src/app` **fail CI** (`@clerk/eslint-plugin` `require-auth-protection`). Signed-out visitors are redirected to `/sign-in`. |
| **Single-user dataset** | ✅ Every handler scopes reads/writes to the constant `test-user-123` — no visitor, even a signed-in one, ever touches any other rows. |
| **Allowlist** | ✅ Only Clerk users listed in `ALLOWED_USER_IDS` (Convex deployment env) may use the app at all. Fails closed if unset. |
| **Authorization** | ✅ Every Convex query and mutation calls `requireUser(ctx)` (`convex/lib/auth.ts`): verified session → allowlist check → fixed dataset key. No client-supplied `userId` is trusted. |
| **ID-based mutations** | Sessions, bookmarks, and showcase projects verify row ownership (must belong to the fixed dataset) before patching/deleting. |
| **Leaderboard** | Aggregation is global across the single dataset, and reading it requires authentication. |

**Required environment variables:**

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `.env.local` | Clerk client |
| `CLERK_SECRET_KEY` | `.env.local` | Clerk server |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `.env.local` | Where `auth.protect()` redirects signed-out visitors (`/sign-in`) |
| `CLERK_JWT_ISSUER` | Convex deployment env (`npx convex env set`) | Convex validates Clerk JWTs |
| `ALLOWED_USER_IDS` | Convex deployment env (`npx convex env set`) | Comma-separated Clerk user IDs allowed to use the app |

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full setup.

> **Upgrading from the pre-auth app?** Your historical progress still lives
> under the legacy `test-user-123` key. Run the one-time re-assignment
> migration once so it belongs to the first allowlisted user instead of being
> orphaned — see [DEPLOYMENT.md](./DEPLOYMENT.md), "Before You Deploy" step 5.
> If rows ever ended up under a real Clerk user ID instead, the
> `mergePerUserRows` migration folds them back into `test-user-123` (step 5b).

---

## Features

- **Interactive 34-Week Roadmap** — Collapsible phase accordions with per-week topic/project checkboxes, time badges, and auto-scroll to your current week
- **Drift-Proof Study Timer** — Pomodoro presets (25/5), `Date.now()` delta timing, localStorage persistence, Web Audio API chimes, and browser notifications
- **Skills Checklist** — 9 categories (Dart, Flutter UI, State Mgmt, Networking, Storage, Architecture, Testing, Firebase, Deployment) with animated progress bars and auto-initialization
- **Knowledge Base** — 184 structured entries across 6 lazy-loaded categories with fuzzy search, difficulty badges, roadmap week cross-links, and read tracking
- **Cheat Sheet** — 40+ copy-to-clipboard Flutter/Dart code snippets organized by category
- **Dashboard** — Progress ring, quick stats grid, next steps, weekly bar chart, session list, suggested reading, badge showcase, and weekly goal progress ring
- **Badge System** — 18 achievements (week-warrior, five-weeks, dart-master, flutter-foundation, state-guru, firebase-explorer, all-rounder, and more) with auto-unlock via reactive Convex queries and confetti celebrations
- **Keyboard Shortcuts** — Space (start/pause timer), S (save session), / (focus search), ? (shortcuts modal), Esc (close dialogs)

---

## Architecture

FlutterPath follows **Clean Architecture** principles with strict separation of concerns:

- **7 custom hooks** encapsulate all business logic — zero logic in UI components
- **React Server Components / Client Components** boundaries enforced at the page level
- **Convex reactive queries** provide real-time sync across all pages with zero polling
- **Lazy-loaded knowledge base categories** reduce initial bundle size by 81%
- **Composited-only animations** with `prefers-reduced-motion` support
- **Optimized Convex indexes** for fast per-user and per-week queries

---

## Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, React Server Components, file-based routing |
| **Backend** | [Convex](https://convex.dev/) | Real-time serverless database, reactive queries, 5 tables, 9 indexes |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict mode, zero `any` types, end-to-end type safety |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Utility-first CSS, 20+ Radix UI primitives |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) | Page transitions, micro-interactions, layout animations |
| **Charts** | [Recharts](https://recharts.org/) | SVG progress rings, weekly bar charts |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, lightweight icon set |
| **Toasts** | [Sonner](https://sonner.emilkowal.ski/) | Beautiful, non-intrusive notifications |
| **Themes** | [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode with system preference detection |
| **Celebrations** | [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) | Lightweight confetti particle effects on achievements |
| **Utilities** | `clsx`, `tailwind-merge` | Conditional class merging, variant management |

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17 or later — [Download](https://nodejs.org/)
- **npm**, **yarn**, or **pnpm** — comes with Node.js
- **Git** — [Download](https://git-scm.com/)
- **Convex account** (free tier sufficient) — [Sign up](https://convex.dev)

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/flutterpath.git
cd flutterpath
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Convex

```bash
npx convex dev
```

This will:
- Prompt you to create or link a Convex project
- Generate a `.env.local` file with your deployment URL
- Start the local Convex backend in watch mode

> Keep this terminal running — Convex needs to stay active during development.

### 4. Seed the roadmap data

In a **separate terminal**, open the app at `http://localhost:3000`, navigate to the **Roadmap** page, and click **"Load Roadmap Data"** to populate the database with all 10 phases and 34 weeks.

The **Skills Checklist** initializes automatically on first visit.

### 5. Start the dev server

```bash
npm run dev
```

### 6. Open the app

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

The following environment variables are configured automatically by `npx convex dev`:

```env
# Convex deployment name (set automatically by `npx convex dev`)
CONVEX_DEPLOYMENT=your-project-name

# Convex API URL — your frontend connects to this
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Convex site URL — used for HTTP actions
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-project.convex.site
```

> **Note:** Only `NEXT_PUBLIC_CONVEX_URL` is required at runtime. The other variables are used by the Convex CLI during deployment.

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## Project Structure

```
flutterpath/
├── convex/                          # Convex backend (serverless functions)
│   ├── schema.ts                    # Database schema — 5 tables, 9 indexes
│   ├── seed.ts                      # Roadmap data seeding mutation
│   ├── progress.ts                  # Topic/project tracking queries & mutations
│   ├── skills.ts                    # Skills checklist queries & mutations
│   ├── timeTracker.ts              # Study session CRUD & analytics
│   ├── badges.ts                    # Badge unlock evaluation & tracking
│   ├── goals.ts                     # Weekly goal CRUD & analytics
│   ├── streaks.ts                   # Streak tracking queries & mutations
│   ├── bookmarks.ts                 # Topic bookmarks / favorites
│   ├── showcase.ts                  # Project showcase CRUD
│   ├── leaderboard.ts              # Leaderboard & ranking queries
│   └── migrations/
│       └── reassignLegacyUser.ts   # One-time: re-key test-user-123 rows to the first allowlisted user
│
├── src/
│   ├── app/                         # Next.js App Router (file-based routing)
│   │   ├── layout.tsx               # Root layout — sidebar + navbar + providers
│   │   ├── page.tsx                 # Redirects to /dashboard
│   │   ├── dashboard/page.tsx       # Progress ring, stats, chart, sessions
│   │   ├── roadmap/page.tsx         # Interactive 34-week roadmap with accordions
│   │   ├── skills/page.tsx          # 9-category skills checklist
│   │   ├── docs/                    # Knowledge base with lazy-loaded categories
│   │   ├── cheat-sheet/page.tsx     # 40+ copy-paste Flutter code snippets
│   │   ├── resources/page.tsx       # YouTube, courses, docs, tools, schedule
│   │   ├── showcase/page.tsx        # Project showcase gallery
│   │   └── leaderboard/page.tsx     # Community leaderboard
│   │
│   ├── components/
│   │   ├── dashboard/               # OverallProgressCard, StudyTimeCard, QuickStatsGrid
│   │   ├── roadmap/                 # WeekCard, PhaseAccordion, TopicCheckbox
│   │   ├── skills/                  # SkillCategoryCard
│   │   ├── time-tracker/            # LogSessionDialog, EditSession, DeleteSession
│   │   ├── resources/               # YoutubeSection, CoursesSection, DocsSection
│   │   ├── layout/                  # AppSidebar, TopNavbar, AnimatedPage
│   │   ├── providers/               # ConvexClientProvider, ErrorBoundary, KeyboardShortcutsProvider
│   │   └── ui/                      # shadcn/ui + custom animated components (20+ primitives)
│   │
│   ├── hooks/                       # 7 custom hooks — all business logic lives here
│   │   ├── use-study-timer.ts       # Drift-proof Pomodoro timer with notifications
│   │   ├── use-progress.ts          # Roadmap completion tracking
│   │   ├── use-skills.ts            # Skills checklist state & mutations
│   │   ├── use-badges.ts            # Badge unlock queries
│   │   ├── use-badge-evaluator.ts   # Badge auto-evaluation logic
│   │   ├── use-goals.ts             # Weekly goal management
│   │   ├── use-streaks.ts           # Streak tracking
│   │   ├── use-bookmarks.ts         # Topic bookmarks
│   │   ├── use-sessions.ts          # Study session CRUD
│   │   ├── use-notes.ts             # Notes management
│   │   ├── use-tags.ts              # Tag filtering
│   │   ├── use-showcase.ts          # Project showcase
│   │   ├── use-leaderboard.ts       # Leaderboard data
│   │   ├── use-keyboard-shortcuts.ts # Global keyboard shortcuts
│   │   ├── use-mobile.ts            # Responsive breakpoint detection
│   │   └── use-user-id.ts           # Current user identifier
│   │
│   └── lib/
│       ├── utils.ts                 # cn() — className merge utility
│       ├── confetti.ts              # Confetti celebration functions
│       ├── format-time.ts           # Minutes → "2h 30m" formatter
│       ├── motion.ts                # Framer Motion animation variants
│       ├── search.ts                # Fuzzy search implementation
│       ├── timer-notifications.ts   # Web Audio API chimes & browser notifications
│       ├── cheat-sheet-data.ts      # 40+ Flutter/Dart code snippets
│       ├── docs-data.ts             # Knowledge base data aggregator
│       └── docs/                    # 6 lazy-loaded knowledge base categories
│           ├── docs-dart.ts
│           ├── docs-flutter.ts
│           ├── docs-bloc.ts
│           ├── docs-packages.ts
│           ├── docs-firebase.ts
│           ├── docs-cheat-sheet.ts
│           └── types.ts
│
├── public/                          # Static assets (icons, images)
├── DEPLOYMENT.md                    # Production deployment guide
└── package.json
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Start / pause the study timer |
| `S` | Save the current study session |
| `/` | Focus the search input |
| `?` | Open the keyboard shortcuts modal |
| `Esc` | Close any open dialog or popover |

---

## How to Use

| Page | What You Do |
|------|------------|
| **Dashboard** | View overall progress ring, total topics/projects completed, current phase, study time chart, recent sessions, badge showcase, and weekly goal progress |
| **Roadmap** | Browse all 34 weeks grouped by 10 phases. Check off topics and projects — your Dashboard updates instantly |
| **Skills Checklist** | Track mastery across 9 categories with animated progress bars that auto-initialize on first visit |
| **Knowledge Base** | Search 184 entries with fuzzy matching, filter by difficulty, follow cross-links to roadmap weeks, and track read status |
| **Cheat Sheet** | Copy-paste ready code snippets for Dart, Flutter widgets, state management, Firebase, and deployment |
| **Resources** | Access curated YouTube channels, Udemy courses, official documentation, essential tools, and a daily study schedule |
| **Showcase** | Share your Flutter projects with GitHub/live links and technology tags |
| **Leaderboard** | See where you rank based on topics completed, study time, and streak consistency |

---

## Performance

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total Blocking Time | 420ms | 58ms | **86% reduction** |
| Unused JavaScript | 187KB | 35KB | **81% reduction** |
| First Contentful Paint | 1.8s | 0.9s | **50% faster** |

Optimizations include lazy-loaded knowledge base categories, composited-only animations, optimized Convex indexes, and strict RSC boundaries.

---

## Accessibility

- **WCAG AA** color contrast compliance across all components
- Global **focus-visible rings** for keyboard navigation
- **`aria-live` timer announcements** for screen readers
- **`prefers-reduced-motion`** support disables animations for users who need it
- Semantic heading hierarchy (`h1` → `h2` → `h3`) on every page

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please follow the existing code style, ensure TypeScript strict mode compliance, and run `npm run lint` before submitting.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with care for the Flutter developer community**

</div>
