# Auren — Luxury Hotel Aggregator (Frontend)

> An ultra-luxury hotel discovery experience paired with a hotel-intelligence dashboard.
> Curated stays, AI-driven scores, cinematic motion — built with Next.js.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-12-F69220?logo=pnpm&logoColor=white)

## Demo

![Auren demo walkthrough](./docs/demo.mp4)

*One-minute walkthrough of the public site and the intelligence dashboard.*

## About

**Auren** is a frontend concept for the discerning traveler: a curated collection of the
world's finest stays, each rated by an AI score broken down into service, architecture,
and gastronomy. Behind the showcase sits a **Hotel Intelligence dashboard** — benchmarking,
case management, survey studio, team KPIs, and PDF/Excel reporting.

The project runs entirely on local mock data, so it works out of the box with no API keys
or backend required.

## Features

### Public site (`/`)

- **Cinematic hero** with full-screen background video and staggered reveal typography
- **Curated selection** of luxury hotels with AI scores and editorial summaries
- **Collections (Solutions)**, **Journal (Insights)**, and **Technology** views with
  animated page transitions (Framer Motion)
- **Hotel cards** with score breakdowns (service / architecture / gastronomy),
  tags, pricing, and locations
- Dark, editorial design system — Playfair Display + Inter, floating orbs, authority ticker

### Hotel Intelligence dashboard (`/login` → `/dashboard`)

- **Overview** with KPI donuts and trend lines
- **Benchmarking** against comparable properties
- **Case management** and team **inbox** workflows
- **Semantic engine** and **survey studio** views
- **Team KPIs**, property settings, add-property flow
- **Export reports** to PDF and Excel

> Demo auth is mocked — sign in with any email and password to reach the dashboard.

## Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Framework| Next.js 16 (App Router, Turbopack)            |
| UI       | React 19, Tailwind CSS 4, shadcn, Base UI     |
| Motion   | Framer Motion 12                              |
| Icons    | Lucide React                                  |
| Analytics| Vercel Analytics                              |
| Language | TypeScript 5                                  |
| Packages | pnpm                                          |
| Data     | Local mock layer (`data/`, `lib/dynamic-data.ts`) |

## Project Structure

```
├── app/
│   ├── page.tsx            # Public site (view shell)
│   ├── login/page.tsx      # Mock sign-in
│   └── dashboard/page.tsx  # Intelligence dashboard
├── components/
│   ├── views/              # home, collections, journal, technology
│   ├── dashboard/          # overview, benchmarking, inbox, reports…
│   └── ui/                 # shadcn primitives
├── data/                   # mockHotels, mockDashboard
├── lib/                    # dynamic-data, pdf-excel-exporter, utils
├── public/                 # hero video, destinations, hotels, collections
└── docs/
    └── demo.mp4            # demo walkthrough (shown above)
```

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (22 LTS recommended)
- **pnpm** 10+

### Install & run

```bash
# Install dependencies
pnpm install

# Start the dev server (http://localhost:3000)
pnpm dev
```

### Production build

```bash
pnpm build
pnpm start
```

### Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start dev server         |
| `pnpm build` | Production build         |
| `pnpm start` | Serve production build   |
| `pnpm lint`  | Run ESLint               |

## Configuration Notes

- Dependency build scripts (`msw`, `sharp`) are allow-listed in `pnpm-workspace.yaml`
  via `allowBuilds`, and `hono` is pinned through `overrides`.
- `next.config.mjs` disables image optimization (`unoptimized: true`), so the app can
  be served statically without an image loader.

## Roadmap

- [ ] Connect a real hotel / booking API behind the mock data layer
- [ ] Real authentication (Auth.js) and role-based dashboard access
- [ ] Search, filtering, and map view for the curated selection
- [ ] i18n (EN/TR) support

## Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first
to discuss what you would like to change.
