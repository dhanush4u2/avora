import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import TextReveal from "@/components/TextReveal";
import foundersImg from "@/assets/founders-note.jpg";

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="bg-primary" ref={ref}>
      <div className="flex flex-col md:flex-row items-center py-12 md:py-16 md:pl-12 lg:pl-16">
        {/* Left: Text + button */}
        <div className="w-full md:w-[18rem] md:flex-none flex flex-col justify-center items-end text-right px-8 md:px-6 lg:px-10 py-16 md:py-20">
          <TextReveal
            className="font-display text-4xl md:text-5xl lg:text-6xl text-cream font-light leading-tight"
            delay={0.2}
          >
            Founders' Note
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <Link to="/founders">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
              >
                Read our story
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Right: Image flush to right edge, cropped from left */}
        <div className="relative w-full md:flex-1 md:min-w-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="w-full overflow-hidden bg-primary"
          >
            <img
              src={foundersImg}
              alt="Avora founder"
              loading="lazy"
              className="block h-auto w-full object-contain md:ml-auto md:w-[108%] md:max-w-none lg:w-[112%]"
            />
          </motion.div>
          {/* Gradient fade on left edge */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
