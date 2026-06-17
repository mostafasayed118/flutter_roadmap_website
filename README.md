<div align="center">

# FlutterPath

### Track your journey from Dart basics to Flutter deployment — beautifully.

An interactive, gamified progress tracker that transforms a comprehensive 34-week Flutter roadmap into a stunning real-time learning dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&style=for-the-badge)
![Convex](https://img.shields.io/badge/Convex-1.41-purple?logo=convex&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-cyan?logo=tailwindcss&style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/flutterpath)

</div>

---

## About The Project

**FlutterPath** solves a real problem: *how do you systematically learn Flutter development without losing track of your progress?*

The Flutter ecosystem is vast — Dart, widgets, state management, architecture, testing, Firebase, deployment — and most developers rely on static Markdown checklists that quickly become outdated or forgotten. FlutterPath transforms that static roadmap into a **dynamic, interactive, and gamified learning experience** with real-time sync, visual progress indicators, and celebration moments that keep you motivated across 34 weeks of structured learning.

### The 34-Week Curriculum

| Phase | Focus Area | Weeks | Key Topics |
|:-----:|-----------|:-----:|-----------|
| 1 | Dart Programming Language | 1–4 | Syntax, async/await, null safety, collections |
| 2 | Flutter Fundamentals | 5–9 | Widgets, layouts, navigation, forms, animations |
| 3 | State Management — Cubit/Bloc | 10–13 | BLoC pattern, Cubit, business logic separation |
| 4 | Networking & APIs | 14–16 | HTTP clients, REST APIs, JSON serialization |
| 5 | Local Storage & Database | 17–18 | SQLite, Hive, shared preferences, caching |
| 6 | Advanced Flutter | 19–22 | Platform channels, custom painters, performance |
| 7 | Architecture & Clean Code | 23–25 | Clean Architecture, dependency injection, SOLID |
| 8 | Testing | 26–27 | Unit, widget, integration tests, TDD |
| 9 | Firebase & Backend Services | 28–30 | Auth, Firestore, Cloud Functions, messaging |
| 10 | Deployment & Portfolio | 31–34 | App Store, Play Store, CI/CD, portfolio projects |

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Real-time Progress Tracking** | All changes sync instantly across the app via Convex reactive queries — no refresh needed |
| **Interactive 34-Week Roadmap** | Collapsible phase accordions containing topics, projects, and integrated course links |
| **Study Time Monitor** | Log, edit, and delete study sessions with per-week tracking and a weekly bar chart |
| **Gamified Skills Checklist** | 9 categories with animated checkboxes and gradient progress bars |
| **Developer Cheat Sheet** | 40+ copy-paste Flutter code snippets organized by category with one-click clipboard |
| **Glassmorphism UI** | Dark-mode default with `backdrop-blur` cards, gradient accents, and Framer Motion transitions |
| **Confetti Celebrations** | Custom canvas-confetti explosions when you complete a week, phase, or the entire roadmap |
| **Animated Progress Charts** | Glowing SVG radial chart and gradient-filled progress bars powered by Recharts |
| **Responsive Design** | Fully responsive from mobile to desktop with a collapsible sidebar |
| **WCAG Accessible** | Proper heading hierarchy, aria-labels, keyboard navigation, and color contrast compliance |

---

## Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, React Server Components, file-based routing |
| **Backend** | [Convex](https://convex.dev/) | Real-time database, serverless functions, reactive queries |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict mode, end-to-end type safety |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Utility-first CSS, Radix UI primitives |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) | Page transitions, micro-interactions, layout animations |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, lightweight icon set |
| **Charts** | [Recharts](https://recharts.org/) | SVG radial progress, bar charts |
| **Celebrations** | [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) | Lightweight confetti particle effects |
| **Toasts** | [Sonner](https://sonner.emilkowal.ski/) | Beautiful, non-intrusive notifications |
| **Utilities** | `clsx`, `tailwind-merge`, `class-variance-authority` | Conditional classes, variant management |

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17 or later — [Download](https://nodejs.org/)
- **npm**, **yarn**, or **pnpm** — comes with Node.js
- **Git** — [Download](https://git-scm.com/)
- **Convex account** (free tier available) — [Sign up](https://convex.dev)

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

In a **separate terminal**, open the app at `http://localhost:3000`, navigate to the **Roadmap** page, and click **"Load Roadmap Data"** to populate the database with all 34 weeks of content.

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
│   ├── schema.ts                    # Database schema — 5 tables, 7 indexes
│   ├── seed.ts                      # Roadmap data seeding mutation
│   ├── progress.ts                  # Topic/project tracking queries & mutations
│   ├── skills.ts                    # Skills checklist queries & mutations
│   └── timeTracker.ts              # Study session CRUD & analytics
│
├── src/
│   ├── app/                         # Next.js App Router (file-based routing)
│   │   ├── layout.tsx               # Root layout — sidebar + navbar + providers
│   │   ├── page.tsx                 # Redirects to /dashboard
│   │   ├── dashboard/page.tsx       # Progress stats, study time chart, sessions
│   │   ├── roadmap/page.tsx         # Interactive 34-week roadmap with accordions
│   │   ├── skills/page.tsx          # 9-category skills checklist
│   │   ├── resources/page.tsx       # YouTube, courses, docs, tools, schedule
│   │   └── cheat-sheet/page.tsx     # 40+ copy-paste Flutter code snippets
│   │
│   ├── components/
│   │   ├── dashboard/               # OverallProgressCard, StudyTimeCard, QuickStatsGrid
│   │   ├── roadmap/                 # WeekCard, PhaseAccordion, TopicCheckbox
│   │   ├── skills/                  # SkillCategoryCard
│   │   ├── time-tracker/            # LogSessionDialog, EditSession, DeleteSession
│   │   ├── resources/               # YoutubeSection, CoursesSection, DocsSection
│   │   ├── layout/                  # AppSidebar, TopNavbar, AnimatedPage
│   │   ├── providers/               # ConvexClientProvider, ErrorBoundary
│   │   └── ui/                      # shadcn/ui + custom animated components
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts            # Responsive breakpoint detection
│   │   └── use-user-id.ts           # Current user identifier
│   │
│   └── lib/
│       ├── utils.ts                 # cn() — className merge utility
│       ├── confetti.ts              # Confetti celebration functions
│       ├── format-time.ts           # Minutes → "2h 30m" formatter
│       └── motion.ts                # Framer Motion animation variants
│
├── public/                          # Static assets (icons, images)
├── DEPLOYMENT.md                    # Production deployment guide
└── package.json
```

---

## How to Use

| Page | What You Do |
|------|------------|
| **Dashboard** | View your overall progress percentage, total topics/projects completed, current phase, study time chart, and recent sessions |
| **Roadmap** | Browse all 34 weeks grouped by phase. Check off topics and projects — your Dashboard updates instantly |
| **Skills Checklist** | Track mastery across 9 categories (Dart, Flutter UI, State Mgmt, Networking, Storage, Architecture, Testing, Firebase, Deployment) |
| **Resources** | Access curated YouTube channels, Udemy courses, official documentation, essential tools, and a daily study schedule |
| **Cheat Sheet** | Copy-paste ready code snippets for Dart, Flutter widgets, state management, Firebase, and deployment |
| **Study Time** | Log sessions via the navbar button, view per-week badges on the roadmap, and track your total study time |

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please follow the existing code style, ensure TypeScript strict mode compliance, and test your changes before submitting.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

- **Flutter Roadmap Structure** — The 34-week curriculum covers Dart, Cubit/Bloc, Clean Architecture, Firebase, and deployment with a practical, project-driven approach
- **[shadcn/ui](https://ui.shadcn.com/)** — Beautiful, accessible components built on Radix UI primitives
- **[Convex](https://convex.dev/)** — Real-time backend that makes reactive data fetching effortless
- **[Framer Motion](https://www.framer.com/motion/)** — Production-ready animations for React
- **[Canvas Confetti](https://www.kirilv.com/canvas-confetti/)** — Lightweight confetti effects for celebrations
- **[Lucide](https://lucide.dev/)** — Clean, consistent icon library
- **[Recharts](https://recharts.org/)** — Composable charting library built on D3
- **[sonner](https://sonner.emilkowal.ski/)** — Beautiful toast notifications

---

<div align="center">

**Built with care for the Flutter developer community**

</div>
