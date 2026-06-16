import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/forms/ContactForm";
import Sparkle from "@/components/ui/Sparkle";
import {
  BUSINESS_PHONE,
  BUSINESS_PHONE_RAW,
  BUSINESS_EMAIL,
  BUSINESS_HOURS,
  BUSINESS_SERVICE_AREA,
} from "@/data/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ariel's Cleaning. Call, email, or send us a message — we'd love to help you with a free quote.",
};

function PhoneIcon() {
  return (
    <svg className="h-5 w-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-5 w-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-5 w-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-secondary-100 via-accent-100 to-primary-100 py-20 md:py-28">
        <Container className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-accent-600 shadow-sm backdrop-blur-sm">
            <Sparkle className="h-4 w-4" />
            Get in Touch
          </span>
          <h1 className="mt-4 text-4xl font-bold text-secondary-900 md:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-secondary-700">
            We&apos;d love to hear from you. Call, email, or send us a message —
            we&apos;re here to help.
          </p>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-5">
              <Card hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-200 to-accent-200">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Phone</h3>
                    <a
                      href={`tel:${BUSINESS_PHONE_RAW}`}
                      className="text-accent-600 transition-colors hover:text-accent-700"
                    >
                      {BUSINESS_PHONE}
                    </a>
                  </div>
                </div>
              </Card>

              <Card hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-200 to-accent-200">
                    <EmailIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Email</h3>
                    <a
                      href={`mailto:${BUSINESS_EMAIL}`}
                      className="text-accent-600 transition-colors hover:text-accent-700"
                    >
                      {BUSINESS_EMAIL}
                    </a>
                  </div>
                </div>
              </Card>

              <Card hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-200 to-primary-200">
                    <ClockIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Business Hours</h3>
                    <p className="text-secondary-600">{BUSINESS_HOURS}</p>
                  </div>
                </div>
              </Card>

              <Card hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-200 to-primary-200">
                    <MapPinIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Service Area</h3>
                    <p className="text-secondary-600">{BUSINESS_SERVICE_AREA}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-secondary-900">
                Send Us a Message
              </h2>
              <div className="rounded-3xl bg-white p-8 shadow-lg shadow-secondary-200/40">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
