import Link from "next/link";
import Sparkle from "@/components/ui/Sparkle";
import {
  BUSINESS_NAME,
  BUSINESS_TAGLINE,
  BUSINESS_PHONE,
  BUSINESS_PHONE_RAW,
  BUSINESS_EMAIL,
  BUSINESS_HOURS,
  BUSINESS_SERVICE_AREA,
} from "@/data/constants";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Get a Quote", href: "/book" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-secondary-800 via-secondary-800 to-accent-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Sparkle className="h-5 w-5 text-white" />
              </span>
              <span className="font-script text-3xl leading-none text-white">
                {BUSINESS_NAME}
              </span>
            </div>
            <p className="mt-4 text-sm text-secondary-200">
              {BUSINESS_TAGLINE}. Professional, eco-conscious residential cleaning
              services in North County San Diego. Let us make your home sparkle.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold">Get in Touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-secondary-200">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href={`tel:${BUSINESS_PHONE_RAW}`} className="transition-colors hover:text-white">
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${BUSINESS_EMAIL}`} className="transition-colors hover:text-white">
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 shrink-0 mt-0.5 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {BUSINESS_HOURS}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-secondary-300">
            &copy; {new Date().getFullYear()} {BUSINESS_NAME}. {BUSINESS_SERVICE_AREA.split("—")[0].trim()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
