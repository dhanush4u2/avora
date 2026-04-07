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
      <div className="flex flex-col md:flex-row items-center py-12 md:py-16 md:pl-12 lg:pl-16 md:pr-0">
        {/* Left: Text + button */}
        <div className="w-full md:w-[30%] flex flex-col justify-center items-end text-right px-8 md:px-10 lg:px-14 py-16 md:py-20">
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

        {/* Right: Image flush to right edge with left gradient fade */}
        <div className="relative w-full md:w-[70%]" style={{ marginLeft: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="w-full rounded-l-3xl overflow-hidden bg-primary md:rounded-r-none"
          >
            <img
              src={matchaLatte}
              alt="Avora matcha model"
              loading="lazy"
              className="w-[120%] h-auto -ml-[10%] object-contain"
            />
          </motion.div>
          {/* Gradient fade on left edge */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
