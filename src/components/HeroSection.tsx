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

  // Parallax on image
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  // Text fades in during 30-55% of scroll through the section
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [50, 0]);

  // Image blur & darken synced with text reveal
  const blur = useTransform(scrollYProgress, [0.15, 0.4], [0, 6]);
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 0.4]);

  useMotionValueEvent(blur, "change", (v) => setBlurValue(v));

  return (
    // Extra tall section to give scroll room for the effect
    <section id="hero" ref={sectionRef} className="relative h-[200vh]">
      {/* Sticky container — fills viewport and stays pinned */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary">
        {/* Full-viewport image */}
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

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-primary"
          style={{ opacity: overlayOpacity }}
        />

        {/* Gradient blend at bottom for transition to next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary to-transparent" />

        {/* Text & button — absolute overlay on top of image */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10"
          style={{ opacity: textOpacity, y: textY }}
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
