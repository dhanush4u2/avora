import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "@/assets/logo-cropped.png";

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "exit">("logo");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("exit"), 1800);
    const timer2 = setTimeout(() => onComplete(), 2400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-primary"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.img
          src={logo}
          alt="Avora"
          className="w-48 md:w-64"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
