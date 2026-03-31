import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import brewingImg from "@/assets/brewing.jpg";
import matchaLatte from "@/assets/matcha-latte.jpg";
import regionImg from "@/assets/region.jpg";
import gradeImg from "@/assets/grade.jpg";

const steps = [
  { title: "Measure matcha", image: matchaLatte },
  { title: "Heat water", image: regionImg },
  { title: "Whisk gently", image: brewingImg },
  { title: "Enjoy mindfully", image: gradeImg },
];

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="py-24 md:py-36 bg-primary" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Grass section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-cream font-semibold mb-4 leading-tight">
            If your matcha tastes like grass,{" "}
            <span className="italic">pause.</span>
          </h2>
          <p className="font-display text-cream/60 text-lg italic">
            It's time to relearn the art of making it properly.
          </p>
        </motion.div>

        {/* Step cards with images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  width={600}
                  height={600}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/5 transition-colors duration-500" />
              </div>
              <h4 className="font-display text-lg text-cream text-center">{step.title}</h4>
            </motion.div>
          ))}
        </div>

        {/* Founder's note content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src={brewingImg}
              alt="Avora founders"
              loading="lazy"
              width={800}
              height={600}
              className="w-full rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="font-body text-xs tracking-widest text-cream/40 mb-4 block">
              From the founders
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-cream font-light mb-6 leading-tight">
              Founder's note
            </h2>
            <p className="font-body text-cream/70 text-base leading-relaxed mb-6">
              We didn't start Avora to sell matcha. We started it because we were tired of the noise — of wellness brands that sell aesthetics over substance, of products that promise calm but deliver hype.
            </p>
            <p className="font-body text-cream/70 text-base leading-relaxed">
              Avora is our quiet rebellion. A matcha that respects its roots, tastes like it should, and fits into lives that are messy, ambitious, and real. No linen sets required.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
