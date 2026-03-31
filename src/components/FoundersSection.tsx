import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import brewingImg from "@/assets/brewing.jpg";

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="bg-primary" ref={ref}>
      {/* Image with "Founders' note" text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative w-full overflow-hidden"
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
        <div className="absolute inset-0 bg-primary/30" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 left-8 md:top-12 md:left-12 font-display text-4xl md:text-6xl text-cream font-light italic"
        >
          Founders' note
        </motion.h2>
      </motion.div>

      {/* Read our story button below */}
      <div className="py-16 md:py-24 flex justify-center">
        <Link to="/founders">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
          >
            Read our story
          </motion.span>
        </Link>
      </div>
    </section>
  );
};

export default FoundersSection;
