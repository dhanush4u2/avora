import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import stepMeasure from "@/assets/step-measure.jpg";
import stepHeat from "@/assets/step-heat.jpg";
import stepWhisk from "@/assets/step-whisk.jpg";
import stepEnjoy from "@/assets/step-enjoy.jpg";

const steps = [
  { img: stepMeasure, label: "Measure matcha" },
  { img: stepHeat, label: "Heat water" },
  { img: stepWhisk, label: "Whisk gently" },
  { img: stepEnjoy, label: "Enjoy mindfully" },
];

const MatchaGuideSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 md:py-20 bg-primary" ref={ref}>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Left text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl text-cream font-light leading-tight"
          >
            If Your Matcha Tastes Like Grass, Pause.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-cream/60 text-lg italic"
          >
            It's time to relearn the art of making it properly.
          </motion.p>
        </div>

        {/* Right 2x2 grid */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img
                src={step.img}
                alt={step.label}
                loading="lazy"
                width={640}
                height={640}
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute bottom-3 left-4 font-body text-sm text-cream tracking-wide">
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchaGuideSection;
