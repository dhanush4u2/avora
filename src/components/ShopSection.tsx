import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import productDisplay from "@/assets/product-display.jpg";
import matchaLatte from "@/assets/matcha-latte.jpg";
import MagneticButton from "@/components/MagneticButton";

const ShopSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section id="shop" className="bg-primary" ref={ref}>
      <div className="relative grid grid-cols-2 overflow-hidden h-[70vh] md:h-screen">
        {/* First vertical image with parallax */}
        <div className="relative overflow-hidden">
          <motion.img
            src={productDisplay}
            alt="Avora matcha products"
            loading="lazy"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1 }}
            style={{ y: y1 }}
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
        </div>

        {/* Second vertical image with parallax */}
        <div className="relative overflow-hidden">
          <motion.img
            src={matchaLatte}
            alt="Matcha preparation"
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ y: y2 }}
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
        </div>

        {/* Magnetic Shop button centered overlapping both images */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <MagneticButton strength={0.4}>
            <Link to="/product/ceremonial-matcha-green-tea-imperial-aaa-grade">
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
