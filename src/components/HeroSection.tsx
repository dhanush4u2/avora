import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  const sectionRef = useRef(null);
  const [blurValue, setBlurValue] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const blur = useTransform(scrollYProgress, [0.015, 0.12], [0, 5]);
  const overlayOpacity = useTransform(scrollYProgress, [0.015, 0.12], [0, 0.38]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setShowOverlay(value > 0.015);
  });

  useMotionValueEvent(blur, "change", (value) => setBlurValue(value));

  return (
    <section id="hero" ref={sectionRef} className="relative h-[145vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary">
        <motion.div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ y: heroY, filter: `blur(${blurValue}px)` }}
        >
          <img
            src={heroProduct}
            alt="Avora matcha product"
            className="min-w-[1400px] min-h-full w-full h-auto object-cover pointer-events-none select-none"
            style={{ objectPosition: "62% 80%" }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-primary"
          style={{ opacity: overlayOpacity }}
        />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary to-transparent" />

        <motion.div
          initial={false}
          animate={showOverlay ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
            },
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-tight tracking-wide cursor-default">
            Experience the
            <br />
            <TypewriterText text="eternal high" />
          </h1>

          <div className="mt-5">
            <Link to="/product/ceremonial-matcha-green-tea-imperial-aaa-grade">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block font-body text-xs tracking-widest text-cream border border-cream/40 px-7 py-2.5 hover:bg-cream/10 transition-all duration-500"
              >
                Pre-Order Now
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
