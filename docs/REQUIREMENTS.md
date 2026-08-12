# VIAITALIA - Functional & Technical Requirements

## 1. User Surfaces & Permissions

### Public Website
- Landing page introducing ViaItalia services, study in Italy benefits, university search preview, published client reviews, contact form.
- Accessible to unauthenticated visitors.

### Client Portal
- Restricted to users with role `CLIENT`.
- Access restricted strictly to own data (`clientId == currentUserId`).
- Features: View dossier status, view & download documents, schedule appointments, view tasks, view payment receipts (read-only), submit reviews, message agency.

### Admin Portal
- Restricted to roles `SUPER_ADMIN`, `ADMIN`, `AGENT`.
- Dashboard with dynamic database KPIs (Total Clients, Active Dossiers, Money Collected, Receipts This Month, Pending Reviews, Upcoming Deadlines).
- Full Client CRM, Dossiers, Document Management, Appointments, Tasks, Finance & Receipts, Italy University Research & Scraping Control, Review Moderation, Messaging, Analytics & Settings.

## 2. Receipts Core Requirements (Mandatory Rule)
- A receipt is created **ONLY AFTER** payment has been received.
- Receipts **MUST NOT** have statuses such as `UNPAID`, `PARTIALLY_PAID`, or `WAITING_FOR_PAYMENT`.
- Unique IDs generated server-side: `REC-YYYY-XXXX`.
- Fields: Client, Amount, Payment Method (`CASH`, `BANK_TRANSFER`), Payment Date (defaults to today), Created By.
- Printable A4 PDF containing:
  - ViaItalia Logo & Header
  - Client Full Name & ID
  - Amount Paid & Currency (€)
  - Payment Method & Date
  - Legal Disclaimer: *"Le montant versé est non remboursable, quels que soient les résultats ou décisions des organismes concernés."*
  - Client & Agent Signature lines, Agency Stamp.
- Client access: Read-only, view & download PDF. Cannot edit/delete.

## 3. Italy University Web Scraping (Mandatory Rule)
- **STRICTLY ITALIAN UNIVERSITIES ONLY**.
- Searchable by Study Domain (Computer Science, Artificial Intelligence, Business, Architecture, Engineering, Medicine, etc.).
- Target Fields: University/Faculty, Program Name, Degree Level (BSc, MSc, PhD), City, Language, Academic Year (e.g. 2026/2027), Application Opening Date, Application Closing Date / Deadline, Application Fee (€), Tuition Fee (€), Admission Status, Official Source URL.
- Scraping Engine: Background BullMQ jobs, source adapters (Cheerio/Playwright), rate limits, robots.txt compliance, offline test fixtures, SSRF domain validation.

## 4. Reviews / Avis Core Requirements
- Clients submit 1–5 star reviews with title and text (`PENDING`).
- Admins moderate reviews: Approve (`PUBLISHED`), Reject (`REJECTED`), Edit, Feature (`isFeatured`).
- Public Website displays **ONLY `PUBLISHED`** reviews with real dynamic aggregate rating.
