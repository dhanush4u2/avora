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
      {/* Full-width product image with shop CTA */}
      <div className="relative group overflow-hidden">
        <motion.img
          src={productDisplay}
          alt="Avora matcha products"
          loading="lazy"
          width={1920}
          height={800}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 1 }}
          className="w-full h-[60vh] md:h-[70vh] object-cover"
        />
      </div>

      {/* Matcha latte banner */}
      <div className="relative group overflow-hidden">
        <motion.img
          src={matchaLatte}
          alt="Matcha preparation"
          loading="lazy"
          width={1920}
          height={600}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full h-[50vh] md:h-[60vh] object-cover"
        />
      </div>
    </section>
  );
};

export default ShopSection;
