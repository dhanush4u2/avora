import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroProduct from "@/assets/hero-bg.jpg";

const TypewriterText = ({ text }: { text: string }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const chars = text.split("");
  const typeSpeed = 80;
  const pauseDuration = 2500;
  const totalChars = chars.length;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      let count = 0;
      const type = () => {
        count++;
        setVisibleCount(count);
        if (count < totalChars) {
          timeout = setTimeout(type, typeSpeed);
        } else {
          setShowCursor(false);
          timeout = setTimeout(erase, pauseDuration);
        }
      };
      const erase = () => {
        count--;
        setVisibleCount(count);
        if (count > 0) {
          timeout = setTimeout(erase, 40);
        } else {
          timeout = setTimeout(cycle, 500);
          setShowCursor(true);
        }
      };
      timeout = setTimeout(type, typeSpeed);
    };
    const initial = setTimeout(cycle, 1300);
    return () => { clearTimeout(initial); clearTimeout(timeout); };
  }, [totalChars]);

  return (
    <span className="font-semibold italic inline-block align-bottom">
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: i < visibleCount ? 1 : 0,
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
      {showCursor && <span className="inline-block w-[3px] h-[0.8em] bg-cream ml-1 align-baseline animate-[pulse_0.8s_ease-in-out_infinite]" />}
    </span>
  );
};

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-primary">
      {/* Image area */}
      <div className="relative flex-1 min-h-[55vh] overflow-hidden">
        <motion.img
          src={heroProduct}
          alt="Avora matcha product"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover scale-110"
          style={{ objectPosition: "62% 80%", y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary" />
      </div>

      {/* Text area - below image */}
      <div className="relative z-10 flex items-center justify-center px-6 pb-16 -mt-20 text-center">
        <div className="container mx-auto relative">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-tight tracking-wide relative z-10 cursor-default"
            whileHover={{
              textShadow: "0 0 20px rgba(234,222,200,0.6), 0 0 40px rgba(234,222,200,0.3), 0 0 60px rgba(234,222,200,0.15)",
            }}
          >
            Experience the
            <br />
            <TypewriterText text="eternal high" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-5 relative z-10"
          >
            <Link to="/shop">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block font-body text-xs tracking-widest text-cream border border-cream/40 px-7 py-2.5 hover:bg-cream/10 transition-all duration-500"
              >
                Pre-order Now!
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
