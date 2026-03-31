import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import foundersPortrait from "@/assets/founders-portrait.jpg";
import foundersMatcha from "@/assets/founders-matcha.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" },
  }),
};

const Founders = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-primary">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-cream/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-body text-sm text-cream/70 hover:text-cream transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </Link>
          <Link
            to="/"
            className="font-display text-3xl font-semibold text-cream tracking-wide absolute left-1/2 -translate-x-1/2"
          >
            avora
          </Link>
          <div className="w-16" />
        </div>
      </nav>

      {/* Hero image */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.img
          src={foundersPortrait}
          alt="Avora founders Shruti and Elishia"
          className="w-full h-full object-cover"
          style={{ y: heroY }}
          width={1200}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-12 left-0 right-0 text-center"
        >
          <h1 className="font-display text-5xl md:text-7xl text-cream font-light tracking-wide">
            Founders' note
          </h1>
        </motion.div>
      </div>

      {/* Story content */}
      <div className="container mx-auto px-6 py-20 md:py-28 max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-body text-cream/80 text-lg md:text-xl leading-relaxed"
          >
            For many, matcha feels like a moment — a trend that travelled from
            Japan alongside Studio Ghibli films, anime, and a wave of cultural
            fascination. Beautiful, yes. But fleeting.
          </motion.p>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="font-display text-cream text-2xl md:text-3xl font-light italic"
          >
            For Shruti, matcha was never a trend. It was transformational.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="font-body text-cream/80 text-lg md:text-xl leading-relaxed"
          >
            Shruti moves through life with the energy of a sprinter and the
            stamina of a marathon runner. She's the kind of person who can't sit
            still — driven by an internal fire and fuelled by big dreams. As a
            certified yoga instructor, a software engineer, a model, and the
            founder of Sahai, a non-profit mental health organisation, she needed
            something that could keep up with her pace without slowing her down.
          </motion.p>
        </motion.div>

        {/* Styled contrast block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="my-16 md:my-24 border-l-2 border-cream/30 pl-8 md:pl-12 space-y-4"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-body text-cream/60 text-lg leading-relaxed"
          >
            Coffee made her jittery, followed by an inevitable crash.
          </motion.p>
          <motion.p
            custom={1}
            variants={fadeUp}
            className="font-body text-cream/60 text-lg leading-relaxed"
          >
            Tea was calming, but too gentle.
          </motion.p>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="font-display text-cream text-xl md:text-2xl font-light"
          >
            And then came matcha.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-body text-cream/80 text-lg md:text-xl leading-relaxed"
          >
            Matcha met her exactly where she was. A steady rise. Sustained
            energy. Focus without frenzy. Power without burnout. Cup after cup,
            it supported her active lifestyle, sharpened her mind, and grounded
            her body. And once it became part of her rhythm, it stayed.
          </motion.p>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="font-body text-cream/80 text-lg md:text-xl leading-relaxed"
          >
            As with everything Shruti believes in deeply, she couldn't keep this
            discovery to herself.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="font-body text-cream/80 text-lg md:text-xl leading-relaxed"
          >
            She saw matcha not just as a drink, but as a quiet ally — one that
            could support a CEO powering through long days, a dancer moving
            through rehearsals, or anyone who cares about their health, energy,
            and inner balance. She believed matcha deserved a place in everyday
            life, without elitism, without stereotypes.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="font-display text-cream text-2xl md:text-3xl font-light italic"
          >
            That belief became Avora Matcha.
          </motion.p>
        </motion.div>
      </div>

      {/* Full-width image break */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <motion.img
          src={foundersMatcha}
          alt="Matcha preparation"
          loading="lazy"
          width={1200}
          height={1400}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Second half of story */}
      <div className="container mx-auto px-6 py-20 md:py-28 max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-body text-cream/80 text-lg md:text-xl leading-relaxed"
          >
            Avora truly came alive when Shruti met a kindred spirit — Elishia. A
            marketer by day, a devoted matcha lover by heart, and an unwavering
            believer in Shruti's vision. Drawn to the passion, the purpose, and
            the possibility, Elishia joined Shruti as a partner on this journey.
          </motion.p>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="font-display text-cream text-2xl md:text-3xl font-light text-center my-16"
          >
            Together, they built Avora on one simple truth:
            <br />
            <span className="italic">Matcha is for everyone.</span>
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="font-body text-cream/80 text-lg md:text-xl leading-relaxed"
          >
            No labels. No archetypes. Just the best quality matcha, meant to help
            you feel your best, live fully, and show up as yourself — whatever
            that looks like.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="font-body text-cream/80 text-lg md:text-xl leading-relaxed"
          >
            We're so excited for you to try Avora. Here's to better energy,
            better rituals, and better days — one cup at a time.
          </motion.p>
        </motion.div>

        {/* Sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="font-display text-cream text-xl font-light italic mb-2">
            With love & matcha,
          </p>
          <p className="font-display text-cream text-2xl tracking-wide">
            Shruti & Elishia
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            to="/shop"
            className="inline-block font-body text-sm tracking-widest text-cream border border-cream/40 px-10 py-4 hover:bg-cream/10 transition-all duration-500"
          >
            Shop Avora
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Founders;
