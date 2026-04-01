import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import heroProduct from "@/assets/hero-bg.jpg";


  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-primary" ref={ref}>
      {/* Image area - takes up ~60% */}
      <div className="relative flex-1 min-h-[55vh]">
        <img
          src={heroProduct}
          alt="Avora matcha product"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 70%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary" />
      </div>

      {/* Text area - below image */}
      <div className="relative z-10 flex items-center justify-center px-6 pb-16 -mt-20 text-center">
        <div className="container mx-auto relative">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
            <AnimatePresence>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.4, y: "30%" }}
                  animate={{
                    y: "70%",
                    opacity: [0, p.opacity, p.opacity, 0],
                    scale: [0.4, 1, 0.6],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: [0.25, 0.1, 0.25, 1] as const,
                  }}
                  className="absolute block rounded-full shadow-[0_0_4px_rgba(132,204,22,0.4)]"
                  style={{
                    left: `${p.x}%`,
                    width: p.size,
                    height: p.size,
                    backgroundColor: `hsl(100 ${35 + Math.random() * 20}% ${40 + Math.random() * 15}%)`,
                  }}
                />
              ))}
            </AnimatePresence>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-tight tracking-wide relative z-10 cursor-default"
            whileHover={{
              textShadow: "0 0 20px rgba(234,222,200,0.6), 0 0 40px rgba(234,222,200,0.3), 0 0 60px rgba(234,222,200,0.15)",
            }}
          >
            Experience the{" "}
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
                Shop now
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
