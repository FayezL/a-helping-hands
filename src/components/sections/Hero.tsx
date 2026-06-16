"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Sparkle from "@/components/ui/Sparkle";
import { BUSINESS_PHONE_RAW, BUSINESS_SERVICE_AREA } from "@/data/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary-100 via-accent-100 to-primary-100">
      <div className="absolute inset-0">
        <Sparkle className="absolute left-[8%] top-[20%] h-8 w-8 text-accent-300/50" />
        <Sparkle className="absolute right-[10%] top-[15%] h-6 w-6 text-primary-300/50" />
        <Sparkle className="absolute left-[15%] bottom-[25%] h-5 w-5 text-secondary-300/50" />
        <Sparkle className="absolute right-[20%] bottom-[20%] h-10 w-10 text-accent-300/40" />
        <Sparkle className="absolute right-[5%] top-[50%] h-7 w-7 text-primary-300/40" />
      </div>

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-secondary-300/30 to-transparent blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-primary-300/30 to-transparent blur-3xl" />

      <Container className="relative z-10 py-20 md:py-32 lg:py-36">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.span
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 text-sm font-medium text-accent-600 shadow-sm backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkle className="h-4 w-4 text-accent-400" />
            {BUSINESS_SERVICE_AREA.split("—")[0].trim()}
          </motion.span>

          <motion.p
            className="font-script text-3xl text-accent-500 sm:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A Cleaner Home, A Happier You
          </motion.p>

          <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-tight text-secondary-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Professional Cleaning
            <br />
            <span className="text-gradient">You Can Trust</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-secondary-700 sm:text-xl">
            Family-owned and proudly serving North County San Diego. From weekly
            upkeep to deep cleans and eco-friendly options — we treat your home
            like our own.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/book" variant="primary" size="lg">
              Request a Free Quote
            </Button>
            <Button
              href={`tel:${BUSINESS_PHONE_RAW}`}
              variant="white"
              size="lg"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call Now
            </Button>
          </div>

          <motion.div
            className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { icon: "heart", label: "Family-Owned" },
              { icon: "leaf", label: "Eco-Friendly Options" },
              { icon: "shield", label: "Trusted & Vetted" },
              { icon: "star", label: "5-Star Rated" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm font-medium text-secondary-700">
                <Sparkle className="h-4 w-4 text-accent-400" />
                {item.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
