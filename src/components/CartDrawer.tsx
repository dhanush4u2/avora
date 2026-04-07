import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { initiateRazorpayCheckout } from "@/lib/razorpay";
import { toast } from "sonner";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, totalPrice, isLoading, updateQuantity, removeItem, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [paying, setPaying] = useState(false);
  const [customer, setCustomer] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
  });

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowForm(true);
  };

  const handlePay = async () => {
    if (!customer.name || !customer.email || !customer.phone) {
      toast.error("Please fill in name, email, and phone");
      return;
    }

    setPaying(true);
    initiateRazorpayCheckout({
      items,
      totalAmount: totalPrice,
      customer,
      onSuccess: (paymentId) => {
        setPaying(false);
        clearCart();
        onClose();
        setShowForm(false);
        navigate(`/order-success?payment_id=${paymentId}`);
      },
      onFailure: (error) => {
        setPaying(false);
        if (error !== 'Payment cancelled') {
          toast.error(error);
        }
      },
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-primary border-l border-cream/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream/10">
              <h2 className="font-display text-xl text-cream tracking-wide">
                {showForm ? "Checkout" : "Your Cart"}
              </h2>
              <button onClick={() => { onClose(); setShowForm(false); }} className="text-cream/60 hover:text-cream transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items or Form */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {!showForm ? (
                items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <ShoppingBag size={48} className="text-cream/20" />
                    <p className="font-body text-cream/40 text-sm">Your cart is empty</p>
                    <button
                      onClick={onClose}
                      className="font-body text-sm text-cream/60 underline underline-offset-4 hover:text-cream transition-colors"
                    >
                      Continue shopping
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {items.map((item) => {
                      const image = item.product.node.images?.edges?.[0]?.node;
                      return (
                        <li key={item.variantId} className="flex gap-4">
                          <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                            {image ? (
                              <img src={image.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-cream/5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-display text-sm text-cream tracking-wide">{item.product.node.title}</p>
                                {item.selectedOptions.length > 0 && item.variantTitle !== "Default Title" && (
                                  <p className="font-body text-xs text-cream/40 mt-0.5">
                                    {item.selectedOptions.map(o => o.value).join(' · ')}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => removeItem(item.variantId)}
                                className="text-cream/30 hover:text-cream/70 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-cream/20">
                                <button
                                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="w-8 text-center font-body text-cream text-xs">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <p className="font-display text-sm text-cream">
                                {item.price.currencyCode === 'INR' ? '₹' : item.price.currencyCode}{' '}
                                {(parseFloat(item.price.amount) * item.quantity).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )
              ) : (
                /* Checkout Form */
                <div className="space-y-4">
                  <p className="font-body text-xs text-cream/50 mb-2">Fill in your details to complete purchase</p>
                  {[
                    { key: 'name', label: 'Full Name', required: true },
                    { key: 'email', label: 'Email', type: 'email', required: true },
                    { key: 'phone', label: 'Phone', type: 'tel', required: true },
                    { key: 'address', label: 'Address' },
                    { key: 'city', label: 'City' },
                    { key: 'state', label: 'State' },
                    { key: 'pincode', label: 'Pincode' },
                  ].map(({ key, label, type, required }) => (
                    <div key={key}>
                      <label className="font-body text-xs text-cream/50 tracking-wide block mb-1">
                        {label} {required && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        type={type || 'text'}
                        value={(customer as any)[key]}
                        onChange={e => setCustomer(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full bg-cream/5 border border-cream/15 text-cream font-body text-sm px-3 py-2.5 focus:outline-none focus:border-cream/40 transition-colors"
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream/10 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-cream/60 tracking-wide">Subtotal</span>
                  <span className="font-display text-lg text-cream">
                    ₹ {totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="font-body text-xs text-cream/40">
                  Shipping & taxes calculated at checkout
                </p>

                {!showForm ? (
                  <motion.button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-cream text-primary text-center font-body text-sm tracking-widest font-medium transition-all duration-300 hover:bg-cream/90 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    Pre-Order Now
                  </motion.button>
                ) : (
                  <div className="space-y-2">
                    <motion.button
                      onClick={handlePay}
                      disabled={paying}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-cream text-primary text-center font-body text-sm tracking-widest font-medium transition-all duration-300 hover:bg-cream/90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {paying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay Now"}
                    </motion.button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="w-full py-3 font-body text-xs text-cream/50 tracking-wide hover:text-cream/80 transition-colors"
                    >
                      ← Back to cart
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
