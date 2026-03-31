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

const PrivacyPolicy = () => {
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
            Privacy policy
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
              At Avora, trust is part of the ritual. This Privacy Policy explains how we collect, use, and safeguard your information when you visit www.avoramatcha.com or place an order with us.
            </motion.p>
            <motion.p custom={0} variants={fade} className="font-body text-cream/50 text-sm italic">
              By accessing or using our website, you consent to the practices described below.
            </motion.p>

            {/* 1 */}
            <motion.div custom={1} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">1. Information you share with us</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">
                When you interact with Avora, we may collect certain personal details, including:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Your name and contact information (email address, phone number)</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Shipping and billing addresses</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Payment information (processed securely through third-party payment partners)</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Order details and purchase history</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Website usage data, such as pages visited and interactions (via cookies and similar tools)</li>
              </ul>
            </motion.div>

            {/* 2 */}
            <motion.div custom={2} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">2. Why we collect this information</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">Your information helps us:</p>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Confirm, process, and deliver your orders</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Communicate updates related to your purchase or account</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Respond to customer support requests</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Improve our website, offerings, and overall experience</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Send occasional updates or brand communications (only if you opt in)</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Meet regulatory and legal requirements</li>
              </ul>
              <p className="font-body text-cream/50 text-sm italic mt-4">We do not sell, trade, or rent your personal data.</p>
            </motion.div>

            {/* 3 */}
            <motion.div custom={3} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">3. Cookies & site analytics</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">Avora uses cookies and similar technologies to:</p>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Understand how visitors use our website</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Improve site performance and usability</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Personalize content and recommendations</li>
              </ul>
              <p className="font-body text-cream/50 text-sm italic mt-4">
                You can manage or disable cookies through your browser settings, though some features of the site may be affected.
              </p>
            </motion.div>

            {/* 4 */}
            <motion.div custom={4} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">4. Trusted third-party partners</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">To operate smoothly, we work with select third-party providers for:</p>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Secure payment processing</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Shipping and logistics</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Website analytics and marketing tools</li>
              </ul>
              <p className="font-body text-cream/50 text-sm italic mt-4">
                These partners only receive information necessary to perform their services and are required to handle your data responsibly.
              </p>
            </motion.div>

            {/* 5 */}
            <motion.div custom={5} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">5. Data protection & security</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-2">
                We implement appropriate technical and organizational measures to protect your information from unauthorized access, loss, misuse, or disclosure.
              </p>
              <p className="font-body text-cream/50 text-sm italic">
                While no system is completely risk-free, we continuously work to maintain strong security standards.
              </p>
            </motion.div>

            {/* 6 */}
            <motion.div custom={6} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">6. Your choices & rights</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">You have the right to:</p>
              <ul className="space-y-2 ml-4">
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Request access to the personal data we hold about you</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Ask for corrections or deletion of your information</li>
                <li className="font-body text-cream/70 text-sm flex items-start gap-2"><span className="text-cream/40 mt-1">•</span>Opt out of promotional communications at any time via the "unsubscribe" link</li>
              </ul>
              <p className="font-body text-cream/70 text-sm mt-4">
                For any requests related to your data, contact us at{" "}
                <a href="mailto:care@avoramatcha.com" className="text-cream underline underline-offset-4 hover:text-cream/80 transition-colors">care@avoramatcha.com</a>.
              </p>
            </motion.div>

            {/* 7 */}
            <motion.div custom={7} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">7. Policy updates</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                We may update this Privacy Policy as our business evolves. Any changes will be reflected on this page, and the updated version will always be the one in effect.
              </p>
            </motion.div>

            {/* 8 */}
            <motion.div custom={8} variants={fade} className="border-t border-cream/10 pt-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">8. Legal jurisdiction</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                This Privacy Policy is governed by the laws of India. Any disputes arising in connection with this policy shall fall under the exclusive jurisdiction of Indian courts.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div custom={9} variants={fade} className="border-t border-cream/10 pt-8 pb-8">
              <h2 className="font-display text-2xl text-cream font-light mb-4">Contact us</h2>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                If you have questions, concerns, or feedback about privacy at Avora, reach out to us at:{" "}
                <a href="mailto:care@avoramatcha.com" className="text-cream underline underline-offset-4 hover:text-cream/80 transition-colors">care@avoramatcha.com</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
