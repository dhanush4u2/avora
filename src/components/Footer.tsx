import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Homepage", href: "#hero" },
  { label: "Founders' Note", href: "#founders" },
  { label: "Shop", href: "#shop" },
];

const policyLinks = [
  { label: "Refund & returns", href: "/refund-policy" },
  { label: "Shipping policy", href: "/shipping-policy" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms-of-service" },
];

const LinkList = ({ links, delay }: { links: { label: string; href: string }[]; delay: number }) => (
  <motion.ul
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex flex-col gap-3"
  >
    {links.map((link) => (
      <li key={link.href}>
        {link.href.startsWith("/") ? (
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
);

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
