import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Homepage", href: "#hero" },
  { label: "Founders' note", href: "#founders" },
  { label: "Shop", href: "#shop" },
  { label: "Refund & returns", href: "/refund-policy", isRoute: true },
  { label: "Shipping policy", href: "/shipping-policy", isRoute: true },
  { label: "Privacy policy", href: "/privacy-policy", isRoute: true },
  { label: "Terms of service", href: "/terms-of-service", isRoute: true },
];

const Footer = () => {
  return (
    <footer className="bg-primary py-16 md:py-24 border-t border-cream/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display text-3xl text-cream font-semibold tracking-wide">avora</span>
            <p className="font-display text-cream/50 text-sm italic mt-3">
              Experience the eternal high
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {footerLinks.map((link) => (
              <li key={link.href}>
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                  >
                    <motion.span whileHover={{ x: 6 }} className="inline-block">
                      {link.label}
                    </motion.span>
                  </Link>
                ) : (
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 6 }}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                  </motion.a>
                )}
              </li>
            ))}
          </motion.ul>

          {/* Contact & legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <a
              href="mailto:care@avoramatcha.com"
              className="font-body text-sm text-cream/60 hover:text-cream transition-colors duration-300"
            >
              care@avoramatcha.com
            </a>
            <p className="font-body text-xs text-cream/30 mt-4">
              © 2026 Neo Amara LLP. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
