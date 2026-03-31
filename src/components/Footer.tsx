import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-primary py-16 md:py-24 border-t border-cream/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <img
              src="https://avora-9912.myshopify.com/cdn/shop/files/top.png?v=1773050058&width=200"
              alt="Avora"
              className="h-16 mx-auto mb-4"
            />
            <p className="font-display text-cream/60 text-lg italic">
              Experience the eternal high
            </p>
          </motion.div>

          {/* Bottom */}
          <p className="font-body text-xs text-cream/40">
            © 2026 Neo Amara LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
