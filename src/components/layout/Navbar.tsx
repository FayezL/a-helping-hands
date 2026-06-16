"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Sparkle from "@/components/ui/Sparkle";
import { NAV_LINKS, BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_PHONE_RAW } from "@/data/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md shadow-secondary-200/30"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary-300 via-accent-300 to-primary-300">
            <Sparkle className="h-5 w-5 text-white" />
          </span>
          <span className="font-script text-2xl leading-none text-accent-600">
            {BUSINESS_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Get a Quote" ? (
              <Link
                key={link.href}
                href={link.href}
                className="ml-2 rounded-full bg-gradient-to-r from-primary-400 via-accent-400 to-secondary-400 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent-300/40"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 font-medium text-secondary-700 transition-colors hover:bg-secondary-50 hover:text-accent-600"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <a
          href={`tel:${BUSINESS_PHONE_RAW}`}
          className="hidden items-center gap-2 rounded-full border-2 border-secondary-200 px-4 py-2 text-sm font-semibold text-secondary-700 transition-colors hover:border-accent-300 hover:text-accent-600 lg:flex"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          Call Now
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-secondary-700 transition-colors hover:bg-secondary-50 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-secondary-100 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={
                    link.label === "Get a Quote"
                      ? "rounded-full bg-gradient-to-r from-primary-400 via-accent-400 to-secondary-400 px-4 py-2.5 text-center font-semibold text-white"
                      : "rounded-full px-4 py-2.5 font-medium text-secondary-700 hover:bg-secondary-50"
                  }
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${BUSINESS_PHONE_RAW}`}
                className="mt-2 rounded-full border-2 border-secondary-200 px-4 py-2.5 text-center font-semibold text-secondary-700"
              >
                {BUSINESS_PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
