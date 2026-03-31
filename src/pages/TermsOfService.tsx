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

const Section = ({ num, title, children, i }: { num?: string; title: string; children: React.ReactNode; i: number }) => (
  <motion.div custom={i} variants={fade} className="border-t border-cream/10 pt-8">
    <h2 className="font-display text-2xl text-cream font-light mb-4">{num ? `${num}. ${title}` : title}</h2>
    {children}
  </motion.div>
);

const P = ({ children, italic }: { children: React.ReactNode; italic?: boolean }) => (
  <p className={`font-body text-sm leading-relaxed mb-2 ${italic ? "text-cream/50 italic" : "text-cream/70"}`}>{children}</p>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="font-body text-cream/70 text-sm flex items-start gap-2">
    <span className="text-cream/40 mt-1">•</span>
    <span>{children}</span>
  </li>
);

const TermsOfService = () => (
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
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-4xl md:text-5xl text-cream font-light text-center mb-4 tracking-wide">
          Terms of service
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="font-body text-cream/60 text-center text-sm mb-16">
          Avora Matcha
        </motion.p>

        <motion.div initial="hidden" animate="visible" className="space-y-12">
          <motion.div custom={0} variants={fade}>
            <P>This website is owned and operated by Avora Matcha. Throughout the site, references to "Avora," "we," "us," or "our" refer to Avora Matcha and its operators.</P>
            <P>By accessing our website (www.avoramatcha.com) or purchasing our product, you agree to be bound by the following Terms of Service, along with our Privacy Policy, Shipping Policy, and Refund Policy. If you do not agree with these terms, please do not use our website or services.</P>
          </motion.div>

          <Section num="1" title="Use of our website" i={1}>
            <P>By using this website, you confirm that:</P>
            <ul className="space-y-2 ml-4 mb-2">
              <Li>You are legally capable of entering into a binding agreement under Indian law</Li>
              <Li>You will use the site only for lawful purposes</Li>
              <Li>You will not attempt to disrupt, misuse, or compromise the security or functionality of the site</Li>
            </ul>
            <P italic>Any misuse of the website may result in restricted or terminated access.</P>
          </Section>

          <Section num="2" title="Our product" i={2}>
            <P>Avora currently offers one product: ceremonial-grade matcha powder, sold exclusively through our website.</P>
            <ul className="space-y-2 ml-4 mb-2">
              <Li>All purchases are subject to availability</Li>
              <Li>Product descriptions, images, and information are provided in good faith</Li>
              <Li>Slight variations in colour or texture may occur due to the natural nature of the product and differences in screen displays</Li>
            </ul>
            <P italic>Consumption of our product is at your discretion. Avora does not provide medical advice.</P>
          </Section>

          <Section num="3" title="Pricing & availability" i={3}>
            <ul className="space-y-2 ml-4">
              <Li>Prices listed on the website are in INR and inclusive/exclusive of taxes as specified</Li>
              <Li>Prices may change without prior notice</Li>
              <Li>We reserve the right to limit or refuse orders at our discretion, including in cases of suspected misuse or fraud</Li>
            </ul>
          </Section>

          <Section num="4" title="Orders & payments" i={4}>
            <P>By placing an order, you agree that:</P>
            <ul className="space-y-2 ml-4 mb-2">
              <Li>All billing and shipping information provided is accurate and complete</Li>
              <Li>Payments are processed securely through third-party payment gateways</Li>
              <Li>Avora reserves the right to cancel or refuse any order prior to dispatch</Li>
            </ul>
            <P italic>If an order is modified or cancelled, we will attempt to notify you using the contact details provided at checkout.</P>
          </Section>

          <Section num="5" title="Shipping & delivery" i={5}>
            <P>Shipping timelines, charges, and delivery expectations are outlined in our Shipping Policy.</P>
            <P italic>While we strive to meet estimated timelines, delays caused by logistics partners, weather, or external factors are beyond our control.</P>
          </Section>

          <Section num="6" title="Cancellations, returns & refunds" i={6}>
            <P>Our Refund & Returns Policy governs cancellations, replacements, and refunds.</P>
            <P italic>Due to the consumable nature of matcha, returns are limited and handled strictly according to the policy outlined on our website.</P>
          </Section>

          <Section num="7" title="Intellectual property" i={7}>
            <P>All content on this website — including text, visuals, logos, branding, and product descriptions — is the property of Avora Matcha.</P>
            <P italic>You may not copy, reproduce, distribute, or exploit any part of the site without prior written consent.</P>
          </Section>

          <Section num="8" title="User feedback & submissions" i={8}>
            <P>If you share feedback, suggestions, reviews, or ideas with Avora (via email, social media, or the website), you grant us permission to use them for business and marketing purposes without obligation or compensation.</P>
            <P italic>You agree not to submit content that is misleading, unlawful, abusive, or infringes on the rights of others.</P>
          </Section>

          <Section num="9" title="Third-party services & links" i={9}>
            <P>We may use or link to third-party platforms for:</P>
            <ul className="space-y-2 ml-4 mb-2">
              <Li>Payments</Li>
              <Li>Shipping and logistics</Li>
              <Li>Analytics or marketing</Li>
            </ul>
            <P italic>Avora is not responsible for the content, policies, or practices of third-party websites or services.</P>
          </Section>

          <Section num="10" title="Accuracy of information" i={10}>
            <P>We aim to ensure all information on our website is accurate and current. However, errors or omissions may occasionally occur.</P>
            <P italic>Avora reserves the right to correct any inaccuracies and cancel affected orders if required.</P>
          </Section>

          <Section num="11" title="Limitation of liability" i={11}>
            <P>Avora Matcha and its team shall not be liable for:</P>
            <ul className="space-y-2 ml-4 mb-2">
              <Li>Any indirect, incidental, or consequential damages</Li>
              <Li>Any loss arising from misuse of the product or website</Li>
              <Li>Temporary service interruptions or delays beyond our control</Li>
            </ul>
            <P italic>All products and services are provided on an "as available" basis.</P>
          </Section>

          <Section num="12" title="Indemnification" i={12}>
            <P>You agree to indemnify and hold harmless Avora Matcha from any claims, losses, or damages arising from your violation of these Terms or misuse of the website.</P>
          </Section>

          <Section num="13" title="Termination" i={13}>
            <P>We reserve the right to suspend or terminate access to our website or services at any time if these Terms are violated.</P>
            <P italic>Termination does not affect obligations incurred prior to termination.</P>
          </Section>

          <Section num="14" title="Governing law" i={14}>
            <P>These Terms of Service shall be governed by and interpreted in accordance with the laws of India. Any disputes shall fall under the exclusive jurisdiction of Indian courts.</P>
          </Section>

          <Section num="15" title="Updates to these terms" i={15}>
            <P>Avora may update these Terms periodically. Any changes will be reflected on this page and are effective immediately upon posting.</P>
            <P italic>Continued use of the website constitutes acceptance of the revised Terms.</P>
          </Section>

          <motion.div custom={16} variants={fade} className="border-t border-cream/10 pt-8 pb-8">
            <h2 className="font-display text-2xl text-cream font-light mb-4">Contact information</h2>
            <P>
              For questions or concerns related to these Terms, reach us at:{" "}
              <a href="mailto:care@avoramatcha.com" className="text-cream underline underline-offset-4 hover:text-cream/80 transition-colors">care@avoramatcha.com</a>
            </P>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default TermsOfService;
