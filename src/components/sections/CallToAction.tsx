import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Sparkle from "@/components/ui/Sparkle";
import { BUSINESS_NAME, BUSINESS_PHONE_RAW } from "@/data/constants";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-br from-primary-100 via-accent-100 to-secondary-100 py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white px-6 py-16 text-center shadow-xl shadow-accent-200/30 md:px-16 md:py-20">
          <Sparkle className="absolute left-8 top-8 h-8 w-8 text-primary-200" />
          <Sparkle className="absolute right-8 top-12 h-6 w-6 text-accent-200" />
          <Sparkle className="absolute bottom-8 left-12 h-5 w-5 text-secondary-200" />
          <Sparkle className="absolute bottom-12 right-10 h-7 w-7 text-primary-200" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="font-script text-3xl text-accent-500">
              Ready to Sparkle?
            </p>
            <h2 className="mt-2 text-4xl font-bold text-secondary-900 md:text-5xl">
              Let&apos;s Make Your Home Shine
            </h2>
            <p className="mt-5 text-lg text-secondary-600">
              Get a free, no-obligation quote from {BUSINESS_NAME} today.
              Our friendly team is ready to help you enjoy a cleaner, happier
              home.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/book" variant="primary" size="lg">
                Request a Free Quote
              </Button>
              <Button
                href={`tel:${BUSINESS_PHONE_RAW}`}
                variant="outline"
                size="lg"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
