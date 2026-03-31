import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import heroProduct from "@/assets/hero-product.jpg";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

let particleId = 0;

const HeroSection = () => {
  const ref = useRef(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const spawnParticles = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: 8 }, () => ({
      id: particleId++,
      x: Math.random() * 100,
      y: -5,
      size: Math.random() * 6 + 4,
      duration: Math.random() * 1.5 + 1.5,
      delay: Math.random() * 0.2,
      drift: (Math.random() - 0.5) * 30,
      opacity: Math.random() * 0.4 + 0.6,
    }));
    setParticles((prev) => [...prev.slice(-80), ...newParticles]);
  }, []);

  useEffect(() => {
    if (!isHovering) return;
    const interval = setInterval(spawnParticles, 150);
    spawnParticles();
    return () => clearInterval(interval);
  }, [isHovering, spawnParticles]);

  return (
    <section id="hero" className="bg-primary" ref={ref}>
      {/* Hero image with parallax */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <img
            src={heroProduct}
            alt="Avora matcha product"
            width={1920}
            height={1080}
            className="w-full h-[120%] object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/80" />
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-tight tracking-wide"
          >
            Experience the
            <br />
            <span className="font-semibold italic">eternal high</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10"
          >
            <Link to="/shop">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
              >
                Shop now
              </motion.span>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] h-12 bg-cream/40"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* "Experience the eternal high" text banner with matcha sprinkle */}
      <div
        ref={bannerRef}
        className="relative py-16 md:py-24 text-center overflow-hidden cursor-default"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Matcha particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: `${p.x}%`, y: "-5%", opacity: 0, scale: 0 }}
                animate={{
                  y: "110%",
                  x: `${p.x + p.drift}%`,
                  opacity: [0, p.opacity, p.opacity, 0],
                  scale: 1,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: `hsl(100 ${35 + Math.random() * 20}% ${35 + Math.random() * 15}%)`,
                  filter: "blur(0.5px)",
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-cream font-light tracking-wide relative z-10"
        >
          Experience the eternal high
        </motion.h2>
      </div>
    </section>
  );
};

export default HeroSection;
