import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import foundersHero from "@/assets/founders-hero.png";

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="bg-primary" ref={ref}>
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        {/* Left image — takes up roughly 55% */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="w-full md:w-[55%] overflow-hidden"
        >
          <img
            src={foundersHero}
            alt="Avora founder with matcha"
            loading="lazy"
            width={900}
            height={1100}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right text */}
        <div className="w-full md:w-[45%] flex flex-col items-center justify-center px-10 md:px-16 py-16 md:py-0">
          <Link to="/founders">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ opacity: 0.8 }}
              className="font-display text-5xl md:text-7xl text-cream font-light leading-tight underline underline-offset-8 decoration-1 cursor-pointer"
            >
              Founder's
              <br />
              Note
            </motion.h2>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
