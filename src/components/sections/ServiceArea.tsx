import Container from "@/components/ui/Container";
import Sparkle from "@/components/ui/Sparkle";
import { BUSINESS_SERVICE_AREA } from "@/data/constants";

const areas = [
  "Carlsbad",
  "Encinitas",
  "Oceanside",
  "Vista",
  "San Marcos",
  "Escondido",
  "Cardiff",
  "Solana Beach",
];

export default function ServiceArea() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-secondary-400 via-accent-400 to-primary-400 px-6 py-16 md:px-16 md:py-20">
          <div className="relative z-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkle className="h-4 w-4" />
              Serving Our Community
            </span>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Proudly Serving North County San Diego
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-white/90">
              {BUSINESS_SERVICE_AREA}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {areas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
