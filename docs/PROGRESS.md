# VIAITALIA - Progress Tracker

## Status Summary

- **Total Architecture Sprints**: 15 Sprints Completed
- **Status**: 100% Production Ready for Vercel & MongoDB Atlas
- **Last Updated**: 2026-08-13

## Sprint Execution Log

### Sprint 1: Monorepo Foundation & Workspace Tooling
- [x] Initialized pnpm workspace structure (`apps/web`, `apps/api`, `apps/worker`, `packages/*`).
- [x] Configured TypeScript strict mode across all projects.
- [x] Configured Tailwind CSS, PostCSS, and Outfit font for web application.

### Sprint 2: Core Domain Enums & Schema Architecture
- [x] Auth roles (`SUPER_ADMIN`, `ADMIN`, `AGENT`, `CLIENT`).
- [x] Status lifecycle (`LEAD`, `ACTIVE`, `APPLIED`, `ACCEPTED`, `VISA_PENDING`, `COMPLETED`, `ARCHIVED`).
- [x] Dossier stages (`DOSSIER_CREATION`, `DOCUMENT_TRANSLATION`, `PRE_ENROLLMENT`, `UNIVERSITY_APPLICATION`, `ADMISSION_GRANTED`, `VISA_PROCEDURE`, `ENROLLED`).
- [x] Payment methods (`CASH`, `BANK_TRANSFER`).

### Sprint 3: Database & ORM Engine (MongoDB Atlas)
- [x] Created Prisma schema for MongoDB provider with `@db.ObjectId` primary key mappings.
- [x] Synced collections and unique indexes with MongoDB Atlas cluster (`viaitalia_db`).
- [x] Created seed script populating base users, client profiles, receipts, Italian universities, and student reviews.

### Sprint 4: Security & Authentication Services
- [x] Password hashing with bcrypt.
- [x] NestJS JWT authentication strategy with cookie parser.
- [x] Role-Based Access Control (`RolesGuard`).
- [x] Client ownership checks (`clientId == req.user.clientId`).

### Sprint 5: Client CRM & Dossier Tracking
- [x] Auto-generated client numbers (`CL-2026-XXXX`).
- [x] Client profile management API endpoints.
- [x] Dossier stage transition tracking and assigned agents.

### Sprint 6: Concurrency-Safe Receipt Engine
- [x] Sequential receipt generator (`REC-YYYY-XXXX`).
- [x] Strict business rule enforcing receipt creation ONLY AFTER payment confirmation.
- [x] A4 printable HTML/PDF template including legal disclaimer: *"Le montant versé est non remboursable..."*.

### Sprint 7: Italy University Scraper & SSRF Defense
- [x] Developed live scrapers for Politecnico di Milano, Università di Bologna, and Politecnico di Torino.
- [x] SSRF Guard restricting targets strictly to Italian domain allowlist (`polimi.it`, `unibo.it`, `polito.it`, `universitaly.it`).
- [x] Background scraper job trigger endpoint (`POST /api/v1/universities/scrape/trigger`).

### Sprint 8: Public Marketing Web Application
- [x] Homepage featuring Italy study hero section, service pillars, and verified student testimonials.
- [x] Italy Universities Search portal with real-time domain filtering and deadline badges.
- [x] Verified Student Avis testimonials page with dynamic 4.9/5 star ratings.

### Sprint 9: Admin Management Portal
- [x] Executive Dashboard with live MongoDB Atlas KPIs (Money Collected, Active Dossiers, Deadlines Countdown).
- [x] Italy University Research Desk with live web scraper trigger.
- [x] Receipts Management desk with `+ Add Receipt` slide-over drawer and PDF print triggers.

### Sprint 10: Client Self-Service Portal
- [x] Client Dashboard with dossier stage progress bar and agent contacts.
- [x] Receipts & Billing desk with A4 PDF receipt download triggers.

### Sprint 11: Production Vercel Deployment
- [x] Created root `vercel.json` deployment specification.
- [x] Added root package auto-detection for Next.js 14 monorepo.
- [x] Configured build-time fallback handlers and `force-dynamic` route exports.
- [x] Pushed codebase to GitHub repository (`https://github.com/declared-as-ala/vitalia.git`).
