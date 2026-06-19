<div align="center">

# AI Usage Intelligence

### The Google Analytics for AI Usage

<p align="center">
  <a href="#overview">Overview</a> ·
  <a href="#features">Features</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#api-reference">API</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

<p>
  <img src="https://img.shields.io/badge/platform-Web%20%7C%20Chrome%20Extension-7C3AED?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/license-MIT-7C3AED?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/stack-TanStack%20Start%20%2B%20Supabase-7C3AED?style=flat-square" alt="Stack" />
  <img src="https://img.shields.io/badge/AI%20Gateway-Lovable-7C3AED?style=flat-square" alt="AI Gateway" />
</p>

</div>

---

## Overview

**AI Usage Intelligence** is a full-stack SaaS platform that tracks, measures, and optimizes how individuals and teams use AI tools — from ChatGPT and Claude to Gemini, Perplexity, and Grok. It combines a privacy-first Chrome Extension with a real-time analytics dashboard and an AI-powered insights assistant to transform raw usage data into actionable productivity intelligence.

> "Finally I can see why my Wednesdays feel so productive. This is the dashboard I didn't know I needed." — *Maya R., Staff Engineer*

### Why This Exists

Modern knowledge workers spend hours inside AI tools every day, but have zero visibility into where that time goes. Are you coding with Claude? Researching with Perplexity? Writing with ChatGPT? AI Usage Intelligence answers these questions automatically — no manual logging, no spreadsheet gymnastics.

---

## Features

### Core Platform

| Feature | Description |
|---------|-------------|
| **Cross-Platform Tracking** | Captures focus time, session duration, and platform context across ChatGPT, Claude, Gemini, Perplexity, and Grok |
| **Productivity Score** | A 0–100 composite score derived from active time, consistency streaks, focus sessions, and category mix |
| **Activity Heatmap** | GitHub-style 90-day grid visualizing your daily AI usage cadence at a glance |
| **Platform Breakdown** | Daily, weekly, and monthly distribution across every AI tool you use |
| **Category Classification** | Auto-categorizes sessions into Coding, Research, Writing, Learning, Business, Marketing, Design, and Productivity |
| **Focus Session Detection** | Identifies uninterrupted deep-work blocks and rewards streaks |
| **Trends & Forecasts** | Spot weekly patterns and predict when you do your best work |

### AI Insights Assistant

Ask your data natural-language questions and get grounded, data-backed answers:

- *"How productive was I this week?"*
- *"What platform do I use most?"*
- *"Show my coding activity."*
- *"Which day was most productive?"*

Powered by the **Lovable AI Gateway** with the Gemini 3 Flash model — answers are synthesized from your real session data, not hallucinated.

### Chrome Extension

- Lightweight service worker (~2KB) that tracks tab focus and idle state
- Secure token-based authentication (`aui_*` tokens)
- No prompt content ever captured — only session metadata
- Periodic flushes ensure no data loss on long sessions

### Reports & Export

- Weekly summary reports with actionable recommendations
- JSON and CSV export for external analysis
- Row-Level Security (RLS) ensures your data is strictly yours

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────────────┐  │
│  │  Landing Page    │  │  Auth (OAuth +   │  │  Dashboard  │  Insights  │  │
│  │  (TanStack Route)│  │  Email/Password) │  │  (Recharts) │  (Chat UI) │  │
│  └──────────────────┘  └──────────────────┘  └─────────────────────────────┘  │
│                                                                             │
│                              TANSTACK START                                  │
│                    SSR · File-Based Routing · Server Functions               │
├─────────────────────────────────────────────────────────────────────────────┤
│                              API LAYER                                       │
│  ┌──────────────────────────┐  ┌─────────────────────────────────────────┐  │
│  │  Public Events Endpoint  │  │  Protected Server Functions             │  │
│  │  POST /api/public/events │  │  · getOverview  · askInsights           │  │
│  │  (CORS-enabled, token auth)│  │  · getOrCreateToken · regenerateToken  │  │
│  └──────────────────────────┘  └─────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│                              DATA LAYER                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  Supabase (PostgreSQL + PostgREST + Auth + RLS)                     │  │
│  │  · profiles  · api_tokens  · sessions  · events  · productivity_scores│  │
│  └─────────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│                           CHROME EXTENSION                                   │
│  Service Worker → Tab/Idle/Alarm Listeners → POST /api/public/events       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Security Model

- **Row-Level Security (RLS)** on every user-facing table
- **API tokens** scoped per-user with `aui_*` prefix validation
- **Service role** only for extension ingestion (bypasses RLS for write, never reads)
- **Auth middleware** on all protected server functions
- **CORS headers** strictly configured on public endpoints
- No anonymous sign-ups — authenticated users only

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | TanStack Start v1 | Full-stack React 19 with SSR, file-based routing, and server functions |
| **Build Tool** | Vite 7 | Fast dev and production bundling |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Utility-first CSS with Radix UI primitives |
| **Database** | PostgreSQL (Supabase) | Relational data with JSONB for flexible metadata |
| **Auth** | Supabase Auth + Google OAuth | JWT sessions with automatic profile creation |
| **Charts** | Recharts | Responsive, composable React charting |
| **AI** | Lovable AI Gateway (Gemini 3 Flash) | Natural-language insights from structured usage data |
| **Extension** | Chrome Manifest V3 | Service worker with tab/idle/alarms APIs |
| **Validation** | Zod | Runtime schema validation for API boundaries |
| **State** | TanStack Query | Server-state synchronization with caching |

---

## Getting Started

### Prerequisites

- Node.js 20+ and Bun (or npm)
- A Supabase project (or [Lovable Cloud](https://lovable.dev) backend)
- A Lovable API Key (for AI Insights)

### 1. Clone & Install

```bash
git clone https://github.com/Anadi99/ai-usage-intelligence.git
cd ai-usage-intelligence
bun install
```

### 2. Environment Variables

Create `.env` in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
LOVABLE_API_KEY=your-lovable-api-key
```

> Server-side Supabase credentials are auto-injected by the Lovable Cloud environment.

### 3. Database Setup

Run the migrations in order:

```bash
# Via Supabase CLI
supabase migration up
```

Or execute the SQL files in `supabase/migrations/` directly in the SQL editor.

### 4. Run Locally

```bash
bun run dev
```

The app will be available at `http://localhost:3000`.

### 5. Build the Extension

```bash
# The extension source lives in ./extension/
# Load it unpacked in Chrome:
#   chrome://extensions → Developer mode ON → Load unpacked → select ./extension/
```

### 6. Production Build

```bash
bun run build
```

The output is optimized for edge deployment (Cloudflare Workers by default via TanStack Start's Nitro preset).

---

## API Reference

### Public Endpoint

#### `POST /api/public/events`

Ingress endpoint for the Chrome Extension. Accepts session metadata.

**Headers:**
```
Content-Type: application/json
x-api-token: aui_<your-token>
```

**Body:**
```json
{
  "platform": "ChatGPT",
  "duration_seconds": 1200,
  "started_at": "2026-06-19T10:00:00Z",
  "ended_at": "2026-06-19T10:20:00Z",
  "category": "Coding",
  "prompt_count": 8,
  "metadata": { "reason": "tab_switch" }
}
```

**Response:**
```json
{ "ok": true, "session_id": "<uuid>" }
```

### Server Functions (RPC)

| Function | Auth | Description |
|----------|------|-------------|
| `getOverview` | Required | Returns dashboard data: totals, scores, platforms, categories, daily series, heatmap, timeline |
| `askInsights` | Required | Accepts a natural-language question, returns an AI-generated answer grounded in session data |
| `getOrCreateToken` | Required | Returns existing extension token or generates a new `aui_*` token |
| `regenerateToken` | Required | Revokes all existing tokens and issues a new one |

---

## Database Schema

### `profiles`
User profiles linked to `auth.users`. Auto-created on sign-up via trigger.

### `api_tokens`
Per-user secure tokens for Chrome Extension authentication.

### `sessions`
Core fact table for AI usage sessions.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `user_id` | UUID | FK → auth.users |
| `platform` | Text | ChatGPT, Claude, Gemini, Perplexity, Grok |
| `category` | Text | Optional classification |
| `started_at` | Timestamptz | Session start |
| `ended_at` | Timestamptz | Session end |
| `duration_seconds` | Integer | Computed duration |
| `prompt_count` | Integer | Estimated prompts |

### `events`
Audit log for session lifecycle events.

### `productivity_scores`
Daily computed productivity scores with breakdown JSON.

---

## Project Structure

```
ai-usage-intelligence/
├── extension/                 # Chrome Extension (Manifest V3)
│   ├── background.js          # Service worker — tab/idle tracking
│   ├── popup.html             # Extension popup UI
│   ├── popup.js               # Token config & dashboard link
│   └── manifest.json
├── public/                    # Static assets
│   ├── ai-usage-extension.zip # Packaged extension for download
│   ├── llms.txt               # LLM-friendly project description
│   └── robots.txt
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── AppShell.tsx       # Authenticated layout shell
│   │   ├── Logo.tsx           # Brand logo component
│   │   └── ui/                # shadcn/ui primitives (50+)
│   ├── hooks/                 # Custom React hooks
│   ├── integrations/          # Third-party integrations
│   │   ├── lovable/           # Lovable Cloud auth helpers
│   │   └── supabase/          # Supabase client, auth middleware, types
│   ├── lib/                   # Business logic & server functions
│   │   ├── ai-gateway.server.ts   # Lovable AI Gateway provider
│   │   ├── dashboard.functions.ts # Dashboard data aggregation
│   │   ├── extension.functions.ts # Token management
│   │   └── insights.functions.ts  # AI insights generation
│   ├── routes/                # TanStack Start file-based routes
│   │   ├── __root.tsx         # Root layout (fonts, meta, providers)
│   │   ├── index.tsx          # Landing page (marketing site)
│   │   ├── auth.tsx           # Sign in / Sign up
│   │   ├── sitemap[.]xml.ts   # Dynamic sitemap
│   │   ├── _authenticated/    # Protected routes (auth-gated)
│   │   │   ├── route.tsx      # Auth layout + redirect guard
│   │   │   ├── dashboard.tsx  # Analytics dashboard
│   │   │   ├── insights.tsx   # AI chat assistant
│   │   │   ├── extension.tsx  # Extension setup & token mgmt
│   │   │   └── reports.tsx    # Weekly reports + export
│   │   └── api/public/        # Public HTTP endpoints
│   │       └── events.ts      # Extension ingestion API
│   ├── router.tsx             # TanStack Router configuration
│   ├── server.ts              # SSR error handling wrapper
│   ├── start.ts               # TanStack Start instance config
│   └── styles.css             # Global styles, theme tokens, animations
├── supabase/
│   └── migrations/            # Database migrations (ordered)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Design Philosophy

This project follows the **Linear × Vercel × Raycast** aesthetic:

- **Dark-first** with OKLCH color tokens for perceptual uniformity
- **Glass morphism** and subtle glows instead of heavy shadows
- **Instrument Serif** display headings paired with Inter body text for editorial contrast
- **Micro-interactions** — hover states, pulse glows, and staggered animations
- **Accessibility-first** — Radix UI primitives with full keyboard navigation

Every component is designed to feel like a YC-backed startup product, not a student project.

---

## Roadmap

- [x] Cross-platform tracking (5 AI tools)
- [x] Productivity Score & Heatmap
- [x] AI Insights Assistant
- [x] Chrome Extension (Manifest V3)
- [x] OAuth + Email auth
- [x] JSON/CSV export
- [ ] Team analytics & shared dashboards
- [ ] Cost tracking (API spend per platform)
- [ ] Weekly email digests
- [ ] Mobile-responsive dashboard
- [ ] Firefox/Safari extension ports
- [ ] Notion / Slack integrations

---

## Contributing

Contributions are welcome. Please open an issue first to discuss significant changes.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

<div align="center">

**Made with precision by [Anadi99](https://github.com/Anadi99)**

<p>
  <a href="https://github.com/Anadi99">
    <img src="https://img.shields.io/badge/GitHub-Anadi99-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
</p>

</div>
