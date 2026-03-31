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
    offset: ["start end", "start 0.3"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <div
      ref={ref}
      className="sticky top-0"
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{ scale, opacity, borderRadius }}
        className="relative bg-primary shadow-[0_-10px_40px_rgba(0,0,0,0.25)] overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StackedCard;
