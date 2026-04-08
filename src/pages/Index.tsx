import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RedirectsSection from "@/components/RedirectsSection";
import MatchaGuideSection from "@/components/MatchaGuideSection";
import FaqSection from "@/components/FaqSection";
import StackedCard from "@/components/StackedCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      <HeroSection />
      <StackedCard index={0}>
        <AboutSection />
      </StackedCard>
      <RedirectsSection />
      <StackedCard index={1}>
        <MatchaGuideSection />
      </StackedCard>
      <StackedCard index={2}>
        <FaqSection />
      </StackedCard>
    </div>
  );
};

export default Index;
