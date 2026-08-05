import { HeroSection } from "@/components/homepage/HeroSection";
import { FeaturedEvents } from "@/components/homepage/FeaturedEvents";
import { SubOrgGrid } from "@/components/homepage/SubOrgGrid";
import { TalentHighlight } from "@/components/homepage/TalentHighlight";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Testimonials } from "@/components/homepage/Testimonials";
import { CTASection } from "@/components/homepage/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedEvents />
      <SubOrgGrid />
      <TalentHighlight />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
