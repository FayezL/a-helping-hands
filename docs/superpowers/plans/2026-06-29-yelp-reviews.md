# Auto-Updating Yelp Reviews (Plan B) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Replace fake placeholder testimonials with a `YelpReviews` section that shows the business's live Yelp rating + up to 3 review snippets, refreshed weekly by a GitHub Action that calls the Yelp Fusion API and redeploys.

**Architecture:** GitHub Action (weekly cron + manual) → zero-dep Node script calls Yelp API (`YELP_API_KEY` secret) → writes `src/data/yelp-data.json` → commits if changed → `npm run build` → `firebase deploy --only hosting` (`FIREBASE_TOKEN` secret). Site imports the JSON at build time. Seeded empty so it ships safely before secrets are set.

**Tech Stack:** Next.js 16 (static export), TypeScript 5, Tailwind 4, Firebase Hosting, GitHub Actions, Yelp Fusion API.

**Verification:** `npm run lint`, `npx tsc --noEmit`, `npm run build`, plus the fetch-script guard test. (A real Yelp API call can't be tested here — no key — but the script is built to fail cleanly without one.)

**Spec:** `docs/superpowers/specs/2026-06-29-yelp-reviews-design.md`

---

## Task 1: Types + seeded JSON

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/data/yelp-data.json`

- [ ] **Step 1: Add Yelp types** to `src/types/index.ts` (append):

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

- [ ] **Step 2: Seed the data file** `src/data/yelp-data.json`:

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

- [ ] **Step 3: Verify** `npm run lint` + `npx tsc --noEmit`.

- [ ] **Step 4: Commit** `feat(yelp): add Yelp data types and seeded json`.

---

## Task 2: Fetch script

**Files:**
- Create: `scripts/fetch-yelp-data.mjs`

- [ ] **Step 1: Create the script** (zero-dep, Node 20 global fetch):

```js
#!/usr/bin/env node
import { writeFileSync } from "node:fs";

const YELP_ALIAS = "a-helping-hand-vista";
const API_BASE = "https://api.yelp.com/v3";
const OUT_PATH = "src/data/yelp-data.json";

const apiKey = process.env.YELP_API_KEY;
if (!apiKey) {
  console.error("Missing YELP_API_KEY environment variable.");
  process.exit(1);
}

async function yelpGet(path) {
  const res = await fetch(API_BASE + path, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Yelp GET ${path} failed: ${res.status} ${body}`);
  }
  return res.json();
}

async function resolveBusiness() {
  try {
    return await yelpGet(`/businesses/${YELP_ALIAS}`);
  } catch (err) {
    console.warn(`Alias lookup failed (${err.message}); trying match endpoint.`);
    const match = await yelpGet(
      `/businesses/matches?name=A%20Helping%20Hand&city=Vista&state=CA&country=US&limit=1`
    );
    const found = match.businesses?.[0];
    if (!found) throw new Error("Could not resolve Yelp business.");
    return await yelpGet(`/businesses/${found.id}`);
  }
}

const business = await resolveBusiness();

let reviews = [];
try {
  const reviewsRes = await yelpGet(`/businesses/${business.id}/reviews`);
  reviews = (reviewsRes.reviews || []).map((r) => ({
    id: r.id,
    author: r.user?.name ?? "Anonymous",
    rating: r.rating,
    text: r.text,
    date: r.time_created,
    url: r.url,
  }));
} catch (err) {
  console.warn(`Reviews fetch failed (${err.message}); continuing without snippets.`);
}

const data = {
  businessName: business.name,
  rating: business.rating ?? null,
  reviewCount: business.review_count ?? 0,
  yelpUrl: business.url,
  lastUpdated: new Date().toISOString(),
  reviews,
};

writeFileSync(OUT_PATH, JSON.stringify(data, null, 2) + "\n");
console.log(
  `Wrote ${OUT_PATH}: ${data.rating} stars from ${data.reviewCount} reviews, ${data.reviews.length} snippets.`
);
```

- [ ] **Step 2: Test the guard** — run without a key:

Run: `node scripts/fetch-yelp-data.mjs; echo "exit=$?"`
Expected: prints `Missing YELP_API_KEY environment variable.` and `exit=1`.

- [ ] **Step 3: Verify** lint (script is `.mjs`, outside `src`, lint may ignore — confirm no errors) + `npx tsc --noEmit`.

- [ ] **Step 4: Commit** `feat(yelp): add Yelp data fetch script`.

---

## Task 3: `YelpReviews` section component

**Files:**
- Create: `src/components/sections/YelpReviews.tsx`

- [ ] **Step 1: Create the component** (matches existing Testimonials styling; half-star badge; graceful fallback):

```tsx
import Container from "@/components/ui/Container";
import Sparkle from "@/components/ui/Sparkle";
import Button from "@/components/ui/Button";
import yelpDataRaw from "@/data/yelp-data.json";
import type { YelpReviewData } from "@/types";

const yelpData = yelpDataRaw as unknown as YelpReviewData;

function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const pct = `${(rating / 5) * 100}%`;
  return (
    <div className="relative inline-flex" aria-label={`${rating} out of 5 stars`}>
      <div className="flex gap-1 text-secondary-200">
        {Array.from({ length: 5 }).map((_, i) => (<Star key={i} />))}
      </div>
      <div className="absolute inset-0 flex gap-1 overflow-hidden text-accent-400" style={{ width: pct }}>
        {Array.from({ length: 5 }).map((_, i) => (<Star key={i} />))}
      </div>
    </div>
  );
}

function formatDate(value: string): string {
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function YelpReviews() {
  const hasRating = yelpData.rating !== null;
  const hasReviews = yelpData.reviews.length > 0;

  return (
    <section className="bg-gradient-to-br from-secondary-100/60 via-accent-100/40 to-primary-100/60 py-20 md:py-28">
      <Container>
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-accent-600 shadow-sm">
            <Sparkle className="h-4 w-4" />
            Loved by Our Community
          </span>
          <h2 className="mt-4 text-4xl font-bold text-secondary-900 md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary-600">
            Don&apos;t just take our word for it — hear from real customers on Yelp.
          </p>

          {hasRating && (
            <a
              href={yelpData.yelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex flex-col items-center gap-1 rounded-2xl bg-white px-6 py-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="flex items-center gap-2">
                <RatingStars rating={yelpData.rating as number} />
                <span className="text-2xl font-bold text-secondary-900">{yelpData.rating}</span>
              </span>
              <span className="text-sm text-secondary-500">
                Based on {yelpData.reviewCount} reviews on Yelp
              </span>
            </a>
          )}
        </div>

        {hasReviews && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {yelpData.reviews.map((review) => (
              <div key={review.id} className="flex flex-col rounded-3xl bg-white p-8 shadow-sm shadow-secondary-200/40">
                <div className="mb-4 flex gap-1 text-accent-400">
                  {Array.from({ length: review.rating }).map((_, i) => (<Star key={i} />))}
                </div>
                <p className="mb-6 flex-1 text-secondary-700 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-secondary-100 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-300 via-accent-300 to-secondary-300 text-sm font-bold text-white">
                      {review.author.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold text-secondary-900">{review.author}</p>
                      <p className="text-sm text-secondary-500">{formatDate(review.date)}</p>
                    </div>
                  </div>
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent-600 hover:text-accent-700"
                  >
                    Yelp ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button href={yelpData.yelpUrl} variant="white" size="lg">
            {hasRating ? "See all reviews on Yelp" : "Read our reviews on Yelp"}
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

> Note: `Button` supports an `href` prop (renders an `<a>`) per its existing API.

- [ ] **Step 2: Verify** `npm run lint` + `npx tsc --noEmit`.

- [ ] **Step 3: Commit** `feat(yelp): add YelpReviews section`.

---

## Task 4: Swap into landing page + remove fake testimonials

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/data/testimonials.ts`, `src/components/sections/Testimonials.tsx`
- Modify: `src/types/index.ts` (remove `Testimonial` interface after confirming unused)

- [ ] **Step 1: Confirm no other references** — grep `testimonials` and `Testimonial` across `src/`. Only `testimonials.ts`, `Testimonials.tsx`, and `page.tsx` should appear.

- [ ] **Step 2: Edit `src/app/page.tsx`** — replace the Testimonials import + usage:

```tsx
import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import YelpReviews from "@/components/sections/YelpReviews";
import ServiceArea from "@/components/sections/ServiceArea";
import CallToAction from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <YelpReviews />
      <ServiceArea />
      <CallToAction />
    </>
  );
}
```

- [ ] **Step 3: Delete** `src/data/testimonials.ts` and `src/components/sections/Testimonials.tsx`.

- [ ] **Step 4: Remove the `Testimonial` interface** from `src/types/index.ts` (verified unused after Step 3).

- [ ] **Step 5: Verify** `npm run lint` + `npx tsc --noEmit` + `npm run build` (the fallback UI renders).

- [ ] **Step 6: Commit** `feat(yelp): replace testimonials with YelpReviews`.

---

## Task 5: GitHub Action workflow

**Files:**
- Create: `.github/workflows/update-yelp-reviews.yml`

- [ ] **Step 1: Create the workflow**:

```yaml
name: Update Yelp Reviews

on:
  schedule:
    - cron: "0 8 * * 1"
  workflow_dispatch: {}

permissions:
  contents: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Fetch latest Yelp data
        env:
          YELP_API_KEY: ${{ secrets.YELP_API_KEY }}
        run: node scripts/fetch-yelp-data.mjs

      - name: Commit if changed
        id: commit
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          if git diff --quiet -- src/data/yelp-data.json; then
            echo "changed=false" >> "$GITHUB_OUTPUT"
            echo "No Yelp data changes."
          else
            git add src/data/yelp-data.json
            git commit -m "chore(yelp): refresh reviews data"
            git push
            echo "changed=true" >> "$GITHUB_OUTPUT"
          fi

      - name: Build and deploy
        if: steps.commit.outputs.changed == 'true'
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
        run: |
          npm run build
          npx firebase deploy --only hosting
```

- [ ] **Step 2: Verify** `npx tsc --noEmit` (workflow YAML isn't type-checked, but ensure nothing broke) + `npm run lint`.

- [ ] **Step 3: Commit** `ci(yelp): add weekly Yelp reviews update workflow`.

---

## Task 6: Final verification + deploy + push

- [ ] **Step 1:** `npm run lint` → clean.
- [ ] **Step 2:** `npx tsc --noEmit` → exit 0.
- [ ] **Step 3:** `npm run build` → succeeds; confirm `YelpReviews` is in the bundle.
- [ ] **Step 4:** `firebase deploy --only hosting` → release complete.
- [ ] **Step 5:** `git push origin main` → publishes the workflow to GitHub (Action activates on default branch; does NOT auto-run until secrets are set + manual trigger).
- [ ] **Step 6:** Report the two secrets the user must add (`YELP_API_KEY`, `FIREBASE_TOKEN`) before real Yelp data appears.
