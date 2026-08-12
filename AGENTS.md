# VIAITALIA AI & AGENT GUIDELINES

Welcome to the **VIAITALIA** codebase! When working on this repository, strictly adhere to the rules outlined below.

## Codebase Principles

1. **Production-First Standard**:
   - No mock counters or hardcoded dashboard stats in production routes. All data must come from the PostgreSQL database via Prisma ORM.
   - Code must be typed end-to-end with TypeScript strict mode enabled.
   - Component props, API DTOs, and schema types must be imported from `@viaitalia/types` or `@viaitalia/validation`.

2. **Security & Authorization Rules**:
   - Authorization MUST be enforced on the backend (NestJS Guards). Hiding a button on the UI is NOT security.
   - Client access must strictly enforce object ownership: `clientId == req.user.clientId`.
   - Web scraping inputs must validate target domains to prevent SSRF vulnerabilities.

3. **Receipt Business Logic**:
   - A Receipt strictly represents money ALREADY paid.
   - Receipts MUST NOT have `UNPAID` or `PENDING` statuses.
   - Receipt numbers are sequential and generated server-side (`REC-YYYY-XXXX`).

4. **University Web Scraping**:
   - SCRAPING IS STRICTLY FOR ITALIAN UNIVERSITIES ONLY.
   - Do NOT fabricate dates, fees, or requirements. If missing, return `null` / `"Not available"`.
   - Parser logic must be tested against offline fixture files in `apps/worker/test/fixtures/`.

5. **Design Aesthetics**:
   - Palette: Deep Emerald (`#064e3b`), Italian Green accent, Warm White (`#fcfbf7`), Slate Dark (`#0f172a`), Subtle Gold accent (`#d97706`).
   - Clean, modern, accessible interface with Radix primitives, Lucide icons, and Tailwind CSS.

6. **Documentation & Tracking**:
   - Keep `docs/TODO.md`, `docs/PROGRESS.md`, and `docs/DECISIONS.md` continuously updated when introducing architectural changes.
