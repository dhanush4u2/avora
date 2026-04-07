import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import productDisplay from "@/assets/product-display.jpg";
import matchaLatte from "@/assets/matcha-latte.jpg";
import MagneticButton from "@/components/MagneticButton";

const ShopSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="shop" className="bg-primary" ref={ref}>
      <div className="relative px-4 py-6 md:px-5 md:py-8 lg:px-6 lg:py-10">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-5">
          <div className="flex justify-center">
            <motion.img
              src={productDisplay}
              alt="Avora matcha products"
              loading="lazy"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="block h-auto w-full max-w-full object-contain md:max-h-[34rem] lg:max-h-[40rem]"
            />
          </div>

          <div className="flex justify-center">
            <motion.img
              src={matchaLatte}
              alt="Matcha preparation"
              loading="lazy"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="block h-auto w-full max-w-full object-contain md:max-h-[34rem] lg:max-h-[40rem]"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center md:hidden">
          <MagneticButton strength={0.4}>
            <Link to="/product/ceremonial-matcha">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-cream text-center font-body text-[10px] leading-tight tracking-widest text-primary shadow-lg transition-all duration-500 hover:bg-cream/90"
              >
                Pre-Order
                <br />
                Now
              </motion.span>
            </Link>
          </MagneticButton>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center md:flex">
          <MagneticButton strength={0.4}>
            <Link to="/product/ceremonial-matcha" className="pointer-events-auto">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-cream text-center font-body text-[10px] leading-tight tracking-widest text-primary shadow-lg transition-all duration-500 hover:bg-cream/90 md:h-24 md:w-24"
              >
                Pre-Order
                <br />
                Now
              </motion.span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
