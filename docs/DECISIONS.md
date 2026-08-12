# VIAITALIA - Architecture Decision Records (ADR)

## ADR 001: Monorepo Architecture with pnpm Workspaces
- **Date**: 2026-08-11
- **Status**: Approved
- **Context**: Need a unified codebase for Next.js web application, NestJS API, background worker, shared database schema, shared TypeScript types, and Zod validation.
- **Decision**: Adopt a `pnpm` monorepo workspace split into `apps/` (`web`, `api`, `worker`) and `packages/` (`database`, `types`, `validation`).

## ADR 002: Italy-Only University Scraping with Background Worker & SSRF Defense
- **Date**: 2026-08-11
- **Status**: Approved
- **Context**: High business requirement for Italy university application deadline monitoring. Scraping can be slow and vulnerable to security exploits.
- **Decision**: Restrict scrapers strictly to Italian universities (`country = IT`), validate target hosts against an allowlist, and save records to MongoDB Atlas.

## ADR 003: Strict Payment Receipt Semantics & Non-Refundable Disclaimer
- **Date**: 2026-08-11
- **Status**: Approved
- **Context**: The client specified receipts represent proof of past payment.
- **Decision**: Receipts are created strictly AFTER a payment transaction exists. Receipts have no `UNPAID` or `PENDING` statuses. Includes mandatory legal non-refundable disclaimer text: *"Le montant versé est non remboursable..."*.

## ADR 004: Moderated Review System with Dynamic Public Aggregation
- **Date**: 2026-08-11
- **Status**: Approved
- **Decision**: Submitted reviews enter `PENDING` status. Public API returns ONLY `PUBLISHED` reviews with dynamic rating calculation.

## ADR 005: MongoDB Atlas & Vercel Production Deployment (No Docker)
- **Date**: 2026-08-12
- **Status**: Approved
- **Context**: User requested no Docker containerization and specified managed deployment on Vercel with MongoDB Atlas.
- **Decision**:
  1. Migrate Prisma ORM datasource provider to `mongodb`.
  2. Connect directly to MongoDB Atlas cluster (`mongodb+srv://ala:ala123@cluster0.tojwjkt.mongodb.net/viaitalia_db`).
  3. Deploy Next.js frontend and serverless API endpoints to Vercel via root `vercel.json`.
- **Consequences**: Zero Docker maintenance, global Vercel serverless edge deployment, instant cloud database scaling with MongoDB Atlas.
