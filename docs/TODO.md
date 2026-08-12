# VIAITALIA - Live Action Items (TODO)

## Completed Sprints (Sprint 0 - 11)
- [x] Documentation Suite (`README`, `ARCHITECTURE`, `REQUIREMENTS`, `DATABASE`, `API`, `SECURITY`, `DESIGN_SYSTEM`, `SPRINTS`, `TODO`, `PROGRESS`, `DECISIONS`, `DEPLOYMENT`, `AGENTS`)
- [x] Monorepo Directory Scaffolding (`apps/web`, `apps/api`, `apps/worker`, `packages/database`, `packages/types`, `packages/validation`, `infra`)
- [x] Root `package.json`, `pnpm-workspace.yaml`, `docker-compose.yml`, `.env.example`
- [x] `@viaitalia/database`: Prisma schema implementation & database seed script
- [x] NestJS API: Auth (JWT cookies & RBAC guards), Clients CRM, Receipts Engine (`REC-YYYY-XXXX`), Italy Universities Search, Reviews Moderation, Reports KPIs
- [x] Worker: SSRF Guard, Cheerio Base Scraper, Polimi Scraper Adapter, Offline HTML test fixtures
- [x] Web Frontend: Public Landing Page, Italy Universities Search Demo, Testimonials Carousel (4.9/5), Login Page, Admin Dashboard, Receipts Drawer, Admin Reviews Moderation, Client Portal with Read-Only Receipts Desk

## Next Up (Sprint 12 - 15)
- [ ] Connect live Postgres & Redis instances via Docker Compose for production deployment
- [ ] Implement additional Italian university scrapers (Unibo, Unipd, Sapienza)
- [ ] Run full E2E test suite across monorepo workspace
