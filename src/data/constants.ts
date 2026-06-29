export const BUSINESS_NAME = "Ariel's Cleaning";

export const BUSINESS_TAGLINE = "A Family-Owned Cleaning Service";

export const BUSINESS_PHONE = "(760) 555-0142";
export const BUSINESS_PHONE_RAW = "+17605550142";
export const BUSINESS_EMAIL = "hello@a-helping-hands.org";
export const BUSINESS_SERVICE_AREA =
  "Proudly serving North County San Diego — including Carlsbad, Encinitas, Oceanside, Vista, San Marcos, Escondido, Cardiff, Solana Beach, and surrounding communities. Contact us to confirm availability in your neighborhood.";
export const BUSINESS_HOURS =
  "Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 3:00 PM | Sunday: Closed";

export const SERVICE_TYPES = [
  "Weekly Cleaning",
  "Bi-Weekly Cleaning",
  "Monthly Cleaning",
  "Deep Cleaning",
  "Move-In Cleaning",
  "Move-Out Cleaning",
  "Eco-Friendly Cleaning",
] as const;

export const BOOKING_SOURCES = [
  "Website",
  "Phone Call",
  "Email",
  "Walk-in",
  "Referral",
  "Social Media",
  "Other",
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Get a Quote", href: "/book" },
  { label: "Contact", href: "/contact" },
] as const;
