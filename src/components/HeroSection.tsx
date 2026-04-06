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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"]);

  // Text appears as you scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [0, 0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.08, 0.2], [40, 40, 0]);

  // Image blurs as text appears
  const blur = useTransform(scrollYProgress, [0, 0.08, 0.22], [0, 0, 5]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.08, 0.22], [0, 0, 0.35]);

  useMotionValueEvent(blur, "change", (v) => setBlurValue(v));

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden bg-primary">
      {/* Image area — original aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <motion.img
          src={heroProduct}
          alt="Avora matcha product"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "62% 80%",
            y: heroY,
            filter: `blur(${blurValue}px)`,
          }}
        />
        {/* Dark overlay for text readability */}
        <motion.div
          className="absolute inset-0 bg-primary"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary" />
      </div>

      {/* Text area - below image, scroll-revealed */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pb-16 -mt-20 text-center">
        <motion.div
          className="container mx-auto relative"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-tight tracking-wide relative z-10 cursor-default">
            Experience the
            <br />
            <TypewriterText text="eternal high" />
          </h1>

          <div className="mt-5 relative z-10">
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
