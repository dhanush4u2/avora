import { motion } from "framer-motion";
import heroProduct from "@/assets/hero-product.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroProduct}
          alt="Avora matcha product"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-tight tracking-wide"
        >
          Experience the
          <br />
          <span className="font-semibold italic">eternal high</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10"
        >
          <a
            href="#shop"
            className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
          >
            Shop now
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-cream/40"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
