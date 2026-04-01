import { motion } from "framer-motion";

const words = [
  "First Harvest",
  "Kyoto",
  "Ceremonial Grade",
  "Stone Ground",
  "Umami",
  "Kagoshima",
  "Organic",
  "L-Theanine",
];

const separator = " • ";

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
  const text = words.join(separator) + separator;
  // Duplicate enough to fill screen
  const repeated = text.repeat(4);

  return (
    <div className="overflow-hidden whitespace-nowrap py-3">
      <motion.div
        animate={{ x: reverse ? ["0%", "-25%"] : ["-25%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        <span className="font-display text-sm md:text-base tracking-[0.3em] text-cream/30 uppercase">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
};

const MarqueeTicker = () => {
  return (
    <div className="bg-primary py-6 md:py-8 overflow-hidden border-y border-cream/5">
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  );
};

export default MarqueeTicker;
