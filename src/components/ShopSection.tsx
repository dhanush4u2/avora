import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import productDisplay from "@/assets/product-display.jpg";
import matchaLatte from "@/assets/matcha-latte.jpg";

const ShopSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="shop" className="bg-primary py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* First vertical image */}
          <div className="relative group overflow-hidden">
            <motion.img
              src={productDisplay}
              alt="Avora matcha products"
              loading="lazy"
              width={800}
              height={1200}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 1 }}
              className="w-full h-[70vh] md:h-[80vh] object-cover"
            />
          </div>

          {/* Second vertical image */}
          <div className="relative group overflow-hidden">
            <motion.img
              src={matchaLatte}
              alt="Matcha preparation"
              loading="lazy"
              width={800}
              height={1200}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full h-[70vh] md:h-[80vh] object-cover"
            />
          </div>
        </div>

        {/* Shop button below images */}
        <div className="flex justify-center mt-8">
          <Link to="/shop">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block font-body text-sm tracking-widest text-primary bg-cream px-12 py-4 shadow-lg hover:bg-cream/90 transition-all duration-500"
            >
              Shop Now
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
