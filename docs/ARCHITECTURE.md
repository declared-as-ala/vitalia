# VIAITALIA - Technical Architecture

## 1. System Topology

```
                  ┌─────────────────────────────────────────────────────┐
                  │                 Users & Web Browsers                │
                  └──────────────────────────┬──────────────────────────┘
                                             │
                                             ▼
                  ┌─────────────────────────────────────────────────────┐
                  │                  Next.js App Router                 │
                  │             (Public Website / Portals)              │
                  └──────────────────────────┬──────────────────────────┘
                                             │ REST (JSON / Bearer JWT)
                                             ▼
                  ┌─────────────────────────────────────────────────────┐
                  │                    NestJS API                       │
                  │       (Controllers, Auth Guards, RBAC, Services)    │
                  └──────────────┬──────────────────────────┬───────────┘
                                 │                          │
                 Prisma Queries  │                          │ Queue Jobs
                                 ▼                          ▼
                  ┌──────────────────────────┐   ┌──────────────────────┐
                  │      PostgreSQL 16       │   │       Redis 7        │
                  └──────────────────────────┘   └──────────┬───────────┘
                                                            │
                                                            ▼
                                                 ┌──────────────────────┐
                                                 │   NestJS Worker      │
                                                 │ (Scrapers, PDF, Mail)│
                                                 └──────────────────────┘
```

## 2. Component Layer Responsibilities

### Frontend (`apps/web`)
- **Next.js 14+ App Router**: Serves 3 distinct user surfaces:
  - `/` (Public marketing website, university search demo, published reviews)
  - `/client` (Client self-service portal: dossiers, documents, receipts, appointments)
  - `/admin` (Admin CRM & Management portal: clients, finance, scraping, reviews, reports)
- **State & UI**: React 18, Tailwind CSS, Lucide icons, Radix UI primitives, React Hook Form, Zod validation schemas.

### Backend API (`apps/api`)
- **NestJS Architecture**: Modular application divided by domain (Auth, Users, Clients, Dossiers, Documents, Finance, Universities, Reviews, Messaging, Notifications).
- **Security & Authorization**: JWT Access/Refresh Tokens stored in HTTP-Only cookies, Passport strategies, `@Roles()` decorators with NestJS Guards, ThrottlerGuard rate limiting.
- **ORM & Database**: Prisma ORM interacting with PostgreSQL 16.

### Async Background Worker (`apps/worker`)
- **BullMQ Queue Engine**: Decouples heavy or asynchronous operations from API response loop.
- **Jobs**:
  - `SCRAPE_UNIVERSITY_PROGRAMS`: Runs source-specific scrapers (Cheerio/Playwright) to harvest Italy university program details, admission deadlines, and fees.
  - `GENERATE_RECEIPT_PDF`: Server-side HTML-to-PDF rendering for A4 receipts.
  - `SEND_EMAIL_NOTIFICATION`: Asynchronous template-driven transactional emails (Nodemailer / SMTP abstraction).

## 3. Package Strategy

- `@viaitalia/database`: Houses `schema.prisma`, migrations, Prisma Client instance export, database seeders.
- `@viaitalia/types`: Houses TypeScript type definitions, DTO interfaces, API payloads, Enums shared across `web`, `api`, and `worker`.
- `@viaitalia/validation`: Shared Zod validation schemas for cross-environment validation.
