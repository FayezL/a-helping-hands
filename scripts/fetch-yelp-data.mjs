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
