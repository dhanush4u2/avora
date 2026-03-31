import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
        <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.08, borderColor: "rgba(234,222,200,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block font-body text-sm tracking-widest text-cream border border-cream/50 px-12 py-4 hover:bg-cream/10 transition-all duration-500"
          >
            Shop
          </motion.a>
        </div>
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
        <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
          <motion.a
            href="#founders"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05, letterSpacing: "0.05em" }}
            className="font-display text-3xl md:text-5xl text-cream font-light italic transition-all duration-500"
          >
            Founders' note
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
