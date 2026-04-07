import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id") || "";

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-8" />
        </motion.div>

        <h1 className="font-display text-3xl text-cream tracking-wide mb-4">
          Order Confirmed!
        </h1>

        <p className="font-body text-cream/60 text-sm leading-relaxed mb-6">
          Thank you for your order. Your payment has been successfully processed
          and your order is being prepared.
        </p>

        {paymentId && (
          <p className="font-body text-xs text-cream/40 mb-8">
            Payment ID: {paymentId}
          </p>
        )}

        <div className="space-y-3">
          <Link
            to="/shop"
            className="block w-full py-4 bg-cream text-primary font-body text-sm tracking-widest font-medium transition-all duration-300 hover:bg-cream/90"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="block w-full py-4 border border-cream/20 text-cream font-body text-sm tracking-widest transition-all duration-300 hover:border-cream/50"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
