import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Sparkle from "@/components/ui/Sparkle";
import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@/data/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Ariel's Cleaning — a family-owned cleaning service proudly serving North County San Diego with care, trust, and sparkle.",
};

const values = [
  {
    icon: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z",
    name: "Heart",
    description: "We genuinely care about our clients and treat every home with love and respect.",
  },
  {
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm0-7v-5m0 0V8m0 2h.01",
    name: "Trust",
    description: "Background-checked, insured, and trained. You can feel completely at ease with our team.",
  },
  {
    icon: "M12 2l1.8 6.7L20.5 10.5l-6.7 1.8L12 19l-1.8-6.7L3.5 10.5l6.7-1.8z",
    name: "Quality",
    description: "We hold ourselves to the highest standard. If it's not perfect, we'll make it right.",
  },
  {
    icon: "M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-4.1 15.6-8.2 17.04Z",
    name: "Eco-Conscious",
    description: "We offer safe, non-toxic products that protect your family, pets, and our beautiful coast.",
  },
  {
    icon: "M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z",
    name: "Reliability",
    description: "Same trusted cleaner, same day each visit. We show up on time, every single time.",
  },
  {
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    name: "Community",
    description: "We're proud to serve and be part of the North County San Diego community we call home.",
  },
];

const stats = [
  { value: "500+", label: "Happy Homes Cleaned" },
  { value: "5★", label: "Average Rating" },
  { value: "100%", label: "Satisfaction Guarantee" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-secondary-100 via-accent-100 to-primary-100 py-20 md:py-28">
        <Container>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-accent-600 shadow-sm backdrop-blur-sm">
              <Sparkle className="h-4 w-4" />
              {BUSINESS_TAGLINE}
            </span>
            <h1 className="mt-4 text-4xl font-bold text-secondary-900 md:text-6xl">
              About {BUSINESS_NAME}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-secondary-700">
              Our story, our mission, and our heartfelt commitment to making
              your home sparkle.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="font-script text-3xl text-accent-500">Our Story</p>
              <h2 className="text-3xl font-bold text-secondary-900 md:text-4xl">
                A Family Passion for Clean Homes
              </h2>
              <p className="text-lg leading-relaxed text-secondary-600">
                {BUSINESS_NAME} began with a simple dream: to share the joy of a
                perfectly clean home with our neighbors in North County San
                Diego. What started as Ariel cleaning for friends and family has
                blossomed into a trusted, family-run business.
              </p>
              <p className="text-lg leading-relaxed text-secondary-600">
                We understand that your home is your sanctuary. That&apos;s why
                we treat every space with the warmth and care we&apos;d give our
                own. Our team is carefully chosen, thoroughly trained, and
                passionate about delivering exceptional results — every time.
              </p>
              <p className="text-lg leading-relaxed text-secondary-600">
                We believe a clean home leads to a happier, healthier life.
                Let us help you reclaim your time and enjoy the peace of mind
                that comes with a sparkling space.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-secondary-200 via-accent-200 to-primary-200 p-12">
                <Sparkle className="absolute left-6 top-6 h-12 w-12 text-white/50" />
                <Sparkle className="absolute right-8 top-10 h-8 w-8 text-white/40" />
                <Sparkle className="absolute bottom-8 left-10 h-6 w-6 text-white/40" />
                <Sparkle className="absolute bottom-12 right-6 h-10 w-10 text-white/50" />
                <div className="text-center">
                  <Sparkle className="mx-auto h-20 w-20 text-white" />
                  <p className="mt-4 font-script text-4xl text-secondary-700">
                    {BUSINESS_NAME}
                  </p>
                  <p className="mt-2 text-sm font-medium text-secondary-600">
                    {BUSINESS_TAGLINE}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-secondary-100/60 via-accent-100/40 to-primary-100/60 py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Card className="text-center">
              <p className="font-script text-3xl text-accent-500">Our Mission</p>
              <h2 className="mt-2 text-3xl font-bold text-secondary-900">
                Bringing Sparkle &amp; Peace of Mind
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-600">
                To provide reliable, thorough, and trustworthy cleaning services
                that give our clients peace of mind, more time for what matters
                most, and a home they love coming back to.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-600">
              <Sparkle className="h-4 w-4" />
              What We Stand For
            </span>
            <h2 className="mt-4 text-4xl font-bold text-secondary-900 md:text-5xl">
              Our Values
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <Card key={value.name} hover>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-200 via-accent-200 to-secondary-200 text-accent-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-secondary-900">
                    {value.name}
                  </h3>
                  <p className="text-secondary-600">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-secondary-400 via-accent-400 to-primary-400 py-16 md:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl font-bold text-white md:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-lg font-medium text-white/90">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-primary-100 via-accent-100 to-secondary-100 py-20 md:py-24">
        <Container>
          <div className="text-center">
            <p className="font-script text-3xl text-accent-500">
              Ready for a Clean Home?
            </p>
            <h2 className="mt-2 text-3xl font-bold text-secondary-900 md:text-4xl">
              Experience the {BUSINESS_NAME} Difference
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/book" variant="primary" size="lg">
                Request a Free Quote
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
