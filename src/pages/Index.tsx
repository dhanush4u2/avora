import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ShopSection from "@/components/ShopSection";
import FoundersSection from "@/components/FoundersSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ShopSection />
      <FoundersSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Index;
