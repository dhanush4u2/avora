import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StackedCardProps {
  children: React.ReactNode;
  index: number;
}

const StackedCard = ({ children, index }: StackedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <div ref={ref} className="relative" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{ y, scale, opacity, borderRadius }}
        className="relative bg-primary shadow-[0_-8px_30px_rgba(0,0,0,0.2)] overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StackedCard;
