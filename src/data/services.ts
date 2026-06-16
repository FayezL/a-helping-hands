import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "weekly-cleaning",
    name: "Weekly Cleaning",
    shortDescription:
      "Keep your home spotless all year with our most popular recurring plan.",
    fullDescription:
      "Our weekly cleaning service is perfect for busy families and professionals who want a consistently clean, fresh home. We handle all the routine cleaning so you can focus on what matters most. Same trusted cleaner, same day each week.",
    features: [
      "Dusting & wiping all surfaces",
      "Vacuuming & mopping floors",
      "Kitchen counters & appliance exteriors",
      "Bathroom sanitization",
      "Making beds & tidying rooms",
      "Trash removal",
      "Mirror & glass cleaning",
      "Same cleaner every visit",
    ],
    icon: "calendar",
  },
  {
    id: "bi-weekly-cleaning",
    name: "Bi-Weekly Cleaning",
    shortDescription:
      "The perfect balance — a fresh home every two weeks without the weekly commitment.",
    fullDescription:
      "Our bi-weekly cleaning is our most popular plan for maintaining a beautiful home. Every two weeks, we give your home a thorough top-to-bottom clean that keeps dust, grime, and clutter at bay.",
    features: [
      "Everything in Weekly Cleaning",
      "Deeper bathroom scrub",
      "Kitchen degreasing",
      "Baseboard wipe-down",
      "Furniture dusting & polishing",
      "Window sill cleaning",
      "Door & doorframe wipe",
      "Flexible scheduling",
    ],
    icon: "calendar-check",
  },
  {
    id: "monthly-cleaning",
    name: "Monthly Cleaning",
    shortDescription:
      "A thorough monthly refresh for homes that need a little extra help staying on track.",
    fullDescription:
      "Our monthly cleaning service gives your home a comprehensive deep refresh once a month. Ideal for households that maintain day-to-day tidiness but want professional attention to detail on a regular basis.",
    features: [
      "Everything in Bi-Weekly Cleaning",
      "Detailed dusting of blinds & vents",
      "Ceiling fan cleaning",
      "Light fixture wiping",
      "Inside window tracking",
      "Thorough floor care",
      "Detailed tile & grout attention",
      "Custom checklist available",
    ],
    icon: "calendar-days",
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    shortDescription:
      "A top-to-bottom deep clean that tackles built-up dirt and hard-to-reach areas.",
    fullDescription:
      "When your home needs extra attention, our deep cleaning service goes beyond the surface. We tackle built-up grime, dust in hard-to-reach places, and detail every room. Perfect for spring cleaning, post-renovation, or anytime your home needs a reset.",
    features: [
      "Everything in Monthly Cleaning",
      "Inside cabinet & drawer cleaning",
      "Baseboard scrubbing",
      "Behind & under appliances",
      "Detailed tile & grout scrubbing",
      "Door & doorframe detailing",
      "Light switch & outlet cleaning",
      "Window track deep clean",
    ],
    icon: "sparkles",
  },
  {
    id: "move-in-cleaning",
    name: "Move-In Cleaning",
    shortDescription:
      "Start fresh in your new home with a spotless, move-in ready clean.",
    fullDescription:
      "Moving into a new home? Let us make sure it's perfectly clean before you unpack a single box. Our move-in cleaning covers every corner, surface, and detail so you can settle in with total peace of mind.",
    features: [
      "Everything in Deep Cleaning",
      "Inside closet cleaning",
      "Air vent dusting",
      "Cabinet interior sanitization",
      "Shelf & drawer wiping",
      "Full surface sanitization",
      "Carpet & floor refresh",
      "Refrigerator interior (optional)",
    ],
    icon: "key",
  },
  {
    id: "move-out-cleaning",
    name: "Move-Out Cleaning",
    shortDescription:
      "Leave your old place pristine — and get your full deposit back.",
    fullDescription:
      "Our move-out cleaning ensures you leave the property in immaculate condition. Great for getting your security deposit back, impressing your landlord, or leaving a positive impression for the next occupant.",
    features: [
      "Everything in Deep Cleaning",
      "Appliance interior cleaning",
      "Cabinet & drawer wipe-out",
      "Closet & storage cleaning",
      "Garage / patio sweeping",
      "Window interior cleaning",
      "Full property sanitization",
      "Oven & fridge interior (optional)",
    ],
    icon: "truck",
  },
  {
    id: "eco-friendly-cleaning",
    name: "Eco-Friendly Cleaning",
    shortDescription:
      "A safe, green clean using non-toxic, eco-friendly products your family will love.",
    fullDescription:
      "Our eco-friendly cleaning service uses plant-based, non-toxic, and biodegradable products that are safe for your family, pets, and the planet. Get the same sparkling results without harsh chemicals. Perfect for sensitive households.",
    features: [
      "Plant-based, non-toxic products",
      "Pet & child safe",
      "Hypoallergenic options",
      "Essential oil fresh scents",
      "Reusable microfiber cloths",
      "Biodegradable supplies",
      "No harsh chemical residue",
      "Available for any service type",
    ],
    icon: "leaf",
  },
];
