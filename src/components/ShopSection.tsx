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
      <div className="relative grid grid-cols-2 items-center gap-3 overflow-hidden px-3 py-6 md:gap-4 md:px-4 md:py-8 lg:px-6 lg:py-10">
        <div className="flex min-h-[16rem] items-center justify-center md:min-h-[24rem] lg:min-h-[32rem]">
          <motion.img
            src={productDisplay}
            alt="Avora matcha products"
            loading="lazy"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex min-h-[16rem] items-center justify-center md:min-h-[24rem] lg:min-h-[32rem]">
          <motion.img
            src={matchaLatte}
            alt="Matcha preparation"
            loading="lazy"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
          <MagneticButton strength={0.4}>
            <Link to="/product/ceremonial-matcha" className="pointer-events-auto">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full font-body text-[10px] tracking-widest text-primary bg-cream shadow-lg hover:bg-cream/90 transition-all duration-500 text-center leading-tight"
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
