# VIAITALIA - REST API Specification

The NestJS REST API runs on port `4000` (or `PORT` environment variable) under the `/api/v1` global prefix. Open API documentation is auto-generated via Swagger at `/api/docs`.

## Base Configuration

- **Format**: JSON (`Content-Type: application/json`)
- **Authentication**: JWT Bearer Token in `Authorization: Bearer <token>` or HTTP-Only cookie `access_token`.

## Endpoint Summary

### Auth (`/api/v1/auth`)
- `POST /auth/login` - Authenticate user & issue tokens.
- `POST /auth/logout` - Revoke session tokens.
- `POST /auth/refresh` - Refresh access token using valid refresh cookie.
- `GET /auth/me` - Get current authenticated user profile & permissions.
- `POST /auth/forgot-password` - Request password reset email.
- `POST /auth/reset-password` - Reset password with secret token.

### Clients (`/api/v1/clients`) — Admin/Agent only for full list, Client for own profile
- `GET /clients` - Paginated list of clients with search (`?search=`), status filter, page & limit.
- `POST /clients` - Create new client account & profile.
- `GET /clients/:id` - Get aggregated client details (Profile, Dossier, Documents, Receipts, Appointments, Tasks).
- `PUT /clients/:id` - Update client information.
- `DELETE /clients/:id` - Archive client.

### Dossiers & Documents (`/api/v1/dossiers`, `/api/v1/documents`)
- `GET /dossiers` - List dossiers.
- `POST /dossiers` - Create dossier for a client.
- `PUT /dossiers/:id` - Update dossier stage & notes.
- `POST /documents/upload` - Upload file to storage (MinIO/S3), returns document metadata & signed download URL.
- `GET /documents/:id/download` - Get temporary authenticated download URL.

### Finance & Receipts (`/api/v1/finance`)
- `GET /finance/stats` - Financial summary (Total collected, Receipts count, Cash vs Bank transfer breakdown).
- `GET /finance/receipts` - List receipts with filters (`?clientId=`, `?paymentMethod=`, `?search=`).
- `POST /finance/receipts` - Create receipt & payment record (`REC-YYYY-XXXX`). Triggers email & client notification.
- `GET /finance/receipts/:id` - Get receipt details.
- `GET /finance/receipts/:id/pdf` - Generate and download printable A4 PDF receipt.

### University Research & Scraping (`/api/v1/universities`)
- `GET /universities/search` - Search Italian programs by study domain (`?domain=Computer Science`), degree, city, deadline.
- `GET /universities/stats` - Scraping KPIs (Total programs, Open applications, Closing soon).
- `POST /universities/scrape/trigger` - Trigger background BullMQ scraping job for a specific source adapter.
- `GET /universities/scrape/jobs` - List scraping job execution history.

### Reviews / Avis (`/api/v1/reviews`)
- `GET /reviews/public` - Fetch published reviews for public website (rating >= 4, `status=PUBLISHED`).
- `POST /reviews` - Client submits review (`status=PENDING`).
- `GET /reviews/admin` - Admin review moderation list.
- `PATCH /reviews/:id/status` - Moderate review (`PUBLISHED`, `REJECTED`, `isFeatured`).

### Messaging & Notifications (`/api/v1/messages`, `/api/v1/notifications`)
- `GET /messages` - List message thread with agent/client.
- `POST /messages` - Send message.
- `GET /notifications` - Fetch unread notifications for logged-in user.
- `PATCH /notifications/:id/read` - Mark notification as read.
