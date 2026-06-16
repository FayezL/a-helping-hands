import Container from "@/components/ui/Container";
import Sparkle from "@/components/ui/Sparkle";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
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
            Don&apos;t just take our word for it — hear from the families who
            trust us with their homes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col rounded-3xl bg-white p-8 shadow-sm shadow-secondary-200/40"
            >
              <div className="mb-4 flex gap-1 text-accent-400">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 flex-1 text-secondary-700 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-secondary-100 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-300 via-accent-300 to-secondary-300 text-sm font-bold text-white">
                  {testimonial.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-secondary-900">{testimonial.name}</p>
                  <p className="text-sm text-secondary-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
