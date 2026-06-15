<div align="center">

# FlutterPath

**Track your journey from Dart basics to Flutter deployment — beautifully.**

An interactive, gamified progress tracker that transforms a comprehensive 34-week Flutter roadmap into a stunning real-time learning dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Convex](https://img.shields.io/badge/Convex-1.41-purple?logo=convex)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-cyan?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## About The Project

FlutterPath is a modern web application built to solve a common problem: **how do you systematically learn Flutter development without losing track of your progress?**

The Flutter ecosystem is vast — Dart, widgets, state management, architecture, testing, Firebase, deployment — and most developers rely on static Markdown checklists that quickly become outdated or forgotten. FlutterPath transforms that static roadmap into a **dynamic, interactive, and gamified learning experience**.

The app covers the complete 34-week journey across 10 phases:

| Phase | Focus Area | Weeks |
|-------|-----------|-------|
| 1 | Dart Programming Language | 1–4 |
| 2 | Flutter Fundamentals | 5–9 |
| 3 | State Management — Cubit/Bloc | 10–13 |
| 4 | Networking & APIs | 14–16 |
| 5 | Local Storage & Database | 17–18 |
| 6 | Advanced Flutter | 19–22 |
| 7 | Architecture & Clean Code | 23–25 |
| 8 | Testing | 26–27 |
| 9 | Firebase & Backend Services | 28–30 |
| 10 | Deployment & Portfolio Projects | 31–34 |

---

## Key Features

- **Real-time progress tracking** — All changes sync instantly across the app via Convex reactive queries
- **Interactive roadmap** — Collapsible phase accordions containing 34 weeks of topics and projects
- **Study time monitor** — Log, edit, and delete study sessions with per-week tracking and a weekly bar chart
- **Gamified skills checklist** — 9 categories with animated checkboxes and progress bars
- **Developer cheat sheet** — 40+ copy-paste code snippets organized by category with one-click clipboard
- **Glassmorphism UI** — Dark-mode default with `backdrop-blur` cards, gradient accents, and Framer Motion page transitions
- **Confetti celebrations** — Custom canvas-confetti explosions when you complete a week, phase, or the entire roadmap
- **Animated progress charts** — Glowing SVG radial chart and gradient-filled progress bars using Recharts
- **Responsive design** — Fully responsive from mobile to desktop with a collapsible sidebar
- **WCAG accessible** — Proper heading hierarchy, aria-labels, and color contrast compliance

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, React Server Components) |
| **Backend** | Convex (Real-time database, serverless functions) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS 4, shadcn/ui (Radix UI primitives) |
| **Animations** | Framer Motion 12, Canvas Confetti |
| **Icons** | Lucide React |
| **Charts** | Recharts (SVG radial progress, bar charts) |
| **Utilities** | clsx, tailwind-merge, class-variance-authority, sonner (toasts) |

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later — [Download](https://nodejs.org/)
- **npm**, **yarn**, or **pnpm** — comes with Node.js
- **Convex account** (free tier available) — [Sign up](https://convex.dev)

---

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/flutterpath.git
cd flutterpath
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Convex**

```bash
npx convex dev
```

This will:
- Prompt you to create or link a Convex project
- Generate a `.env.local` file with your deployment URL
- Start the local Convex backend

4. **Seed the roadmap data**

In a separate terminal (with Convex running), navigate to the Roadmap page and click **"Load Roadmap Data"** to populate the database with all 34 weeks of content.

5. **Start the dev server**

```bash
npm run dev
```

6. **Open the app**

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

The following environment variables are configured automatically by `npx convex dev`:

```env
# Convex deployment (set automatically)
CONVEX_DEPLOYMENT=your-project-name

# Convex API URL (your frontend connects to this)
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Convex site URL (for HTTP actions)
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-project.convex.site
```

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## Project Structure

```
flutterpath/
├── convex/
│   ├── schema.ts              # Database schema (5 tables)
│   ├── seed.ts                # Roadmap data seeding mutation
│   ├── progress.ts            # Topic/project tracking queries & mutations
│   ├── skills.ts              # Skills checklist queries & mutations
│   └── timeTracker.ts         # Study session CRUD & analytics
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (sidebar + navbar + error boundary)
│   │   ├── page.tsx           # Redirects to /dashboard
│   │   ├── dashboard/         # Progress stats, study time chart, session list
│   │   ├── roadmap/           # Interactive 34-week roadmap with accordions
│   │   ├── skills/            # 9-category skills checklist
│   │   ├── resources/         # YouTube, courses, docs, tools, schedule
│   │   └── cheat-sheet/       # 40+ copy-paste Flutter code snippets
│   │
│   ├── components/
│   │   ├── dashboard/         # OverallProgressCard, StudyTimeCard, QuickStatsGrid
│   │   ├── roadmap/           # WeekCard, PhaseAccordion, TopicCheckbox
│   │   ├── skills/            # SkillCategoryCard
│   │   ├── time-tracker/      # LogSessionDialog, EditSession, DeleteSession, SessionList
│   │   ├── resources/         # YoutubeSection, CoursesSection, DocsSection
│   │   ├── layout/            # AppSidebar, TopNavbar, AnimatedPage
│   │   ├── providers/         # ConvexClientProvider, ErrorBoundary, ClientProviders
│   │   └── ui/                # shadcn/ui + custom animated components
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-user-id.ts
│   │
│   └── lib/
│       ├── utils.ts           # cn() utility
│       ├── confetti.ts        # Confetti celebration functions
│       ├── format-time.ts     # Minutes → "2h 30m" formatter
│       └── motion.ts          # Framer Motion animation variants
```

---

## How to Use

1. **Dashboard** — View your overall progress percentage, total topics/projects completed, current phase, study time chart, and recent sessions
2. **Roadmap** — Browse all 34 weeks grouped by phase. Check off topics and projects — your Dashboard updates instantly
3. **Skills Checklist** — Track mastery across 9 categories with animated checkboxes and progress bars
4. **Resources** — Access curated YouTube channels, Udemy courses, official documentation, essential tools, and a daily study schedule
5. **Cheat Sheet** — Copy-paste ready code snippets for Dart, Flutter widgets, state management, Firebase, and deployment
6. **Study Time** — Log sessions via the navbar button, view per-week badges on the roadmap, and track your total study time

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
