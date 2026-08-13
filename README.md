# VIAITALIA 🇮🇹

> Production platform for study & university application management in Italy.

![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=flat&logo=vercel)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas%20Cloud-green?style=flat&logo=mongodb)
![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-blue?style=flat&logo=prisma)
![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=nextdotjs)

VIAITALIA is a full-stack platform designed to empower educational agencies and students navigating higher education admissions in Italy.

## Features Overview

- 🌐 **Public Website**: Modern landing page with university spotlight, services overview, and authentic client testimonials.
- 👤 **Client Portal**: Self-service dashboard for tracking application dossiers, private document uploads, appointment schedules, and payment receipts.
- 🛡️ **Admin Portal**: Comprehensive CRM for agency staff featuring client profile management, dossier stage tracking, task assignment, financial reporting, review moderation, and university deadline monitoring.
- 📜 **Receipt System**: Concurrency-safe sequential payment receipt generation (`REC-YYYY-XXXX`) with A4 printable PDF templates including legal disclaimers, agent signature fields, and agency stamp.
- 🇮🇹 **Italy-Only University Scraper**: Background scraping engine that monitors Italian university program admission opening/deadline dates, application fees, tuition fees, and degree levels.
- 💬 **Messaging & Notifications**: Built-in Client-Agent communication channels with automated email notifications.

## Project Structure

```
viaitalia/
├── apps/
│   ├── web/        # Next.js (App Router, Tailwind CSS, TypeScript, Lucide UI)
│   ├── api/        # NestJS REST API (TypeScript, Prisma, Passport JWT, Swagger)
│   └── worker/     # NestJS Worker (Italy University Scrapers, Email, PDF rendering)
├── packages/
│   ├── database/   # Prisma Schema (MongoDB Atlas), Seeders
│   ├── types/      # Shared DTOs, Enums, Interfaces
│   └── validation/ # Shared Zod schemas
├── docs/           # System Documentation
└── vercel.json     # Vercel Production Deployment Config
```

## Quick Start (Development)

### 1. Environment Setup
```bash
cp .env.example .env
```

### 2. Install Dependencies & Seed Database
```bash
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
```

### 3. Start Applications
```bash
pnpm dev
```

- **Web (Public, Client & Admin)**: [http://localhost:3000](http://localhost:3000)
- **API Server & Swagger**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

## Vercel Deployment

Configure `DATABASE_URL` in Vercel Environment Variables:
`mongodb+srv://ala:ala123@cluster0.tojwjkt.mongodb.net/viaitalia_db?retryWrites=true&w=majority`

## Documentation

For full architectural details, refer to the [`docs/`](./docs) directory:
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Requirements Specification](./docs/REQUIREMENTS.md)
- [Database Schema](./docs/DATABASE.md)
- [API Specification](./docs/API.md)
- [Security Guidelines](./docs/SECURITY.md)
- [Design System](./docs/DESIGN_SYSTEM.md)
- [Sprints Plan](./docs/SPRINTS.md)
- [Architecture Decisions (ADR)](./docs/DECISIONS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
