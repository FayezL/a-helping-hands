# Ariel's Helping Hand - Full Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete customer-facing website for a residential cleaning company with booking requests, admin dashboard, and Firebase backend.

**Architecture:** Next.js 14+ App Router with TypeScript, Tailwind CSS, Framer Motion animations, and Firebase (Firestore + Auth). Server Components by default, Client Components only where interactivity is needed. Reusable UI components in `components/ui/`, page-specific sections in `components/sections/`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Firebase (Firestore, Auth), React Hook Form + Zod for form validation.

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navbar + Footer
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + Tailwind
│   ├── services/
│   │   └── page.tsx            # Services page
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── book/
│   │   └── page.tsx            # Book Service page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   └── admin/
│       ├── layout.tsx          # Admin layout with auth guard
│       ├── page.tsx            # Admin dashboard - bookings list
│       ├── login/
│       │   └── page.tsx        # Admin login page
│       └── settings/
│           └── page.tsx        # Admin settings page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── Footer.tsx          # Footer
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button
│   │   ├── Card.tsx            # Reusable card
│   │   ├── Input.tsx           # Form input
│   │   ├── Textarea.tsx        # Form textarea
│   │   ├── Select.tsx          # Form select
│   │   ├── Badge.tsx           # Status badge
│   │   └── Container.tsx       # Page container wrapper
│   ├── sections/
│   │   ├── Hero.tsx            # Home hero section
│   │   ├── ServicesOverview.tsx # Services overview cards
│   │   ├── WhyChooseUs.tsx     # Why choose us section
│   │   ├── Testimonials.tsx    # Testimonials section
│   │   ├── ServiceArea.tsx     # Service area section
│   │   └── CallToAction.tsx    # CTA banner section
│   ├── forms/
│   │   ├── BookingForm.tsx     # Booking request form
│   │   └── ContactForm.tsx     # Contact form
│   └── admin/
│       ├── BookingTable.tsx    # Bookings list table
│       ├── BookingDetail.tsx   # Booking detail modal/panel
│       ├── AdminGuard.tsx      # Auth protection wrapper
│       └── SettingsForm.tsx    # Business settings form
├── lib/
│   ├── firebase/
│   │   ├── config.ts           # Firebase client config
│   │   ├── admin-config.ts     # Firebase admin/server config
│   │   └── index.ts            # Re-exports
│   ├── db/
│   │   ├── bookings.ts         # Booking CRUD operations
│   │   ├── contacts.ts         # Contact message CRUD
│   │   └── settings.ts         # Settings CRUD
│   ├── auth/
│   │   └── admin-auth.ts       # Admin auth helpers
│   └── validations/
│       ├── booking.ts           # Booking form Zod schema
│       └── contact.ts           # Contact form Zod schema
├── types/
│   └── index.ts                # Shared TypeScript types
└── data/
    ├── services.ts              # Service data (descriptions, features)
    ├── testimonials.ts          # Testimonial data
    └── constants.ts             # Business constants
```

---

## Decisions Made

- **Logo:** SVG placeholder icon (house in hand) - replace later with actual logo
- **Admin Auth:** Firebase Auth with email/password
- **Contact Form:** Separate `contact_messages` Firestore collection
- **Testimonials:** Hardcoded in V1 in `data/testimonials.ts`
- **Deployment:** Vercel (standard for Next.js)
- **Business Info:** Placeholders that admin can update via settings
- **Service Area:** Hardcoded text in `data/constants.ts`

---

## Database Structure

### Collection: `booking_requests`

| Field | Type | Description |
|-------|------|-------------|
| id | string | Auto-generated document ID |
| fullName | string | Customer full name |
| phone | string | Phone number |
| email | string | Email address |
| address | string | Service address |
| serviceType | string | Type of cleaning service |
| bedrooms | number | Number of bedrooms |
| bathrooms | number | Number of bathrooms |
| preferredDate | string | Preferred service date (ISO string) |
| notes | string | Additional notes |
| status | string | new / contacted / scheduled / completed |
| createdAt | timestamp | Server timestamp |

### Collection: `contact_messages`

| Field | Type | Description |
|-------|------|-------------|
| id | string | Auto-generated document ID |
| name | string | Sender name |
| email | string | Sender email |
| message | string | Message body |
| createdAt | timestamp | Server timestamp |

### Collection: `settings`

Document: `business_settings`

| Field | Type | Description |
|-------|------|-------------|
| acceptingRequests | boolean | Whether booking form is active |
| phoneNumber | string | Business phone |
| email | string | Business email |
| serviceArea | string | Service area description |
| businessHours | string | Business hours text |

---

## Task Breakdown

### Task 1: Project Initialization

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- Create: `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/lib/firebase/config.ts`
- Create: `.env.local.example`
- Create: `public/` directory

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

- [ ] **Step 2: Install additional dependencies**

```bash
npm install firebase framer-motion react-hook-form @hookform/resolvers zod
```

- [ ] **Step 3: Configure Tailwind with brand colors**

Replace `tailwind.config.ts` with brand colors:
- primary: pink (#E91E63)
- secondary: dark blue (#1E3A8A)
- Custom font family, border radius defaults

- [ ] **Step 4: Set up Firebase client config**

Create `src/lib/firebase/config.ts` with Firebase app initialization using environment variables.

- [ ] **Step 5: Create env example file**

`.env.local.example` with placeholder Firebase config values.

- [ ] **Step 6: Update globals.css**

Set up Tailwind directives, smooth scrolling, base font, custom utility classes.

- [ ] **Step 7: Update root layout.tsx**

Set metadata (title, description), add Inter font, wrap children in minimal structure.

- [ ] **Step 8: Create types file**

`src/types/index.ts` with BookingRequest, ContactMessage, BusinessSettings, Service, Testimonial types.

- [ ] **Step 9: Create data files**

- `src/data/services.ts` - All 5 services with descriptions, features, icons
- `src/data/testimonials.ts` - 3 placeholder testimonials
- `src/data/constants.ts` - Business name, phone, email, service area, hours

- [ ] **Step 10: Verify build**

```bash
npm run build
```

Expected: Successful build with no errors.

- [ ] **Step 11: Commit**

```bash
git add -A && git commit -m "feat: initialize Next.js project with Tailwind, Firebase, and brand config"
```

---

### Task 2: Core Layout Components

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Textarea.tsx`
- Create: `src/components/ui/Select.tsx`
- Create: `src/components/ui/Badge.tsx`
- Modify: `src/app/layout.tsx` - integrate Navbar + Footer

- [ ] **Step 1: Create Container component**

`src/components/ui/Container.tsx` - Max-width wrapper with responsive padding.

- [ ] **Step 2: Create Button component**

`src/components/ui/Button.tsx` - Variant prop (primary/secondary/outline), size prop (sm/md/lg), loading state, full-width option. Uses brand colors.

- [ ] **Step 3: Create Card component**

`src/components/ui/Card.tsx` - Rounded card with shadow, padding, optional hover effect.

- [ ] **Step 4: Create form UI components**

- `Input.tsx` - Label, error message support, Tailwind styling
- `Textarea.tsx` - Same pattern as Input
- `Select.tsx` - Same pattern, accepts options array

- [ ] **Step 5: Create Badge component**

`src/components/ui/Badge.tsx` - Color-coded status badge (new=blue, contacted=yellow, scheduled=green, completed=gray).

- [ ] **Step 6: Create Navbar component**

`src/components/layout/Navbar.tsx` - Client component. Logo + company name on left, nav links (Home, Services, About, Book, Contact) on right. Mobile hamburger menu with slide-in drawer. Sticky top. White bg with shadow on scroll. Pink accent on active link.

- [ ] **Step 7: Create Footer component**

`src/components/layout/Footer.tsx` - Company info, quick links, contact info, copyright. Dark blue background, white text. Links to all main pages.

- [ ] **Step 8: Integrate into root layout**

Update `src/app/layout.tsx` to include Navbar and Footer around children. Import globals.css.

- [ ] **Step 9: Verify dev server**

```bash
npm run dev
```

Expected: Page renders with Navbar and Footer visible.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: add core layout components (Navbar, Footer) and reusable UI components"
```

---

### Task 3: Home Page

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/ServicesOverview.tsx`
- Create: `src/components/sections/WhyChooseUs.tsx`
- Create: `src/components/sections/Testimonials.tsx`
- Create: `src/components/sections/ServiceArea.tsx`
- Create: `src/components/sections/CallToAction.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero section**

`Hero.tsx` - Client component (for Framer Motion). Full viewport height minus navbar. Gradient background (pink to pink-dark). Headline: "Professional House Cleaning You Can Trust". Subheadline: "Reliable cleaning services for homes and apartments." Two buttons: "Get Free Quote" (links to /book), "Call Now" (tel: link). Subtle fade-in animation. House-in-hand SVG icon placeholder.

- [ ] **Step 2: Create Services Overview section**

`ServicesOverview.tsx` - Section with heading "Our Services". Grid of 5 cards using Card component. Each card: icon placeholder, service name, short description, "Learn More" link to /services. Uses services data from `data/services.ts`. Light gray background.

- [ ] **Step 3: Create Why Choose Us section**

`WhyChooseUs.tsx` - 4 features in grid: Reliable, Friendly, Attention to Detail, Trusted Service. Each with icon placeholder, title, short description. White background.

- [ ] **Step 4: Create Testimonials section**

`Testimonials.tsx` - 3 testimonial cards with quote, name, star rating placeholder. Light gray background. Uses data from `data/testimonials.ts`.

- [ ] **Step 5: Create Service Area section**

`ServiceArea.tsx` - Simple section showing service area text from constants. Map placeholder (colored box with text for V1).

- [ ] **Step 6: Create Call To Action section**

`CallToAction.tsx` - Dark blue background. "Ready for a Clean Home?" heading. "Get Your Free Quote" button linking to /book. Phone number link.

- [ ] **Step 7: Assemble Home page**

Update `src/app/page.tsx` - Server component importing and rendering all sections in order: Hero, ServicesOverview, WhyChooseUs, Testimonials, ServiceArea, CallToAction.

- [ ] **Step 8: Verify home page renders**

```bash
npm run dev
```

Navigate to http://localhost:3000 - verify all sections visible and responsive.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: add home page with all sections (Hero, Services, Why Us, Testimonials, CTA)"
```

---

### Task 4: Services Page

**Files:**
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Create Services page**

`src/app/services/page.tsx` - Page heading "Our Cleaning Services". Detailed cards for each of the 4 main services (Standard, Deep, Move-In, Move-Out). Each card: service name, full description, "What's Included" bullet list, "Request Quote" button linking to /book with service type query param. Uses Framer Motion for staggered card entrance. Import service data from `data/services.ts`.

- [ ] **Step 2: Verify services page**

```bash
npm run dev
```

Navigate to /services - verify all service cards render correctly.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add services page with detailed service cards"
```

---

### Task 5: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create About page**

`src/app/about/page.tsx` - Sections:
1. Hero banner with "About Ariel's Helping Hand"
2. Company story - Friendly narrative about the founding
3. Mission statement card
4. Values grid (Reliability, Trust, Quality, Care, Professionalism, Community)
5. Trust-building section with placeholder stats
6. CTA to book a service

Uses Framer Motion for scroll animations. Professional layout with images placeholders (colored divs for V1).

- [ ] **Step 2: Verify about page**

```bash
npm run dev
```

Navigate to /about - verify content renders correctly.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add about page with company story, mission, and values"
```

---

### Task 6: Book Service Page + Firebase Integration

**Files:**
- Create: `src/lib/validations/booking.ts`
- Create: `src/lib/db/bookings.ts`
- Create: `src/lib/db/settings.ts`
- Create: `src/components/forms/BookingForm.tsx`
- Create: `src/app/book/page.tsx`
- Modify: `src/lib/firebase/config.ts` (ensure exports are correct)

- [ ] **Step 1: Create booking validation schema**

`src/lib/validations/booking.ts` - Zod schema for booking form with all fields validated (fullName required, phone required, email valid, address required, serviceType enum, bedrooms min 0, bathrooms min 0, preferredDate required, notes optional). Export inferred TypeScript type.

- [ ] **Step 2: Create bookings DB helpers**

`src/lib/db/bookings.ts` - Functions:
- `createBooking(data)` - Add document to `booking_requests` with status "new" and serverTimestamp
- `getBookings()` - Get all bookings ordered by createdAt desc
- `updateBookingStatus(id, status)` - Update status field
- `deleteBooking(id)` - Delete document

- [ ] **Step 3: Create settings DB helpers**

`src/lib/db/settings.ts` - Functions:
- `getBusinessSettings()` - Get `business_settings` document
- `updateBusinessSettings(data)` - Update settings document
- `isAcceptingRequests()` - Check acceptingRequests field

- [ ] **Step 4: Create BookingForm component**

`src/components/forms/BookingForm.tsx` - Client component. React Hook Form with Zod resolver. All form fields from spec. Service type dropdown with 4 options. Bedroom/bathroom number inputs. Date picker (native HTML date input). Loading state on submit. Success/error messages. Calls `createBooking()` on submit.

- [ ] **Step 5: Create Book page**

`src/app/book/page.tsx` - Client component. Fetches `isAcceptingRequests()` from Firestore. If true: shows page heading + BookingForm. If false: shows "not accepting requests" message with styling matching spec. Handles query param `service` to pre-select service type. Also shows phone/email contact info as alternatives.

- [ ] **Step 6: Test form submission**

Manual test: Fill out form, submit, verify document appears in Firestore console.

- [ ] **Step 7: Verify book page**

```bash
npm run dev
```

Navigate to /book - verify form renders and validates correctly.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add booking page with form, validation, and Firebase Firestore integration"
```

---

### Task 7: Contact Page

**Files:**
- Create: `src/lib/validations/contact.ts`
- Create: `src/lib/db/contacts.ts`
- Create: `src/components/forms/ContactForm.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create contact validation schema**

`src/lib/validations/contact.ts` - Zod schema: name (required), email (valid), message (required, min 10 chars).

- [ ] **Step 2: Create contacts DB helpers**

`src/lib/db/contacts.ts` - Functions:
- `createContactMessage(data)` - Add to `contact_messages` with serverTimestamp
- `getContactMessages()` - Get all ordered by createdAt desc

- [ ] **Step 3: Create ContactForm component**

`src/components/forms/ContactForm.tsx` - Client component. React Hook Form + Zod. Fields: name, email, message. Submit to Firestore. Success/error states.

- [ ] **Step 4: Create Contact page**

`src/app/contact/page.tsx` - Two-column layout. Left: Contact info cards (phone with tel link, email with mailto, business hours, service area). Right: ContactForm. Below: Optional embedded map placeholder.

- [ ] **Step 5: Verify contact page**

```bash
npm run dev
```

Navigate to /contact - verify form and contact info render.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add contact page with form and business info"
```

---

### Task 8: Admin Dashboard

**Files:**
- Create: `src/lib/auth/admin-auth.ts`
- Create: `src/components/admin/AdminGuard.tsx`
- Create: `src/components/admin/BookingTable.tsx`
- Create: `src/components/admin/BookingDetail.tsx`
- Create: `src/components/admin/SettingsForm.tsx`
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/settings/page.tsx`

- [ ] **Step 1: Create admin auth helpers**

`src/lib/auth/admin-auth.ts` - Functions:
- `signInAdmin(email, password)` - Firebase Auth signInWithEmailAndPassword
- `signOutAdmin()` - Firebase Auth signOut
- `onAuthChange(callback)` - onAuthStateChanged listener
- `getCurrentAdmin()` - Get current user or null

- [ ] **Step 2: Create AdminGuard component**

`src/components/admin/AdminGuard.tsx` - Client component. Listens to auth state. If loading: show spinner. If not authenticated: redirect to /admin/login. If authenticated: render children.

- [ ] **Step 3: Create admin layout**

`src/app/admin/layout.tsx` - Wraps all admin pages with AdminGuard. Simple admin header with "Admin Dashboard" title, nav links (Bookings, Settings), and Sign Out button.

- [ ] **Step 4: Create login page**

`src/app/admin/login/page.tsx` - Client component. Simple centered login form (email + password). Calls `signInAdmin()`. Redirects to /admin on success. Shows error on failure. Already logged in? Redirect to /admin.

- [ ] **Step 5: Create BookingTable component**

`src/components/admin/BookingTable.tsx` - Client component. Table showing: name, service type, date, status badge, created date. Click row to view detail. Filter by status dropdown. Responsive - cards on mobile.

- [ ] **Step 6: Create BookingDetail component**

`src/components/admin/BookingDetail.tsx` - Client component. Modal/slide-over panel showing full booking details. Status change dropdown (new/contacted/scheduled/completed). Delete button with confirmation. Uses `updateBookingStatus()` and `deleteBooking()`.

- [ ] **Step 7: Create admin bookings page**

`src/app/admin/page.tsx` - Client component. Fetches all bookings from Firestore. Renders BookingTable. Manages selected booking state for BookingDetail panel.

- [ ] **Step 8: Create SettingsForm component**

`src/components/admin/SettingsForm.tsx` - Client component. Form with: acceptingRequests toggle, phoneNumber, email, serviceArea, businessHours fields. Pre-populated from Firestore. Saves via `updateBusinessSettings()`.

- [ ] **Step 9: Create admin settings page**

`src/app/admin/settings/page.tsx` - Client component. Fetches current settings, renders SettingsForm.

- [ ] **Step 10: Verify admin pages**

```bash
npm run dev
```

Navigate to /admin/login - test login flow, dashboard, settings.

- [ ] **Step 11: Commit**

```bash
git add -A && git commit -m "feat: add admin dashboard with auth, booking management, and settings"
```

---

### Task 9: Final Testing, SEO & Polish

**Files:**
- Modify: `src/app/layout.tsx` - final SEO metadata
- Modify: All page files - add page-specific metadata

- [ ] **Step 1: Add SEO metadata to all pages**

- Root layout: title template, meta description, Open Graph defaults
- Home: full SEO title, description, keywords
- Services: "Our Cleaning Services | Ariel's Helping Hand"
- About: "About Us | Ariel's Helping Hand"
- Book: "Book a Cleaning | Ariel's Helping Hand"
- Contact: "Contact Us | Ariel's Helping Hand"

- [ ] **Step 2: Add page transition animations**

Wrap page content with Framer Motion fade-in. Ensure smooth page transitions.

- [ ] **Step 3: Test responsive design**

Test at mobile (375px), tablet (768px), desktop (1280px) breakpoints for all pages.

- [ ] **Step 4: Run build and fix any errors**

```bash
npm run build
```

Fix any TypeScript errors, lint warnings, or build failures.

- [ ] **Step 5: Run linter**

```bash
npm run lint
```

Fix all lint issues.

- [ ] **Step 6: Final commit**

```bash
git add -A && git commit -m "feat: add SEO metadata, animations, and final polish"
```
