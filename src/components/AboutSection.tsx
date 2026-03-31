import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import regionImg from "@/assets/region.jpg";
import gradeImg from "@/assets/grade.jpg";
import tastingImg from "@/assets/tasting.jpg";

const features = [
  {
    num: "01",
    title: "Region",
    image: regionImg,
    desc: "Sourced from certified organic farms, our matcha is pure, natural, and free from harmful chemicals.",
  },
  {
    num: "02",
    title: "Grade",
    image: gradeImg,
    desc: "We partner with farmers who practice sustainable agriculture, protecting the earth for future generations.",
  },
  {
    num: "03",
    title: "Tasting notes",
    image: tastingImg,
    desc: "Every cup is crafted to nourish your body and calm your mind, bringing balance to your daily ritual.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-36 bg-primary">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl text-center text-cream font-semibold mb-8"
        >
          Not your stereotypical matcha
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center text-cream/70 font-body text-base md:text-lg leading-relaxed mb-20"
        >
          Humans love putting things in boxes. Coffee is for hustle. Tea is for calm. Matcha never fit either. Real matcha is a paradox — calming yet energizing, grounding yet sharpening. It doesn't spike. It doesn't crash. It stays with you.
          <br /><br />
          Avora is built for that balance. Sustained energy without jitters or crashes, umami that feels alive, and ceremonial-grade matcha that respects its origin while fitting into real life.
        </motion.p>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-5">
                <motion.img
                  src={f.image}
                  alt={f.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
                <span className="absolute top-4 left-4 font-display text-sm text-cream/80">{f.num}</span>
              </div>
              <h3 className="font-display text-2xl text-cream mb-2">{f.title}</h3>
              <p className="font-body text-sm text-cream/60 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
