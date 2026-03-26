import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import productDisplay from "@/assets/product-display.jpg";
import matchaLatte from "@/assets/matcha-latte.jpg";

const ShopSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="shop" className="py-24 md:py-36 bg-primary" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Product showcase */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={productDisplay}
              alt="Avora matcha products"
              loading="lazy"
              width={1200}
              height={800}
              className="w-full rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h2 className="font-display text-4xl md:text-5xl text-cream font-light mb-6 leading-tight">
              Ceremonial grade,
              <br />
              <span className="italic font-semibold">everyday ritual</span>
            </h2>
            <a
              href="#"
              className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
            >
              Shop now
            </a>
          </motion.div>
        </div>

        {/* Grass section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-2 md:order-1"
          >
            <h3 className="font-display text-3xl md:text-4xl text-cream font-light mb-4 leading-snug">
              If your matcha tastes like grass,{" "}
              <span className="italic">pause.</span>
            </h3>
            <p className="font-body text-cream/70 text-base mb-8 leading-relaxed">
              It's time to relearn the art of making it properly.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {["Measure matcha", "Heat water", "Whisk gently", "Enjoy mindfully"].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="border border-cream/20 rounded-lg p-5 hover:border-cream/40 transition-colors duration-300"
                >
                  <span className="font-display text-xs text-cream/50 block mb-1">0{i + 1}</span>
                  <span className="font-body text-sm text-cream">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 md:order-2"
          >
            <img
              src={matchaLatte}
              alt="Matcha latte"
              loading="lazy"
              width={800}
              height={1000}
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
