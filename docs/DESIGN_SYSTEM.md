# VIAITALIA - Design System & UI Architecture

## 1. Aesthetic Identity

ViaItalia embodies an elegant, trustworthy, Italian-inspired educational agency brand.

- **Primary Brand Colors**:
  - `emerald-900` (`#064e3b`): Executive Deep Emerald (Sidebar, headers, primary branding).
  - `emerald-600` (`#059669`): Active Italian Green (Buttons, success states, accents).
  - `amber-600` (`#d97706`): Subtle Venetian Gold (Featured reviews, ratings, warnings).
  - `warm-white` (`#fcfbf7`): Card backgrounds & clean contrast surfaces.
  - `slate-900` (`#0f172a`): High-contrast crisp typography.

- **Typography**:
  - Headings: `Plus Jakarta Sans` / `Outfit` (Modern, executive, clean).
  - Body & UI: `Inter` / System Sans.

- **UI Guidelines**:
  - Clean card borders (`border-slate-200 / dark:border-slate-800`), smooth subtle shadows.
  - Compact, readable tables with sticky headers and responsive column wrapping.
  - Drawers & Modals for detailed records (Receipt creation, Dossier view, Program detail).
  - Accessible contrast ratios (WCAG AAA compliant).

## 2. Shared Components Palette

- **`StarRating`**: Dual mode (interactive rating selector for Client Review submission + read-only star rendering for Public Website & Admin tables).
- **`StatusBadge`**: Color-coded badges for Dossier Stage, Scraper Status (`OPEN`, `CLOSED`, `CLOSING_SOON`), Review Status (`PENDING`, `PUBLISHED`, `REJECTED`).
- **`ReceiptDrawer`**: Animated slide-over drawer for creating payment receipts with real-time validation.
- **`UniversityCard`**: Clean program card displaying University logo, study domain, deadline countdown, application fee (€), and official source link.
- **`TestimonialCarousel`**: Smooth auto-scrolling testimonial slider with hover pause, manual controls, and swipe support on mobile.
