import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import matchaLatte from "@/assets/matcha-latte.jpg";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";

const ShopSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="shop" className="bg-primary" ref={ref}>
      <div className="flex flex-col md:flex-row items-center py-12 md:py-16 md:pr-12 lg:pr-16">
        {/* Left: Image flush to left edge */}
        <div className="relative w-full md:flex-1 md:min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="w-full overflow-hidden bg-primary"
          >
            <img
              src={matchaLatte}
              alt="Avora matcha model"
              loading="lazy"
              className="block h-auto w-full object-contain md:mr-auto md:w-[100%] md:max-w-none md:-ml-[6%] lg:w-[104%] lg:-ml-[8%]"
            />
          </motion.div>
          <div
            className="absolute inset-y-0 right-0 w-32 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 25%, hsl(var(--primary) / 0.4) 55%, transparent 100%)',
            }}
          />
          
        </div>

        {/* Right: Text + button */}
        <div className="w-full md:w-[18rem] md:flex-none flex flex-col justify-center px-8 md:px-6 lg:px-10 py-16 md:py-20">
          <TextReveal
            className="font-display text-4xl md:text-5xl lg:text-6xl text-cream font-light leading-tight"
            delay={0.2}
          >
            Shop Avora
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <MagneticButton strength={0.4}>
              <Link to="/product/ceremonial-matcha">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
                >
                  Pre-Order Now
                </motion.span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
