import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import brewingImg from "@/assets/brewing.jpg";

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="py-24 md:py-36 bg-primary" ref={ref}>
      <div className="container mx-auto px-6 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl text-cream font-light text-center mb-8"
        >
          Founders' note
        </motion.h2>

        <Link to="/founders">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500 mb-12"
          >
            Read our story
          </motion.span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="w-full max-w-4xl overflow-hidden rounded-lg"
        >
          <motion.img
            src={brewingImg}
            alt="Avora founders"
            loading="lazy"
            width={1200}
            height={700}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7 }}
            className="w-full h-[50vh] md:h-[60vh] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FoundersSection;
