# VIAITALIA - Database Architecture & Schema Specification

The database uses PostgreSQL 16 managed via Prisma ORM.

## Entity Relationship Summary

```
[User] ───1:1───► [ClientProfile] ───1:N───► [Dossier]
  │                      │                   │
  │ (Role=CLIENT/AGENT)  ├───1:N───► [Document]
  │                      ├───1:N───► [Appointment]
  │                      ├───1:N───► [Task]
  │                      ├───1:N───► [Payment] ───1:1───► [Receipt]
  │                      └───1:N───► [Review]
  │
  └───1:N───► [Notification]
```

## Core Enums

```prisma
enum Role {
  SUPER_ADMIN
  ADMIN
  AGENT
  CLIENT
}

enum ClientStatus {
  LEAD
  ACTIVE
  APPLIED
  ACCEPTED
  VISA_PENDING
  COMPLETED
  ARCHIVED
}

enum DossierStage {
  DOSSIER_CREATION
  DOCUMENT_TRANSLATION
  PRE_ENROLLMENT
  UNIVERSITY_APPLICATION
  ADMISSION_GRANTED
  VISA_PROCEDURE
  ENROLLED
}

enum PaymentMethod {
  CASH
  BANK_TRANSFER
}

enum ProgramStatus {
  OPEN
  CLOSED
  OPENING_SOON
  CLOSING_SOON
  UNKNOWN
}

enum ReviewStatus {
  PENDING
  PUBLISHED
  REJECTED
}
```

## Key Entities & Table Models

### 1. User & ClientProfile
- **`User`**: `id`, `email`, `passwordHash`, `firstName`, `lastName`, `role`, `isActive`, `createdAt`, `updatedAt`.
- **`ClientProfile`**: `id`, `userId`, `clientNumber` (`CL-2026-XXXX`), `phone`, `nationality`, `countryOfResidence`, `profilePhoto`, `status`, `assignedAgentId`, `createdAt`, `updatedAt`.

### 2. Application & Documents
- **`Dossier`**: `id`, `clientId`, `studyDomain`, `desiredDegree`, `academicYear`, `preferredCities` (Array), `preferredUniversities` (Array), `stage`, `notes`, `assignedAgentId`, `createdAt`, `updatedAt`.
- **`Document`**: `id`, `clientId`, `dossierId?`, `name`, `category` (PASSPORT, DIPLOMA, TRANSCRIPT, LANGUAGE_CERT, CV, MOTIVATION_LETTER), `fileKey`, `mimeType`, `fileSize`, `uploadedAt`.

### 3. Finance & Receipts
- **`Payment`**: `id`, `clientId`, `amount`, `currency` (default "EUR"), `paymentMethod`, `paymentDate`, `notes`, `createdById`, `createdAt`.
- **`Receipt`**: `id`, `receiptNumber` (`REC-2026-XXXX`, unique), `clientId`, `paymentId`, `amount`, `currency`, `paymentMethod`, `paymentDate`, `legalDisclaimer`, `createdById`, `createdAt`.

### 4. Italy Universities & Web Scraping
- **`University`**: `id`, `name`, `slug`, `city`, `region`, `country` (IT), `website`, `logoUrl`, `createdAt`.
- **`Program`**: `id`, `universityId`, `name`, `slug`, `degreeLevel` (BACHELOR, MASTER, PHD), `studyDomain`, `language`, `createdAt`.
- **`ProgramIntake`**: `id`, `programId`, `academicYear` (e.g. "2026/2027"), `openingDate`, `closingDate`, `applicationFee`, `tuitionFee`, `status`, `sourceUrl`, `scrapedAt`, `verifiedAt`.
- **`ScrapeSource`**: `id`, `name`, `baseUrl`, `adapterKey`, `isActive`, `lastScrapedAt`.
- **`ScrapeJob`**: `id`, `sourceId`, `status` (QUEUED, RUNNING, SUCCESS, PARTIAL, FAILED), `recordsFound`, `recordsUpdated`, `startedAt`, `finishedAt`, `errorLog`.

### 5. Reviews, Messages & Notifications
- **`Review`**: `id`, `clientId?`, `authorName`, `authorPhoto?`, `rating` (1-5), `title`, `comment`, `status` (PENDING, PUBLISHED, REJECTED), `isFeatured`, `approvedById?`, `createdAt`.
- **`Message`**: `id`, `senderId`, `receiverId`, `content`, `attachmentUrl?`, `isRead`, `createdAt`.
- **`Notification`**: `id`, `userId`, `title`, `body`, `type`, `targetUrl?`, `isRead`, `createdAt`.
- **`ActivityLog`**: `id`, `actorId`, `action`, `entity`, `entityId`, `metadata`, `createdAt`.
