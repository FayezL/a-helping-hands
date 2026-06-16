import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Sparkle from "@/components/ui/Sparkle";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </svg>
  ),
  "calendar-check": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M3 10h18M8 2v4M16 2v4M9 16l2 2 4-4" />
    </svg>
  ),
  "calendar-days": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M3 10h18M8 2v4M16 2v4M7 14h.01M12 14h.01M17 14h.01M7 18h.01M12 18h.01" />
    </svg>
  ),
  sparkles: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l1.8 6.7L20.5 10.5l-6.7 1.8L12 19l-1.8-6.7L3.5 10.5l6.7-1.8z" />
    </svg>
  ),
  key: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M10.7 12.3L21 2m-4 4l3 3M15 7l3 3" />
    </svg>
  ),
  truck: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a1 1 0 00-1-1H3a1 1 0 00-1 1v11a1 1 0 001 1h1" />
      <path d="M14 9h4l3 3v5a1 1 0 01-1 1h-1" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  leaf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-4.1 15.6-8.2 17.04Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  ),
};

const iconColors = [
  "from-secondary-300 to-secondary-400 text-white",
  "from-primary-300 to-primary-400 text-white",
  "from-accent-300 to-accent-400 text-white",
  "from-secondary-300 to-accent-300 text-white",
  "from-primary-300 to-accent-400 text-white",
  "from-accent-300 to-primary-400 text-white",
  "from-secondary-400 to-accent-400 text-white",
];

export default function ServicesOverview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-600">
            <Sparkle className="h-4 w-4" />
            What We Offer
          </span>
          <h2 className="mt-4 text-4xl font-bold text-secondary-900 md:text-5xl">
            Our Cleaning Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary-600">
            Flexible plans tailored to your home and schedule. Whether you need
            weekly upkeep or a one-time deep clean, we&apos;ve got you covered.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={service.id} hover>
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${iconColors[index % iconColors.length]}`}
              >
                {iconMap[service.icon] ?? iconMap.sparkles}
              </div>
              <h3 className="mb-2 text-xl font-bold text-secondary-900">
                {service.name}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-secondary-600">
                {service.shortDescription}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-700"
              >
                Learn More
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
