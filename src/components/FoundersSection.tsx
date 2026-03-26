import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import foundersImg from "@/assets/founders.jpg";

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="py-24 md:py-36 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img
              src={foundersImg}
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
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-body text-xs tracking-widest text-muted-foreground mb-4 block">
              From the founders
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-primary font-light mb-6 leading-tight">
              Founder's note
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-6">
              We didn't start Avora to sell matcha. We started it because we were tired of the noise — of wellness brands that sell aesthetics over substance, of products that promise calm but deliver hype.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed">
              Avora is our quiet rebellion. A matcha that respects its roots, tastes like it should, and fits into lives that are messy, ambitious, and real. No linen sets required.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
