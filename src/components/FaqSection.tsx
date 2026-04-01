import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does it take for my Avora matcha to reach me?",
    a: "Orders are typically processed within 24–48 hours and delivered within 5–7 business days, depending on your location. You'll receive tracking details as soon as your order ships.",
  },
  {
    q: "Where do you ship?",
    a: "We currently ship across India. If you're outside our delivery zones, stay close—we're expanding.",
  },
  {
    q: "How should I store my matcha?",
    a: "Store Avora matcha in a cool, dry place, away from direct sunlight and moisture. Reseal tightly after use to preserve freshness and flavour.",
  },
  {
    q: "How much matcha should I use per serving?",
    a: "We recommend 1–2 teaspoons per cup, depending on how strong you like it. Start light—you can always add more.",
  },
  {
    q: "Is Avora matcha suitable for daily consumption?",
    a: "Yes. Avora matcha can be enjoyed daily as part of a balanced routine. If you're sensitive to caffeine, we suggest starting with smaller servings.",
  },
  {
    q: "Who can drink Avora matcha?",
    a: "Short answer: everyone. Long answer: dancers, boxers, yoga girls, pilates girls, founders, CEOs, night owls, early risers, women, men, and anyone in between. Avora doesn't believe in \"aesthetic-only\" wellness. If you've got a body and a brain, you're invited.",
  },
  {
    q: "Is matcha only for \"that\" kind of person?",
    a: "You know the stereotype. Linen sets. Green smoothies. Pilates at 7am. We're here to say—no. Avora matcha is for high-energy lives, creative minds, and people who want calm and drive. No labels required.",
  },
  {
    q: "What does Avora matcha make you feel like?",
    a: "Focused, steady, and quietly powerful. Think clean energy without the jitters, clarity without the crash, and a sense that you've got your day handled—even if your calendar disagrees.",
  },
  {
    q: "Is this a coffee replacement?",
    a: "It can be — if you want it to be. Many people switch to Avora matcha for smoother energy and better focus. Others keep both and choose based on the day. We're not here to start a caffeine war.",
  },
];

const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-cream/15"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-display text-lg md:text-xl text-cream group-hover:text-cream/80 transition-colors pr-4">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-cream/50 flex-shrink-0" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="font-body text-cream/60 text-sm leading-relaxed pb-6">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FaqSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 md:py-36 bg-primary" ref={ref}>
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-cream font-semibold italic mb-3">
            Frequently asked questions
          </h2>
          <p className="font-display text-cream/50 text-sm italic">
            Based on our matcha and questions around it
          </p>
        </motion.div>

        {inView && faqs.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
