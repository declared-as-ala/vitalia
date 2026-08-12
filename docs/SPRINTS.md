# VIAITALIA - Sprint Schedule & Roadmap

## SPRINT 0: Architecture & Foundation (COMPLETED / IN PROGRESS)
- Define System Architecture, DB models, API spec, Security rules, Design system.
- Setup `pnpm` Monorepo, Docker Compose (Postgres, Redis, MinIO), `@viaitalia/database`, `@viaitalia/types`, `@viaitalia/validation`.

## SPRINT 1: Authentication & RBAC Engine
- NestJS Auth module: JWT access/refresh token cookies, Password hashing, RBAC Guards (`SUPER_ADMIN`, `ADMIN`, `AGENT`, `CLIENT`).

## SPRINT 2: Client Management (CRM)
- Client CRUD API, Client Details aggregation, Admin UI Client table with search/filters.

## SPRINT 3: Dossiers & File Document Storage
- Application Dossier entity, MinIO/S3 object storage upload/download service with signed URLs.

## SPRINT 4: Appointments & Tasks
- Appointment scheduling & Task assignment APIs and UI.

## SPRINT 5: Finance & Receipts Core Engine
- Payment & Receipt Prisma entities. Server-side sequential receipt ID generator (`REC-YYYY-XXXX`).
- Receipts created strictly AFTER payment (no unpaid statuses).

## SPRINT 6: Client Receipts & PDF Engine
- HTML-to-PDF server-side receipt generation (A4 format with ViaItalia logo, client info, non-refundable legal disclaimer, signatures).
- Client Portal "My Receipts" tab: Read-only table, PDF download, email notifications.

## SPRINT 7 & 8: Italy University Web Scraping Engine
- Italy-only university database schema (`University`, `Program`, `ProgramIntake`).
- Modular adapters (`PolimiScraper`, `UniboScraper`, `UnipdScraper`, `SapienzaScraper`, `UniversitalyScraper`).
- Background BullMQ queue worker, rate-limiting, fixture tests, SSRF defense.

## SPRINT 9: University Research Admin UI
- Admin University Search UI: Search by domain (Computer Science, Business, AI), city, deadline filter.
- Scraping KPIs: Open applications, Closing soon, Deadline alert widget.

## SPRINT 10: Reviews & Avis Moderation
- Client review submission (`PENDING`), Admin review moderation workflow (`PUBLISHED`, `REJECTED`, `isFeatured`).

## SPRINT 11: Public Website & Marketing Pages
- Italian-themed landing page: Hero, Key Metrics, How It Works, Italian Universities Spotlight, Published Testimonials Carousel (dynamic 4.9/5 rating aggregate), Contact Form.

## SPRINT 12 & 13: Communication, Reports & Notifications
- Threaded Client-Agent messaging & internal notification center.
- Admin Reporting Dashboard: Revenue analytics, client conversion metrics.

## SPRINT 14 & 15: Security Hardening, E2E Verification & Docker Deployment
- Security audit, OWASP mitigations, unit/integration/E2E test suites, production Docker build verification.
