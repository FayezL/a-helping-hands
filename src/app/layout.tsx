import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://a-helping-hands.org"),
  title: {
    default: "Ariel's Cleaning | Professional House Cleaning in North County San Diego",
    template: "%s | Ariel's Cleaning",
  },
  description:
    "Family-owned cleaning services in North County San Diego. Weekly, bi-weekly, monthly, deep, move-in, move-out, and eco-friendly cleaning. Request a free quote today!",
  keywords: [
    "house cleaning North County San Diego",
    "cleaning services San Diego",
    "weekly cleaning",
    "bi-weekly cleaning",
    "deep cleaning",
    "move-in cleaning",
    "move-out cleaning",
    "eco-friendly cleaning",
    "professional cleaning",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Ariel's Cleaning | Professional House Cleaning",
    description:
      "Family-owned cleaning services in North County San Diego. Request a free quote today!",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
