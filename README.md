# VIAITALIA 🇮🇹

> Production platform for study & university application management in Italy.

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
│   └── worker/     # NestJS / BullMQ Worker (University Scrapers, Email, PDF rendering)
├── packages/
│   ├── database/   # Prisma Schema, Migrations, Seeders
│   ├── types/      # Shared DTOs, Enums, Interfaces
│   └── validation/ # Shared Zod schemas
├── docs/           # System Documentation
├── infra/          # Docker Compose configurations (Postgres, Redis, MinIO)
└── docker-compose.yml
```

## Quick Start (Development)

### Prerequisites
- Node.js >= 20.x
- `pnpm` >= 9.x
- Docker & Docker Compose

### 1. Environment Setup
```bash
cp .env.example .env
```

### 2. Start Infrastructure Services
```bash
docker-compose up -d postgres redis minio
```

### 3. Install Dependencies & Seed Database
```bash
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
```

### 4. Start Applications
```bash
pnpm dev
```

- **Web (Public, Client & Admin)**: [http://localhost:3000](http://localhost:3000)
- **API Server & Swagger**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)
- **MinIO Storage Console**: [http://localhost:9001](http://localhost:9001)

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
