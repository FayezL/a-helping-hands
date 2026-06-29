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
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      <div
        className="absolute inset-0 flex gap-1 overflow-hidden text-accent-400"
        style={{ width: pct }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} />
        ))}
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
              <div
                key={review.id}
                className="flex flex-col rounded-3xl bg-white p-8 shadow-sm shadow-secondary-200/40"
              >
                <div className="mb-4 flex gap-1 text-accent-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} />
                  ))}
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
