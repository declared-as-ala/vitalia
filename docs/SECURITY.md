# VIAITALIA - Security & Authorization Specification

## 1. Authentication & Token Management

- **Password Hashing**: Passwords stored using `argon2id` (or `bcrypt` with work factor 12).
- **JWT Architecture**:
  - Access Token: Short-lived (15 minutes), signed with `JWT_SECRET`.
  - Refresh Token: Long-lived (7 days), signed with `JWT_REFRESH_SECRET`, stored in HTTP-Only, `SameSite=Strict`, `Secure` cookies. Revocable via Redis session store.
- **Session Revocation**: Logging out invalidates the refresh token in Redis.

## 2. Role-Based Access Control (RBAC)

Hierarchical roles enforced via NestJS `RolesGuard`:
- `SUPER_ADMIN`: Full access to system configuration, user deletion, scraping triggers, reports.
- `ADMIN`: Full access to Client CRM, Dossiers, Receipts, Reviews moderation, University Search.
- `AGENT`: Assigned client management, dossier updates, task/appointment scheduling.
- `CLIENT`: Self-service access restricted strictly to own records.

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Get('finance/stats')
async getFinancialStats() { ... }
```

## 3. Client Ownership Data Isolation

Clients must never access other clients' files or receipts. Ownership check enforced in NestJS Interceptors / Services:
```typescript
if (user.role === Role.CLIENT && entity.clientId !== user.clientId) {
  throw new ForbiddenException('Access denied to private client record');
}
```

## 4. SSRF Defense in University Scraper

To prevent Server-Side Request Forgery (SSRF), scraping requests:
- Must validate target domain against `ScrapeSource` allowed domain list.
- Reject requests to private IP ranges (`127.0.0.1`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `localhost`).
- Enforce strict HTTP timeouts (10 seconds max per fetch).

## 5. File Upload Security

- Validate MIME type against strict whitelist (`application/pdf`, `image/jpeg`, `image/png`).
- Randomize storage keys in S3/MinIO (`documents/{clientId}/{uuid}.pdf`) to avoid overwriting or directory traversal attacks.
- Serve client files via short-lived signed URLs (15 minutes expiration).

## 6. HTTP & API Protection

- **Helmet**: Secure headers enabled (`X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`).
- **CORS**: Restricted strictly to allowed frontend origin (`FRONTEND_URL`).
- **Rate Limiting**: `@nestjs/throttler` (100 requests per minute per IP, 5 auth requests per minute).
- **Sanitization**: Input validated with Zod & `class-validator` (`whitelist: true`, `forbidNonWhitelisted: true`).
