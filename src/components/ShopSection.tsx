import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import productDisplay from "@/assets/product-display.jpg";
import matchaLatte from "@/assets/matcha-latte.jpg";

const ShopSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="shop" className="bg-primary" ref={ref}>
      <div className="relative grid grid-cols-2">
        {/* First vertical image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={productDisplay}
            alt="Avora matcha products"
            loading="lazy"
            width={960}
            height={1200}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1 }}
            className="w-full h-[70vh] md:h-[85vh] object-cover"
          />
        </div>

        {/* Second vertical image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={matchaLatte}
            alt="Matcha preparation"
            loading="lazy"
            width={960}
            height={1200}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full h-[70vh] md:h-[85vh] object-cover"
          />
        </div>

        {/* Shop button centered overlapping both images */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
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
