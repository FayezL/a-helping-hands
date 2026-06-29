# Booking Source Tracking + Admin Manual Booking Creation

**Date:** 2026-06-29
**Status:** Approved (pending spec review)

## 1. Goal

Let the admin create bookings manually (e.g., when a customer calls) and track
**where every booking came from** ("source"), so the business can later see which
channels drive the most leads.

## 2. Requirements

1. A **"New Booking"** button on the admin dashboard opens a modal form to create
   a booking by hand.
2. Every booking stores a **`source`** value from a fixed, centrally-defined list.
3. The public `/book` form auto-tags its submissions `Website` — no visible change.
4. Source is shown in the bookings **table**, the **detail drawer**, and is
   **filterable**.
5. Adding a new source in the future must be a **one-line change** — the dropdown,
   filter, badge, and types all update automatically.
6. Existing bookings (created before this feature) must display correctly with no
   data migration script.

## 3. Booking Sources

A single source of truth in `src/data/constants.ts`:

```ts
export const BOOKING_SOURCES = [
  "Website",
  "Phone Call",
  "Email",
  "Walk-in",
  "Referral",
  "Social Media",
  "Other",
] as const;
```

The TypeScript type is **derived** from this array, not hand-written:

```ts
export type BookingSource = (typeof BOOKING_SOURCES)[number];
```

> This is the scalability lever. To add a source later (e.g. `"Google Ads"`),
> append one line to `BOOKING_SOURCES`. The dropdown, the table filter, the Zod
> schema, and the type all update automatically. The only manual touch is
> optionally adding a color for the new source in `SourceBadge` — and even that
> degrades gracefully (see §7).

## 4. Data Model

### Types (`src/types/index.ts`)

The `BOOKING_SOURCES` const lives in `src/data/constants.ts` (§3). `types/index.ts`
imports it and derives the union type from it. This keeps all types centralized
(following the existing convention) while keeping the const list as the single
source of truth. No circular import: `constants.ts` imports nothing from `types`.

```ts
import { BOOKING_SOURCES } from "@/data/constants";

export type BookingSource = (typeof BOOKING_SOURCES)[number];

export interface BookingRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  bedrooms: number;
  bathrooms: number;
  preferredDate: string;
  notes: string;
  status: BookingStatus;
  source: BookingSource;          // NEW
  createdAt: Date;
}

export interface BookingFormData {
  // ...all existing fields...
  source: BookingSource;          // NEW
}
```

### Firestore document shape

`booking_requests/{id}` gains one field: `source: string`. Existing documents
that predate this feature simply omit it; `mapBooking` falls back to `"Website"`
on read (see §6).

Example document after the change:

```
booking_requests/{id}
  fullName, phone, email, address, serviceType,
  bedrooms, bathrooms, preferredDate, notes,
  status: "new" | "contacted" | "scheduled" | "completed",
  source: "Phone Call",          // NEW
  createdAt
```

### Database connection (verified)

The Firebase data path is already correct and connected:

- `src/lib/firebase/config.ts:16` initializes Firestore as `db` from
  `NEXT_PUBLIC_FIREBASE_*` env vars.
- `src/lib/db/bookings.ts:40` `createBooking()` calls
  `addDoc(collection(db, "booking_requests"), { ...data, status, createdAt })`.
  Because it spreads `...data`, any field added to `BookingFormData`
  (including `source`) is persisted automatically — no query changes needed.
- `src/lib/db/bookings.ts:17` `mapBooking()` is the single read mapper; adding
  `source: data.source ?? "Website"` covers both new and legacy records.

## 5. Validation (`src/lib/validations/booking.ts`)

Add `source` to `bookingSchema`. Because the schema is shared by the public form
(which must keep working unchanged), `source` gets a default of `"Website"`:

```ts
import { BOOKING_SOURCES } from "@/data/constants";

export const bookingSchema = z.object({
  // ...existing fields...
  source: z.enum(BOOKING_SOURCES).default("Website"),
});
```

`z.enum` accepts a readonly array, so the schema stays in lock-step with the
const list — no duplicated literals.

## 6. Data Layer (`src/lib/db/bookings.ts`)

One change to `mapBooking`:

```ts
source: data.source ?? "Website",
```

- `createBooking`, `getBookings`, `updateBookingStatus`, `deleteBooking` need
  **no changes** — `createBooking` already spreads the form payload, so `source`
  flows through to Firestore automatically.
- No migration script. Legacy documents without `source` read back as
  `"Website"`, which is accurate (the public form was the only entry point).

## 7. UI Components

### `SourceBadge` (NEW — `src/components/ui/SourceBadge.tsx`)

A pill showing the source with a distinct color per source. Uses a `Record` of
colors keyed by source, **with a safe fallback** so an un-configured source still
renders (just gray) instead of crashing:

```ts
const sourceColors: Partial<Record<BookingSource, string>> = {
  "Website":      "bg-blue-100 text-blue-800",
  "Phone Call":   "bg-emerald-100 text-emerald-800",
  "Email":        "bg-indigo-100 text-indigo-800",
  "Walk-in":      "bg-amber-100 text-amber-800",
  "Referral":     "bg-pink-100 text-pink-800",
  "Social Media": "bg-purple-100 text-purple-800",
  "Other":        "bg-gray-100 text-gray-800",
};
// fallback: "bg-gray-100 text-gray-800"
```

Kept separate from the status `Badge` (`src/components/ui/Badge.tsx`), which is
keyed by `BookingStatus` and has a different purpose.

### `CreateBookingModal` (NEW — `src/components/admin/CreateBookingModal.tsx`)

A centered modal dialog containing the booking form. Built with Framer Motion
(consistent with the existing `BookingDetail` slide-out's polish).

- Renders all standard booking fields, **plus a Source `<Select>`**.
- Source dropdown options are derived from `BOOKING_SOURCES` (one source of
  truth).
- Default source: **"Phone Call"** (the typical manual-creation case), editable.
- Uses `react-hook-form` + `bookingSchema` (same schema as the public form).
- Default status: `new` (admin can advance it in the detail drawer immediately).
- On submit: `await createBooking(data)` → call `onCreated()` prop → parent
  closes modal, refetches list, and selects the new booking.
- Props: `{ onClose: () => void; onCreated: (id: string) => void }`.
- Includes loading + error states (matches `BookingForm`'s pattern).

## 8. Admin Dashboard Wiring (`src/app/admin/AdminDashboardClient.tsx`)

- Add a **"New Booking"** button (primary variant, using existing `Button`) in
  the header row, aligned right of the "Bookings" title.
- New state: `showCreateModal: boolean`.
- `handleCreate` opens the modal; `CreateBookingModal`'s `onCreated` closes it,
  calls `fetchBookings()`, and could optionally auto-open the new booking.
- Stat cards unchanged in this phase (a source breakdown chart is explicitly
  out of scope — see §11).

## 9. Bookings Table (`src/components/admin/BookingTable.tsx`)

- New **"Source"** column between "Service" and "Date" showing `<SourceBadge>`.
  (Hidden-column count in empty-state `colSpan` updates accordingly.)
- New **source filter `<select>`** alongside the existing status filter. Its
  options are built from `[{ value: "all", label: "All sources" },
  ...BOOKING_SOURCES.map(s => ({ value: s, label: s }))]`.
- Mobile card view also shows the source badge.
- Both filters compose (a booking must match both the selected status and source
  to appear).

## 10. Booking Detail (`src/components/admin/BookingDetail.tsx`)

- Add a **"Source"** row (label + `<SourceBadge>`) near the top of the detail
  panel, next to/under the Status row.

## 11. Firestore Security Rules

**No change.** Manual creation goes through the existing `createBooking`
path, and `firestore.rules` already allows `create: if true` on
`booking_requests` (so the public form works). The admin is authenticated
regardless. No new collections, no new permissions.

## 12. Files

**New:**
- `src/components/admin/CreateBookingModal.tsx`
- `src/components/ui/SourceBadge.tsx`

**Modified:**
- `src/types/index.ts` — add `BookingSource` (derived type), add `source` to
  `BookingRequest` and `BookingFormData`
- `src/data/constants.ts` — add `BOOKING_SOURCES` const
- `src/lib/validations/booking.ts` — add `source` field (`z.enum(BOOKING_SOURCES).default("Website")`)
- `src/lib/db/bookings.ts` — read `source` in `mapBooking` with `"Website"` fallback
- `src/components/forms/BookingForm.tsx` — set `defaultValues.source: "Website"` (no UI change)
- `src/app/admin/AdminDashboardClient.tsx` — add "New Booking" button + modal state
- `src/components/admin/BookingTable.tsx` — Source column + source filter
- `src/components/admin/BookingDetail.tsx` — show Source row

## 13. Scalability Notes

- **Single source of truth:** `BOOKING_SOURCES` in `constants.ts` drives the
  type, the Zod schema, the create-form dropdown, and the table filter.
  Adding a channel = one line.
- **Graceful degradation:** `SourceBadge` falls back to gray for any source not
  in its color map, so rendering never breaks when a source is added.
- **No schema migrations:** new optional-with-fallback field; legacy documents
  read correctly via `mapBooking`.

## 14. Out of Scope (Future)

- Source analytics / charts on the dashboard (a breakdown-by-source panel).
- Editing a booking's `source` after creation (the detail drawer currently only
  edits `status`).
- Contacts/messages source tracking.
