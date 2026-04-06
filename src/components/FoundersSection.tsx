import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import TextReveal from "@/components/TextReveal";
import foundersImg from "@/assets/founders-note.jpg";

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="bg-primary py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="w-full md:w-1/2"
          >
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src={foundersImg}
                alt="Avora founder"
                loading="lazy"
                width={800}
                height={1200}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Text content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
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
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
