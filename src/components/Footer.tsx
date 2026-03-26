import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-4xl text-cream font-semibold mb-4"
            >
              avora
            </motion.h3>
            <p className="font-display text-cream/60 text-lg italic">
              Experience the eternal high
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-body text-xs tracking-widest text-cream/40 mb-6">Navigate</h4>
            <ul className="space-y-3">
              {["Home", "Founder's note", "Shop"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm text-cream/70 hover:text-cream transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-widest text-cream/40 mb-6">Get in touch</h4>
            <ul className="space-y-3 font-body text-sm text-cream/70">
              <li>
                <a href="mailto:care@avoramatcha.com" className="hover:text-cream transition-colors duration-300">
                  care@avoramatcha.com
                </a>
              </li>
              <li>Refunds &amp; returns</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/40">
            © 2026 Neo Amara LLP. All rights reserved.
          </p>
          <p className="font-display text-sm text-cream/30 italic">
            Experience the eternal high
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
