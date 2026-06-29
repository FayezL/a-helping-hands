# Auto-Updating Yelp Reviews (Plan B) — Design

**Date:** 2026-06-29
**Status:** Approved

## 1. Goal

Show the business's **real, auto-updating Yelp rating and review snippets** on the
marketing site. Replace the current fake placeholder testimonials with real Yelp
content that refreshes itself weekly — with no backend, no Firebase Blaze plan,
and the API key never exposed to the client.

## 2. Approach (Plan B)

A scheduled **GitHub Action** runs weekly, calls the **Yelp Fusion API** from CI
(key held in GitHub Secrets), writes the result to a JSON file in the repo,
commits it, rebuilds the static site, and redeploys to Firebase Hosting. The site
simply imports that JSON at build time.

Why this fits the project:
- The site is a Next.js **static export** on Firebase Hosting — no server runtime.
- Yelp blocks browser/CORS access and the API key must stay server-side; CI is a
  safe server-side environment.
- No new infrastructure (no Firebase Functions, stays on the free Spark plan).

## 3. Yelp Business Resolution

Known Yelp URL alias: `a-helping-hand-vista`.

1. `GET /businesses/a-helping-hand-vista` → returns canonical `id`, `name`,
   `rating`, `review_count`, `url`.
2. `GET /businesses/{id}/reviews` → up to 3 review snippets.

Fallback: if the alias 404s, call `GET /businesses/matches` with
`name=A Helping Hand`, `city=Vista`, `state=CA`, `country=US` to resolve the id,
then proceed. This makes the script robust to alias changes.

## 4. Data Shape — `src/data/yelp-data.json`

```json
{
  "businessName": "A Helping Hand",
  "rating": null,
  "reviewCount": 0,
  "yelpUrl": "https://www.yelp.com/biz/a-helping-hand-vista",
  "lastUpdated": "2026-06-29T00:00:00.000Z",
  "reviews": []
}
```

**Seeded empty** (`rating: null`, `reviews: []`) so the site builds and ships
safely before the API key is configured. The UI renders a graceful fallback in
that state. Once the Action runs with the key, real data replaces it.

### TypeScript types (`src/types/index.ts`)

```ts
export interface YelpReviewSnippet {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  url: string;
}

export interface YelpReviewData {
  businessName: string;
  rating: number | null;
  reviewCount: number;
  yelpUrl: string;
  lastUpdated: string;
  reviews: YelpReviewSnippet[];
}
```

## 5. UI — `YelpReviews` section (replaces `Testimonials`)

Placed on the landing page where `<Testimonials />` is today. Visually matches the
existing testimonials section (gradient background, Container, badge pill,
heading, card grid) so the swap is seamless.

Behavior:
- **Header:** "Loved by Our Community" pill + "What Our Clients Say" heading.
- **Rating badge (only if `rating !== null`):** a 5-star row with half-star
  support + the numeric rating + `(reviewCount) reviews on Yelp` + a link to
  `yelpUrl`.
- **Review cards (only if `reviews.length > 0`):** grid of up to 3 cards, each
  with avatar initial, author name, date, star rating, quote excerpt, and a
  per-card "Read on Yelp" link. Card styling reused from the existing section.
- **CTA button:** "See all reviews on Yelp" → `yelpUrl`.
- **Fallback (no data yet — `rating === null`):** the section still renders the
  heading + a single CTA "Read our reviews on Yelp" button. No broken UI.

## 6. Files

**New:**
- `scripts/fetch-yelp-data.mjs` — zero-dependency Node ESM script (Node 20 global
  `fetch`). Reads `YELP_API_KEY` from env, writes `src/data/yelp-data.json`.
- `src/data/yelp-data.json` — seeded empty.
- `src/components/sections/YelpReviews.tsx` — the new section.
- `.github/workflows/update-yelp-reviews.yml` — weekly cron + manual trigger.

**Modified:**
- `src/types/index.ts` — add `YelpReviewSnippet` and `YelpReviewData`.
- `src/app/page.tsx` — `<Testimonials />` → `<YelpReviews />`.

**Removed (fake data, per approved choice):**
- `src/data/testimonials.ts`
- `src/components/sections/Testimonials.tsx`
- `Testimonial` interface (verified unused elsewhere before removal).

## 7. GitHub Action — `.github/workflows/update-yelp-reviews.yml`

- **Triggers:** `schedule` cron `0 8 * * 1` (Mon 08:00 UTC) + `workflow_dispatch`
  (manual button in the GitHub UI).
- **Steps:**
  1. `actions/checkout@v4`
  2. `actions/setup-node@v4` (Node 20, `cache: npm`)
  3. `npm ci`
  4. Run `node scripts/fetch-yelp-data.mjs` with `YELP_API_KEY` from secrets.
  5. Commit-if-changed as `github-actions[bot]`; set a step output `changed`.
  6. Build (`npm run build`) and deploy (`npx firebase deploy --only hosting`
     with `FIREBASE_TOKEN` from secrets), **only if `changed == true`**.

## 8. Security

- The Yelp API key lives **only** in the GitHub Secret `YELP_API_KEY` and the
  Action's ephemeral env. It is never written to the repo or bundled into the
  client.
- `FIREBASE_TOKEN` lives only in the GitHub Secret of the same name.
- The deployed site contains only the committed JSON (public rating/review data).

## 9. Setup Prerequisites (user, one time)

1. Create a Yelp Fusion app at yelp.com/developers → copy the API key.
2. Add repo secrets: `YELP_API_KEY` and `FIREBASE_TOKEN` (the latter from
   `firebase login:ci`).
3. After adding secrets, trigger the Action manually (or wait for the weekly
   cron) to populate real data.

Until these are set, the site shows the graceful fallback.

## 10. Out of Scope (Future)

- More than 3 review snippets (Yelp API hard limit; would need a widget or
  Functions for more).
- Curated/hand-picked reviews beyond the 3 API snippets.
- Web-vitals / GA event tracking on review CTA clicks.
