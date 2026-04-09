import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-primary">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-cream/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-body text-sm text-cream/70 hover:text-cream transition-colors">
            <ChevronLeft size={16} />
            Back
          </Link>
          <Link to="/" className="font-display text-3xl font-semibold text-cream tracking-wide absolute left-1/2 -translate-x-1/2">
            avora
          </Link>
          <div className="w-16" />
        </div>
      </nav>

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl text-cream font-light text-center mb-4 tracking-wide"
          >
            Refund & returns policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-cream/60 text-center text-sm mb-16"
          >
            Avora Matcha
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Intro */}
            <motion.p custom={0} variants={fade} className="font-body text-cream/80 text-base leading-relaxed">
              At Avora, we're all about delivering calm, clarity, and quality — not just in your cup, but in your experience with us. If something isn't right with your order, we'll make it right.
            </motion.p>

            {/* No Returns */}
            <motion.div custom={1} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">No returns on matcha powder</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                Our ceremonial-grade matcha is sealed and packed fresh to preserve quality and purity. As a consumable product, we're unable to accept returns once it has been delivered, unless it arrives damaged.
              </p>
            </motion.div>

            {/* Refunds */}
            <motion.div custom={2} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">We do offer refunds or replacements for</h2>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  Orders damaged during transit
                </li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  Incorrect or incomplete orders
                </li>
              </ul>
            </motion.div>

            {/* Resolutions */}
            <motion.div custom={3} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">Refunds & resolutions</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">
                Once we review and approve your request:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  Refunds are issued to your original payment method
                </li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  Please allow 5–10 business days for the amount to reflect
                </li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  If a refund isn't possible, we'll offer a replacement or store credit
                </li>
              </ul>
              <p className="font-body text-cream/50 text-sm italic mt-4">
                We always aim for the fairest resolution.
              </p>
            </motion.div>

            {/* How to Request */}
            <motion.div custom={4} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">How to request a refund</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">
                Email us at{" "}
                <a href="mailto:care@avoramatcha.com" className="text-cream underline underline-offset-4 hover:text-cream/80 transition-colors">
                  care@avoramatcha.com
                </a>{" "}
                with:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  Your order number
                </li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  Clear photos of the issue (if applicable)
                </li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  A short description of what went wrong
                </li>
              </ul>
              <p className="font-body text-cream/50 text-sm italic mt-4">
                Our team will take it from there.
              </p>
            </motion.div>

            {/* Promise */}
            <motion.div custom={6} variants={fade} className="border-t border-cream/10 pt-8 pb-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">Our promise</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                We take quality seriously — from sourcing to sealing to shipping. If something slips, we'll own it and fix it.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
