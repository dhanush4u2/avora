import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

interface StackedCardProps {
  children: React.ReactNode;
  index: number;
}

const StackedCard = ({ children, index }: StackedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    const measure = () => setH(innerRef.current?.scrollHeight || 0);
    measure();
    const ro = new ResizeObserver(measure);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <div
      ref={ref}
      style={{ height: h ? `calc(${h}px + 100vh)` : "auto", zIndex: index + 10 }}
      className="relative"
    >
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 overflow-hidden bg-primary shadow-[0_-10px_40px_rgba(0,0,0,0.25)]"
      >
        <div ref={innerRef}>{children}</div>
      </motion.div>
    </div>
  );
};

export default StackedCard;
