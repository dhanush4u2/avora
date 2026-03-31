import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ShopSection from "@/components/ShopSection";
import FoundersSection from "@/components/FoundersSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import StackedCard from "@/components/StackedCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      <HeroSection />
      <StackedCard index={0}>
        <AboutSection />
      </StackedCard>
      <StackedCard index={1}>
        <ShopSection />
      </StackedCard>
      <StackedCard index={2}>
        <FoundersSection />
      </StackedCard>
      <StackedCard index={3}>
        <FaqSection />
      </StackedCard>
      <div className="relative" style={{ zIndex: 50 }}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
