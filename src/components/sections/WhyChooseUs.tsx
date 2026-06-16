import Container from "@/components/ui/Container";
import Sparkle from "@/components/ui/Sparkle";

const features = [
  {
    title: "Family-Owned & Trusted",
    description:
      "We're a local, family-run business that treats every client like a neighbor. You'll always know who's cleaning your home.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    title: "Attention to Every Detail",
    description:
      "We don't cut corners — we clean them. From baseboards to ceiling fans, no detail goes unnoticed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Eco-Friendly Options",
    description:
      "We offer plant-based, non-toxic cleaning products that are safe for your family, pets, and the planet.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-4.1 15.6-8.2 17.04Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
  },
  {
    title: "Reliable & Consistent",
    description:
      "Same trusted cleaner, same day each visit. We show up on time, every time — that's our promise to you.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Fully Vetted Team",
    description:
      "Every member of our team is background-checked, trained, and insured. Your home is in safe, caring hands.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Satisfaction Guaranteed",
    description:
      "If something isn't perfect, we'll come back and make it right. Your happiness is our top priority.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-white to-secondary-50/50 py-20 md:py-28">
      <Container>
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-600">
            <Sparkle className="h-4 w-4" />
            Why Families Choose Us
          </span>
          <h2 className="mt-4 text-4xl font-bold text-secondary-900 md:text-5xl">
            More Than Just a Clean Home
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary-600">
            We bring warmth, trust, and sparkle to every home we serve in North
            County San Diego.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl bg-white p-8 shadow-sm shadow-secondary-200/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent-200/30 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-200 via-accent-200 to-secondary-200 text-accent-600 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-secondary-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-secondary-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
