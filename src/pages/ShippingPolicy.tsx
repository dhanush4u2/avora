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

const ShippingPolicy = () => {
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
            Shipping policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-cream/60 text-center text-sm mb-16"
          >
            Avora Matcha
          </motion.p>

          <motion.div initial="hidden" animate="visible" className="space-y-12">
            <motion.p custom={0} variants={fade} className="font-body text-cream/80 text-base leading-relaxed">
              We believe your matcha should arrive with care — fresh, sealed, and ready to become part of your daily ritual.
            </motion.p>

            <motion.div custom={1} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">Where we ship</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-2">
                We currently ship across India, straight to your doorstep.
              </p>
              <p className="font-body text-cream/50 text-sm italic">
                International shipping isn't available yet, but it's on our radar.
              </p>
            </motion.div>

            <motion.div custom={2} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">How long does it take?</h2>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  <span><span className="text-cream font-medium">Processing & dispatch:</span> Orders are packed and shipped within 5–7 business days</span>
                </li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  <span><span className="text-cream font-medium">Delivery time:</span> Once shipped, delivery times may vary depending on your location</span>
                </li>
              </ul>
              <p className="font-body text-cream/50 text-sm italic mt-4">
                You'll receive a tracking link by email as soon as your order is on the move.
              </p>
            </motion.div>

            <motion.div custom={3} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">Shipping charges</h2>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  Free shipping on all orders above ₹1500
                </li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2">
                  <span className="text-cream/40 mt-1">•</span>
                  Orders below ₹1500 incur a flat shipping fee of ₹50
                </li>
              </ul>
            </motion.div>

            <motion.div custom={4} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">Tracking your order</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-2">
                Once your order ships, you'll get a tracking link via email.
              </p>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                If your package seems delayed or you have questions, just reach out to us at{" "}
                <a href="mailto:care@avoramatcha.com" className="text-cream underline underline-offset-4 hover:text-cream/80 transition-colors">
                  care@avoramatcha.com
                </a>{" "}
                — we're happy to help.
              </p>
            </motion.div>

            <motion.div custom={5} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">Need help?</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">
                Write to us anytime at{" "}
                <a href="mailto:care@avoramatcha.com" className="text-cream underline underline-offset-4 hover:text-cream/80 transition-colors">
                  care@avoramatcha.com
                </a>.
              </p>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                We're here to make sure your Avora experience is smooth from checkout to cup.
              </p>
            </motion.div>

            <motion.div custom={6} variants={fade} className="border-t border-cream/10 pt-8 pb-8 text-center">
              <p className="font-display text-cream text-xl font-light italic mb-2">
                Experience the eternal high
              </p>
              <p className="font-body text-cream/60 text-sm">The Avora Team</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
