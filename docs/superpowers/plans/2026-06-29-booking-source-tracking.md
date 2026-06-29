# Booking Source Tracking + Admin Manual Booking Creation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the admin create bookings manually (e.g., from a customer phone call) and track where every booking came from ("source"), surfaced in the table, detail drawer, and filters.

**Architecture:** Add a single `source` field to the booking data model, driven by one const list (`BOOKING_SOURCES`) that is the source of truth for the type, the Zod schema, the create-form dropdown, and the table filter. Add a `CreateBookingModal` (centered Framer Motion dialog) wired to a "New Booking" button on the dashboard. Show source via a new `SourceBadge`. No Firestore migration; legacy docs read back as `"Website"` via a fallback in `mapBooking`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind 4, Firebase 12 (Firestore), react-hook-form + Zod, Framer Motion.

**Verification approach:** This project has no test runner and `AGENTS.md` defines verification as lint + typecheck. Each task verifies with `npm run lint` then `npx tsc --noEmit`. The final task runs `npm run build`. Baseline (pre-plan) state of both is green.

**Spec:** `docs/superpowers/specs/2026-06-29-booking-source-tracking-design.md`

---

## File Structure

**New:**
- `src/components/ui/SourceBadge.tsx` — colored pill rendering a `BookingSource`, with safe fallback color.
- `src/components/admin/CreateBookingModal.tsx` — centered modal form to manually create a booking (includes a Source dropdown).

**Modified:**
- `src/data/constants.ts` — add `BOOKING_SOURCES` const (single source of truth).
- `src/types/index.ts` — add `BookingSource` type (derived from the const) + `source` field on `BookingRequest` and `BookingFormData`.
- `src/lib/validations/booking.ts` — add `source` to `bookingSchema` with `.default("Website")`.
- `src/lib/db/bookings.ts` — read `source` in `mapBooking` with `"Website"` fallback.
- `src/components/forms/BookingForm.tsx` — set `defaultValues.source = "Website"` (no UI change).
- `src/app/admin/AdminDashboardClient.tsx` — "New Booking" button + modal state.
- `src/components/admin/BookingTable.tsx` — Source column + source filter.
- `src/components/admin/BookingDetail.tsx` — show Source row.

---

## Task 1: Data model — add the `source` field

This task establishes `source` end-to-end across the data layer in one commit so the build stays green (all type changes are satisfied together).

**Files:**
- Modify: `src/data/constants.ts`
- Modify: `src/types/index.ts`
- Modify: `src/lib/validations/booking.ts`
- Modify: `src/lib/db/bookings.ts`
- Modify: `src/components/forms/BookingForm.tsx`

- [ ] **Step 1: Add `BOOKING_SOURCES` to constants**

In `src/data/constants.ts`, append after the existing `SERVICE_TYPES` export:

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

- [ ] **Step 2: Add the `BookingSource` type and `source` field**

Replace the top portion of `src/types/index.ts` (the `BookingStatus` line and both `Booking*` interfaces) with:

```ts
import { BOOKING_SOURCES } from "@/data/constants";

export type BookingStatus = "new" | "contacted" | "scheduled" | "completed";

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
  source: BookingSource;
  createdAt: Date;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  bedrooms: number;
  bathrooms: number;
  preferredDate: string;
  notes: string;
  source: BookingSource;
}
```

Leave `ContactMessage`, `ContactFormData`, `BusinessSettings`, `Service`, `Testimonial` unchanged.

- [ ] **Step 3: Add `source` to the Zod schema**

In `src/lib/validations/booking.ts`, add the import and the `source` field. Final file:

```ts
import { z } from "zod";
import { BOOKING_SOURCES } from "@/data/constants";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(5, "Address is required"),
  serviceType: z.enum(
    [
      "Weekly Cleaning",
      "Bi-Weekly Cleaning",
      "Monthly Cleaning",
      "Deep Cleaning",
      "Move-In Cleaning",
      "Move-Out Cleaning",
      "Eco-Friendly Cleaning",
    ],
    { message: "Please select a service type" }
  ),
  bedrooms: z.coerce.number().min(0, "Must be 0 or more"),
  bathrooms: z.coerce.number().min(0, "Must be 0 or more"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  notes: z.string().optional().default(""),
  source: z.enum([...BOOKING_SOURCES]).default("Website"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
```

> Note: the spread `[...BOOKING_SOURCES]` produces a mutable tuple of the literal
> values, which Zod's `z.enum` accepts. The inferred value union equals
> `BookingSource`, so the schema and type stay in lock-step.

- [ ] **Step 4: Read `source` in `mapBooking`**

In `src/lib/db/bookings.ts`, inside the `mapBooking` function's returned object, add the `source` line (with `"Website"` fallback for legacy docs). The returned object becomes:

```ts
  return {
    id: docSnap.id,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    address: data.address,
    serviceType: data.serviceType,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    preferredDate: data.preferredDate,
    notes: data.notes || "",
    status: data.status,
    source: data.source ?? "Website",
    createdAt: data.createdAt?.toDate() || new Date(),
  };
```

No other changes to `bookings.ts` — `createBooking` already spreads `...data`, so `source` persists automatically.

- [ ] **Step 5: Tag public submissions as `"Website"`**

In `src/components/forms/BookingForm.tsx`, add `source` to the `defaultValues` passed to `useForm`. Update the `defaultValues` block to:

```ts
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      serviceType: (defaultServiceType || "") as BookingFormValues["serviceType"],
      bedrooms: 0,
      bathrooms: 0,
      preferredDate: "",
      notes: "",
      source: "Website",
    },
```

No visible UI change — this only ensures website submissions carry the source.

- [ ] **Step 6: Verify lint + typecheck**

Run: `npm run lint`
Expected: no errors (clean output).

Run: `npx tsc --noEmit`
Expected: no output, exit 0 (`TYPECHECK_OK` if you echo).

- [ ] **Step 7: Commit**

```bash
git add src/data/constants.ts src/types/index.ts src/lib/validations/booking.ts src/lib/db/bookings.ts src/components/forms/BookingForm.tsx
git commit -m "feat(data): add booking source field"
```

---

## Task 2: `SourceBadge` UI component

**Files:**
- Create: `src/components/ui/SourceBadge.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/ui/SourceBadge.tsx`:

```tsx
import type { BookingSource } from "@/types";

interface SourceBadgeProps {
  source: BookingSource;
}

const sourceColors: Partial<Record<BookingSource, string>> = {
  "Website": "bg-blue-100 text-blue-800",
  "Phone Call": "bg-emerald-100 text-emerald-800",
  "Email": "bg-indigo-100 text-indigo-800",
  "Walk-in": "bg-amber-100 text-amber-800",
  "Referral": "bg-pink-100 text-pink-800",
  "Social Media": "bg-purple-100 text-purple-800",
  "Other": "bg-gray-100 text-gray-800",
};

const fallbackColor = "bg-gray-100 text-gray-800";

export default function SourceBadge({ source }: SourceBadgeProps) {
  const colorClass = sourceColors[source] ?? fallbackColor;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {source}
    </span>
  );
}
```

> Note: `sourceColors` is a `Partial<Record<...>>` with a fallback, so adding a
> new source to `BOOKING_SOURCES` later renders gracefully in gray even before a
> color is configured.

- [ ] **Step 2: Verify lint + typecheck**

Run: `npm run lint`
Expected: clean.

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/SourceBadge.tsx
git commit -m "feat(ui): add SourceBadge component"
```

---

## Task 3: `CreateBookingModal` admin component

**Files:**
- Create: `src/components/admin/CreateBookingModal.tsx`

- [ ] **Step 1: Create the modal**

Create `src/components/admin/CreateBookingModal.tsx`:

```tsx
'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import { createBooking } from "@/lib/db/bookings";
import { BOOKING_SOURCES, SERVICE_TYPES } from "@/data/constants";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

interface CreateBookingModalProps {
  onClose: () => void;
  onCreated: (id: string) => void;
}

export default function CreateBookingModal({ onClose, onCreated }: CreateBookingModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as never,
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      serviceType: "" as BookingFormValues["serviceType"],
      bedrooms: 0,
      bathrooms: 0,
      preferredDate: "",
      notes: "",
      source: "Phone Call",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const id = await createBooking(data);
      onCreated(id);
    } catch {
      setError("Something went wrong creating the booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-8"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">New Booking</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit) as never} className="px-6 py-5 space-y-5">
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  registration={register("fullName")}
                  error={errors.fullName?.message}
                  placeholder="Jane Doe"
                />
                <Input
                  label="Phone"
                  type="tel"
                  registration={register("phone")}
                  error={errors.phone?.message}
                  placeholder="(555) 123-4567"
                />
                <Input
                  label="Email"
                  type="email"
                  registration={register("email")}
                  error={errors.email?.message}
                  placeholder="jane@example.com"
                />
                <Select
                  label="Service Type"
                  registration={register("serviceType")}
                  error={errors.serviceType?.message}
                  options={[
                    { value: "", label: "Select a service..." },
                    ...SERVICE_TYPES.map((s) => ({ value: s, label: s })),
                  ]}
                />
                <Input
                  label="Bedrooms"
                  type="number"
                  min={0}
                  registration={register("bedrooms")}
                  error={errors.bedrooms?.message}
                  placeholder="0"
                />
                <Input
                  label="Bathrooms"
                  type="number"
                  min={0}
                  registration={register("bathrooms")}
                  error={errors.bathrooms?.message}
                  placeholder="0"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    registration={register("address")}
                    error={errors.address?.message}
                    placeholder="123 Main St, City, State"
                  />
                </div>
                <Input
                  label="Preferred Date"
                  type="date"
                  registration={register("preferredDate")}
                  error={errors.preferredDate?.message}
                />
                <Select
                  label="Source"
                  registration={register("source")}
                  error={errors.source?.message}
                  options={BOOKING_SOURCES.map((s) => ({ value: s, label: s }))}
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Notes (optional)"
                    registration={register("notes")}
                    error={errors.notes?.message}
                    placeholder="Any special requests or instructions..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                <Button type="button" variant="outline" size="md" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Booking"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
```

> Notes:
> - Source dropdown defaults to `"Phone Call"` (the typical manual-creation case) but is editable.
> - Default status is `new` — set automatically by `createBooking`. The admin can advance it in the detail drawer afterward.
> - The `as never` casts on the resolver/handleSubmit match the existing `BookingForm.tsx` pattern (Zod + RHF friction is intentionally bypassed there).

- [ ] **Step 2: Verify lint + typecheck**

Run: `npm run lint`
Expected: clean.

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/CreateBookingModal.tsx
git commit -m "feat(admin): add CreateBookingModal component"
```

---

## Task 4: Wire the modal into the admin dashboard

**Files:**
- Modify: `src/app/admin/AdminDashboardClient.tsx`

- [ ] **Step 1: Add imports and state**

In `src/app/admin/AdminDashboardClient.tsx`, update the imports block. Add `Button` and `CreateBookingModal` imports. The imports become:

```ts
'use client';

import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus, deleteBooking } from "@/lib/db/bookings";
import type { BookingRequest, BookingStatus } from "@/types";
import AdminGuard from "@/components/admin/AdminGuard";
import BookingTable from "@/components/admin/BookingTable";
import BookingDetail from "@/components/admin/BookingDetail";
import CreateBookingModal from "@/components/admin/CreateBookingModal";
import Button from "@/components/ui/Button";
```

- [ ] **Step 2: Add modal state and create handler**

Inside the `AdminDashboardClient` component, alongside the existing `selectedBooking`/`loading` state, add:

```ts
  const [showCreateModal, setShowCreateModal] = useState(false);
```

And add this handler after `handleDelete`:

```ts
  const handleCreated = async () => {
    setShowCreateModal(false);
    await fetchBookings();
  };
```

- [ ] **Step 3: Render the "New Booking" button and modal**

Replace the existing heading block:

```tsx
        <h2 className="text-xl font-bold text-gray-900 mb-6">Bookings</h2>
```

with:

```tsx
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Bookings</h2>
          <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
            + New Booking
          </Button>
        </div>
```

Then, just before the closing `</div>` of the guarded container (right after the `BookingDetail` conditional block), add:

```tsx
        {showCreateModal && (
          <CreateBookingModal
            onClose={() => setShowCreateModal(false)}
            onCreated={handleCreated}
          />
        )}
```

- [ ] **Step 4: Verify lint + typecheck**

Run: `npm run lint`
Expected: clean.

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/AdminDashboardClient.tsx
git commit -m "feat(admin): add New Booking button + modal"
```

---

## Task 5: Source column + source filter in the bookings table

**Files:**
- Modify: `src/components/admin/BookingTable.tsx`

- [ ] **Step 1: Add imports**

In `src/components/admin/BookingTable.tsx`, update the imports to add `BookingSource`, `BOOKING_SOURCES`, and `SourceBadge`:

```tsx
'use client';

import { useState } from "react";
import type { BookingRequest, BookingStatus, BookingSource } from "@/types";
import { BOOKING_SOURCES } from "@/data/constants";
import Badge from "@/components/ui/Badge";
import SourceBadge from "@/components/ui/SourceBadge";
```

- [ ] **Step 2: Add source-filter state and combined filtering**

In the component body, after the existing `filter` state, add a source filter and update the `filtered` computation. Replace:

```tsx
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
```

with:

```tsx
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<BookingSource | "all">("all");

  const filtered = bookings.filter((b) => {
    const matchesStatus = filter === "all" || b.status === filter;
    const matchesSource = sourceFilter === "all" || b.source === sourceFilter;
    return matchesStatus && matchesSource;
  });
```

- [ ] **Step 3: Render the source filter dropdown**

Replace the existing single-filter block:

```tsx
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as BookingStatus | "all")}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
```

with:

```tsx
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as BookingStatus | "all")}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value as BookingSource | "all")}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="all">All sources</option>
          {BOOKING_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
```

- [ ] **Step 4: Add the Source column header**

In the desktop table `<thead>`, add a Source column between "Service" and "Date". Replace the header row:

```tsx
            <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-500">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Service</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Submitted</th>
            </tr>
```

with:

```tsx
            <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-500">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Service</th>
              <th className="pb-3 pr-4">Source</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Submitted</th>
            </tr>
```

- [ ] **Step 5: Add the Source cell to each row**

In the desktop table `<tbody>` row mapping, add the Source cell between the Service and Date cells. Replace:

```tsx
                <td className="py-3 pr-4 text-sm text-gray-600">{booking.serviceType}</td>
                <td className="py-3 pr-4 text-sm text-gray-600">{formatDate(new Date(booking.preferredDate))}</td>
```

with:

```tsx
                <td className="py-3 pr-4 text-sm text-gray-600">{booking.serviceType}</td>
                <td className="py-3 pr-4"><SourceBadge source={booking.source} /></td>
                <td className="py-3 pr-4 text-sm text-gray-600">{formatDate(new Date(booking.preferredDate))}</td>
```

- [ ] **Step 6: Update the empty-state `colSpan`**

The empty-state row now spans 6 columns. Replace:

```tsx
                <td colSpan={5} className="py-8 text-center text-sm text-gray-500">
                  No bookings found
                </td>
```

with:

```tsx
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                  No bookings found
                </td>
```

- [ ] **Step 7: Add source to the mobile card view**

In the mobile card, add a Source line to the detail list. Replace:

```tsx
            <div className="space-y-1 text-sm text-gray-600">
              <p>{booking.serviceType}</p>
              <p>Date: {formatDate(new Date(booking.preferredDate))}</p>
              <p>Submitted: {formatDate(booking.createdAt)}</p>
            </div>
```

with:

```tsx
            <div className="space-y-1 text-sm text-gray-600">
              <p>{booking.serviceType}</p>
              <p><SourceBadge source={booking.source} /></p>
              <p>Date: {formatDate(new Date(booking.preferredDate))}</p>
              <p>Submitted: {formatDate(booking.createdAt)}</p>
            </div>
```

- [ ] **Step 8: Verify lint + typecheck**

Run: `npm run lint`
Expected: clean.

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 9: Commit**

```bash
git add src/components/admin/BookingTable.tsx
git commit -m "feat(admin): show source column and source filter"
```

---

## Task 6: Source row in the booking detail drawer

**Files:**
- Modify: `src/components/admin/BookingDetail.tsx`

- [ ] **Step 1: Import `SourceBadge`**

In `src/components/admin/BookingDetail.tsx`, add the import alongside the existing `Badge` import:

```tsx
import Badge from "@/components/ui/Badge";
import SourceBadge from "@/components/ui/SourceBadge";
```

- [ ] **Step 2: Add the Source row**

In the detail panel's `space-y-4` block, add a Source row directly after the Status row. Replace:

```tsx
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <Badge status={booking.status} />
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Name</span>
```

with:

```tsx
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <Badge status={booking.status} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Source</span>
                <SourceBadge source={booking.source} />
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Name</span>
```

- [ ] **Step 3: Verify lint + typecheck**

Run: `npm run lint`
Expected: clean.

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/BookingDetail.tsx
git commit -m "feat(admin): show source in booking detail"
```

---

## Task 7: Final verification — full lint + build

**Files:** none (verification only)

- [ ] **Step 1: Run the linter**

Run: `npm run lint`
Expected: clean (no errors, no warnings).

- [ ] **Step 2: Run a full typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0, no output.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: build completes successfully (route compilation succeeds; no type errors).

- [ ] **Step 4: Manual smoke test (dev server)**

Run: `npm run dev`, then open `http://localhost:3000/admin` (sign in).

Check each of these:
1. **"New Booking" button** appears in the dashboard header, right of the "Bookings" title.
2. Clicking it opens the centered **Create Booking modal** with a **Source** dropdown defaulting to "Phone Call".
3. Fill the form and submit — the modal closes and the new booking appears at the top of the table with the chosen **Source badge**.
4. The **Source filter** dropdown narrows the list (e.g., selecting "Phone Call" shows the booking you just made).
5. Clicking a row opens the **detail drawer**, which now shows a **Source** row with the colored badge.
6. Open `http://localhost:3000/book` and submit the public form — confirm it still works and the resulting booking in the admin table shows source **"Website"**.
7. Existing (pre-feature) bookings still appear, showing source **"Website"** (the fallback).

- [ ] **Step 5: Final commit (only if any fixups were needed)**

If the smoke test surfaced fixups, commit them. Otherwise nothing to commit.

---

## Self-Review (completed during planning)

**Spec coverage:**
- §3 Booking sources (fixed list, derived type) → Task 1 Steps 1–2 ✓
- §4 Data model (`source` on interfaces, Firestore shape) → Task 1 Step 2 ✓
- §4 DB connection / `createBooking` spread already persists source → noted in Task 1 Step 4 ✓
- §5 Validation (`source` with `.default("Website")`) → Task 1 Step 3 ✓
- §6 `mapBooking` fallback → Task 1 Step 4 ✓
- §7 `SourceBadge` (with fallback) → Task 2 ✓
- §7 `CreateBookingModal` (Source dropdown, default "Phone Call") → Task 3 ✓
- §8 Dashboard wiring ("New Booking" button + modal) → Task 4 ✓
- §9 BookingTable (Source column + filter) → Task 5 ✓
- §10 BookingDetail (Source row) → Task 6 ✓
- §11 Firestore rules — no change → no task needed (explicitly out of scope to change) ✓

**Placeholder scan:** none — every code step contains the exact code.

**Type consistency:** `BookingSource` defined in Task 1 Step 2 is used identically in SourceBadge (Task 2), CreateBookingModal (Task 3, via `BookingFormValues["source"]`), BookingTable (Task 5), and BookingDetail (Task 6, via `booking.source`). `onCreated(id: string)` in Task 3 matches the consumer in Task 4 (`handleCreated`). `createBooking` returns `Promise<string>` (existing) — matches.
