import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import YelpReviews from "@/components/sections/YelpReviews";
import ServiceArea from "@/components/sections/ServiceArea";
import CallToAction from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <YelpReviews />
      <ServiceArea />
      <CallToAction />
    </>
  );
}
