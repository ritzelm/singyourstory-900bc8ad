import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { StepsSection } from "@/components/StepsSection";
import { AudioExamplesSection } from "@/components/AudioExamplesSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <StepsSection />
        <AudioExamplesSection />
        <ReviewsSection />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;