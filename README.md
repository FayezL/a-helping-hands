<p align="center">
  <img src="public/logo.png" alt="Helping Hands" width="40" />
  <br />
  <strong>Helping Hands</strong> &middot; <em>Ariel's Cleaning — house cleaning in North County San Diego</em>
  <br />
  <a href="https://helping-hands-55c3a.web.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live_Demo-22c55e?style=flat&logo=firebase&logoColor=white" /></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" />
  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-12-FFCA28?style=flat&logo=firebase&logoColor=black" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue?style=flat" />
  <br />
  <a href="https://helping-hands-55c3a.web.app"><strong>Live Demo</strong></a> &nbsp;·&nbsp;
  <a href="#features">Features</a> &nbsp;·&nbsp;
  <a href="#tech-stack">Tech Stack</a> &nbsp;·&nbsp;
  <a href="#getting-started">Getting Started</a>
</p>

<p align="center">
  <img src="public/hero-section.png" alt="Helping Hands hero" width="520" />
</p>

## About

**Helping Hands** is a production-style marketing site and booking system built for **Ariel's Cleaning**, a family-owned house cleaning business serving North County San Diego. Visitors can browse services, read testimonials, and submit booking requests and contact messages — all of which flow into a secure, auth-protected admin dashboard where the business owner manages leads and site settings.

It's built with the **Next.js App Router**, **React 19**, and **Firebase**, with a custom design system, animated landing sections, and end-to-end form validation.

## Live Demo

Check out the deployed app:

**[helping-hands-55c3a.web.app](https://helping-hands-55c3a.web.app)**

> The public site is fully browsable. The `/admin` dashboard is protected by Firebase Authentication.

## Features

- **Animated, responsive landing page** — scroll-reveal sections powered by Framer Motion.
- **7 detailed cleaning services** — weekly, bi-weekly, monthly, deep, move-in, move-out, and eco-friendly, each with feature lists.
- **Booking / quote request form** — validated end-to-end with `react-hook-form` + `Zod`, persisted to Firestore.
- **Contact form** — customer messages saved to Firestore for follow-up.
- **Auth-protected admin dashboard** — Firebase Auth (email/password) gated by an `AdminGuard` route protector.
  - Manage booking requests with a **status workflow** (`new → contacted → scheduled → completed`).
  - Review and delete contact messages.
  - Edit business **settings** (phone, email, service area, hours, and an "accepting requests" toggle).
- **SEO-optimized** — per-page metadata, OpenGraph tags, and a custom favicon.
- **Custom UI component library** — reusable `Button`, `Card`, `Input`, `Select`, `Textarea`, `Badge`, and `Container` primitives.
- **Elegant typography** — Great Vibes, Playfair Display, and Poppins via `next/font`.

## Tech Stack

| Area | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org) (App Router), [React 19](https://react.dev) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Backend / Data** | [Firebase 12](https://firebase.google.com) — Firestore & Authentication |
| **Forms** | [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Tooling** | ESLint, PostCSS |

## Pages & Routes

| Route | Description |
| --- | --- |
| `/` | Landing page — hero, services overview, why-choose-us, testimonials, service area, CTA |
| `/services` | Full list of cleaning services with descriptions and feature lists |
| `/about` | The story behind Ariel's Cleaning |
| `/book` | Booking / quote request form |
| `/contact` | Contact form |
| `/admin` | Auth-protected dashboard (bookings, messages, settings) |
| `/admin/login` | Admin sign-in |
| `/admin/settings` | Business settings editor |

## Technical Overview

### Architecture

- **App Router** with server components by default and `'use client'` boundaries for interactive pages (forms, admin, animations).
- A thin **data layer** in `src/lib/db` (`bookings`, `contacts`, `settings`) wraps Firestore reads/writes.
- **Client-side auth** via `firebase/auth`; the `AdminGuard` component listens to `onAuthStateChanged` and redirects unauthenticated users to `/admin/login`.
- Business content (services, testimonials, constants) is centralized in `src/data` for easy editing.

### Data Model (Firestore)

```
booking_requests/{id}
  fullName, phone, email, address, serviceType,
  bedrooms, bathrooms, preferredDate, notes,
  status: "new" | "contacted" | "scheduled" | "completed",
  createdAt

contact_messages/{id}
  name, email, message, createdAt

settings/{id}
  acceptingRequests, phoneNumber, email, serviceArea, businessHours
```

### Security Rules

Public visitors can **create** booking requests and contact messages; all reads, updates, and deletes require **authentication**. Site settings are publicly readable but only admin-writable.

```js
match /booking_requests/{id} {
  allow create: if true;
  allow read, update, delete: if isAuthenticated();
}
match /contact_messages/{id} {
  allow create: if true;
  allow read, delete: if isAuthenticated();
}
match /settings/{id} {
  allow read: if true;
  allow write: if isAuthenticated();
}
```

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (or a modern LTS)
- A **Firebase** project with **Firestore** and **Email/Password Authentication** enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/FayezL/helping-hands.git
cd helping-hands

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.local.example .env.local
```

Add your Firebase web app credentials to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start the production server
npm run lint    # Run ESLint
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── about/                # About page
│   ├── admin/                # Admin dashboard (auth-protected)
│   │   ├── login/            #   Admin sign-in
│   │   └── settings/         #   Business settings editor
│   ├── book/                 # Booking / quote request
│   ├── contact/              # Contact form
│   ├── services/             # Services listing
│   ├── layout.tsx            # Root layout, fonts, metadata
│   └── page.tsx              # Landing page
├── components/
│   ├── admin/                # AdminGuard, BookingTable, SettingsForm…
│   ├── forms/                # BookingForm, ContactForm
│   ├── layout/               # Navbar, Footer
│   ├── sections/             # Landing-page sections (Hero, Testimonials…)
│   └── ui/                   # Reusable primitives (Button, Card, Input…)
├── data/                     # Services, testimonials, business constants
├── lib/
│   ├── auth/                 # Firebase auth helpers
│   ├── db/                   # Firestore data layer
│   ├── firebase/             # Firebase config & initialization
│   └── validations/          # Zod schemas for forms
└── types/                    # Shared TypeScript types
```

## Built With

A portfolio project by **Fayez** — showcasing full-stack web development with Next.js and Firebase.

- Live site: [helping-hands-55c3a.web.app](https://helping-hands-55c3a.web.app)
- GitHub: [FayezL](https://github.com/FayezL)

## License

Distributed under the [MIT License](LICENSE).
