import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import foundersHero from "@/assets/founders-page.png";
import foundersProduct from "@/assets/foundersProduct.jpg";
import foundersMatcha from "@/assets/founders-matcha.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease },
  }),
};

// You can adjust this value to move the background image on mobile screens
// (e.g., '10% 20%', '10% 30%', or pixels like '10% calc(50% + 80px)')
// Changing the second value (Y-axis) towards 0% brings it down, towards 100% pushes it up.
const mobileBgPosition = '20% 50%';

const Founders = () => {
  return (
    <div className="min-h-screen bg-primary">
      <style>{`
        .hero-bg-mobile-shift {
          background-position: ${mobileBgPosition};
          top: 20vh; /* Pulls the image down physically */
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 20%);
        }
        @media (min-width: 768px) {
          .hero-bg-mobile-shift {
            background-position: center center !important;
            top: 0 !important;
            -webkit-mask-image: none !important;
            mask-image: none !important;
          }
        }
      `}</style>

      {/* Premium Hero Section with Background Image */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover hero-bg-mobile-shift"
            style={{
              backgroundImage: `url(${foundersProduct})`,
              backgroundSize: 'cover',
            }}
          />
          {/* Gradient Overlays for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-primary/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/90" />
        </motion.div>

        {/* Hero Content - Split Layout */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="max-w-4xl">
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-7xl lg:text-8xl text-cream font-light leading-[0.95] tracking-tight"
              >
                Founders'
                <br />
                <span className="font-extralight">Note</span>
              </motion.h1>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-16 lg:mt-20 flex items-center gap-4"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="font-body text-xs tracking-[0.2em] text-cream/60 uppercase">
                    Scroll to read
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-cream/60"
                  >
                    <path
                      d="M12 5v14M5 12l7 7 7-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Founder Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center order-first lg:order-none"
            >
              {/* Portrait Container */}
              <div className="relative group w-full flex justify-center">
                {/* Ambient Glow Effect */}
                <div className="absolute inset-0 bg-cream/8 blur-3xl scale-110 group-hover:bg-cream/12 transition-all duration-700" />
                
                {/* Image Container with Drop Shadow */}
                <div 
                  className="relative overflow-hidden w-full flex justify-center"
                  style={{
                    filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.6)) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4))',
                  }}
                >
                  {/* Portrait Image - Clean and Larger */}
                  <motion.img
                    src={foundersHero}
                    alt="Founder - Shruti"
                    className="relative w-4/5 md:w-full max-w-sm md:max-w-xl lg:max-w-2xl h-auto object-cover"
                    style={{
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.3) 95%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.3) 95%, rgba(0,0,0,0) 100%)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Vignette Edge Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary to-transparent" />
        </div>
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
            className="font-body text-cream/80 text-base md:text-lg leading-relaxed"
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
            className="font-body text-cream/80 text-base md:text-lg leading-relaxed"
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
            className="font-body text-cream/60 text-base leading-relaxed"
          >
            Coffee made her jittery, followed by an inevitable crash.
          </motion.p>
          <motion.p
            custom={1}
            variants={fadeUp}
            className="font-body text-cream/60 text-base leading-relaxed"
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
            className="font-body text-cream/80 text-base md:text-lg leading-relaxed"
          >
            Matcha met her exactly where she was. A steady rise. Sustained
            energy. Focus without frenzy. Power without burnout. Cup after cup,
            it supported her active lifestyle, sharpened her mind, and grounded
            her body. And once it became part of her rhythm, it stayed.
          </motion.p>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="font-body text-cream/80 text-base md:text-lg leading-relaxed"
          >
            As with everything Shruti believes in deeply, she couldn't keep this
            discovery to herself.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="font-body text-cream/80 text-base md:text-lg leading-relaxed"
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
        className="w-full overflow-hidden flex justify-center"
      >
        <motion.img
          src={foundersMatcha}
          alt="Matcha preparation"
          loading="lazy"
          width={1200}
          height={1400}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.7 }}
          className="max-w-full h-auto"
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
            className="font-body text-cream/80 text-base md:text-lg leading-relaxed"
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
            className="font-body text-cream/80 text-base md:text-lg leading-relaxed"
          >
            No labels. No archetypes. Just the best quality matcha, meant to help
            you feel your best, live fully, and show up as yourself — whatever
            that looks like.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="font-body text-cream/80 text-base md:text-lg leading-relaxed"
          >
            We're so excited for you to try Avora — just really good matcha that gives you a high that lasts.
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
