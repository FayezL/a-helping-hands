"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { isAcceptingRequests } from "@/lib/db/settings";
import Container from "@/components/ui/Container";
import Sparkle from "@/components/ui/Sparkle";
import BookingForm from "@/components/forms/BookingForm";
import { BUSINESS_PHONE, BUSINESS_PHONE_RAW, BUSINESS_EMAIL } from "@/data/constants";

function BookContent() {
  const searchParams = useSearchParams();
  const [accepting, setAccepting] = useState<boolean>(true);

  useEffect(() => {
    isAcceptingRequests().then((result) => {
      if (!result) setAccepting(false);
    });
  }, []);

  const defaultServiceType = searchParams.get("service") || undefined;

  return (
    <>
      <section className="bg-gradient-to-br from-secondary-100 via-accent-100 to-primary-100 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-accent-600 shadow-sm backdrop-blur-sm">
              <Sparkle className="h-4 w-4" />
              Free, No-Obligation Quote
            </span>
            <h1 className="mt-4 text-4xl font-bold text-secondary-900 md:text-5xl">
              Request a Free Quote
            </h1>
            <p className="mt-5 text-lg text-secondary-700">
              Fill out the form below and we&apos;ll get back to you with a
              personalized quote for your home.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            {accepting ? (
              <div className="rounded-3xl bg-white p-8 shadow-lg shadow-secondary-200/40 md:p-10">
                <BookingForm defaultServiceType={defaultServiceType} />
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-10 text-center shadow-lg shadow-secondary-200/40">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-200 to-accent-200">
                  <svg
                    className="h-10 w-10 text-accent-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-secondary-900">
                  We&apos;re Currently Booked Up
                </h2>
                <p className="mx-auto mt-3 max-w-md text-secondary-600">
                  Thank you for your interest! We are temporarily not accepting
                  new requests. Please check back soon or contact us directly.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <a
                    href={`tel:${BUSINESS_PHONE_RAW}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-400 via-accent-400 to-secondary-400 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {BUSINESS_PHONE}
                  </a>
                  <a
                    href={`mailto:${BUSINESS_EMAIL}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary-200 px-6 py-3 font-semibold text-secondary-700 transition-colors hover:border-accent-300 hover:text-accent-600"
                  >
                    {BUSINESS_EMAIL}
                  </a>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-secondary-100/60 to-primary-100/60 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-secondary-900">
              Prefer to Call?
            </h2>
            <p className="mt-3 text-secondary-600">
              Reach out directly and we&apos;ll be happy to help you schedule
              your cleaning.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <div className="flex items-center justify-center gap-3 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-200 to-accent-300">
                  <svg className="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <a
                  href={`tel:${BUSINESS_PHONE_RAW}`}
                  className="text-lg font-semibold text-secondary-900 hover:text-accent-600"
                >
                  {BUSINESS_PHONE}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary-200 to-accent-300">
                  <svg className="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="text-lg font-semibold text-secondary-900 hover:text-accent-600"
                >
                  {BUSINESS_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default function BookPageClient() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-300 border-t-accent-500" />
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
