import type { Metadata } from "next";
import { services } from "@/data/services";
import { BUSINESS_PHONE, BUSINESS_PHONE_RAW } from "@/data/constants";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Sparkle from "@/components/ui/Sparkle";

export const metadata: Metadata = {
  title: "Our Cleaning Services",
  description:
    "Weekly, bi-weekly, monthly, deep, move-in, move-out, and eco-friendly cleaning services in North County San Diego.",
};

const iconMap: Record<string, string> = {
  calendar: "M3 10h18M8 2v4M16 2v4M3 4h18v18H3z",
  "calendar-check": "M3 10h18M8 2v4M16 2v4M3 4h18v18H3zM9 16l2 2 4-4",
  "calendar-days": "M3 10h18M8 2v4M16 2v4M3 4h18v18H3zM7 14h.01M12 14h.01M17 14h.01",
  sparkles:
    "M12 2l1.8 6.7L20.5 10.5l-6.7 1.8L12 19l-1.8-6.7L3.5 10.5l6.7-1.8z",
  key: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
  truck: "M14 18V6a1 1 0 00-1-1H3a1 1 0 00-1 1v11a1 1 0 001 1h1M14 9h4l3 3v5a1 1 0 01-1 1h-1",
  leaf: "M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-4.1 15.6-8.2 17.04Z",
};

const iconBgColors: Record<string, string> = {
  calendar: "from-secondary-300 to-secondary-400",
  "calendar-check": "from-primary-300 to-primary-400",
  "calendar-days": "from-accent-300 to-accent-400",
  sparkles: "from-secondary-300 to-accent-300",
  key: "from-primary-300 to-accent-400",
  truck: "from-accent-300 to-primary-400",
  leaf: "from-secondary-400 to-accent-400",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-secondary-100 via-accent-100 to-primary-100 py-20 md:py-28">
        <Container>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-accent-600 shadow-sm backdrop-blur-sm">
              <Sparkle className="h-4 w-4" />
              Cleaning Services
            </span>
            <h1 className="mt-4 text-4xl font-bold text-secondary-900 md:text-6xl">
              Our Cleaning Services
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-secondary-700">
              Flexible plans designed for your lifestyle. From weekly upkeep to
              eco-friendly deep cleans — find the perfect fit for your home.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-8">
            {services.map((service, index) => (
              <Card key={service.id} hover>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBgColors[service.icon] ?? "from-primary-300 to-accent-400"} text-white`}
                    >
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={iconMap[service.icon] ?? iconMap.sparkles}
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-accent-500">
                        Service {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl font-bold text-secondary-900">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  <p className="leading-relaxed text-secondary-600">
                    {service.fullDescription}
                  </p>

                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-secondary-900">
                      <Sparkle className="h-5 w-5 text-accent-400" />
                      What&apos;s Included
                    </h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2.5 rounded-xl bg-secondary-50 px-3 py-2"
                        >
                          <svg
                            className="mt-0.5 h-5 w-5 shrink-0 text-accent-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm text-secondary-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button href={`/book?service=${service.id}`} variant="primary">
                      Request a Free Quote
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-primary-100 via-accent-100 to-secondary-100 py-20 md:py-24">
        <Container>
          <div className="text-center">
            <p className="font-script text-3xl text-accent-500">
              Not Sure What You Need?
            </p>
            <h2 className="mt-2 text-3xl font-bold text-secondary-900 md:text-4xl">
              We&apos;re Here to Help
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-secondary-700">
              Contact us for a free consultation and we&apos;ll recommend the
              perfect cleaning plan for your home.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" size="lg">
                Contact Us
              </Button>
              <Button
                href={`tel:${BUSINESS_PHONE_RAW}`}
                variant="outline"
                size="lg"
              >
                Call {BUSINESS_PHONE}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
