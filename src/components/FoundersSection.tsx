import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import TextReveal from "@/components/TextReveal";
import brewingImg from "@/assets/brewing.jpg";

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="py-24 md:py-36 bg-primary" ref={ref}>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 overflow-hidden rounded-lg"
        >
          <motion.img
            src={brewingImg}
            alt="Avora founders"
            loading="lazy"
            width={600}
            height={800}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7 }}
            className="w-full aspect-[3/4] object-cover"
          />
        </motion.div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-8">
          <TextReveal
            className="font-display text-4xl md:text-6xl text-cream font-light text-center md:text-left"
            delay={0.2}
          >
            Founders' Note
          </TextReveal>

          <Link to="/founders">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
            >
              Read our story
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
