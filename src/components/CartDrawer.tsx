import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-primary border-l border-cream/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream/10">
              <h2 className="font-display text-xl text-cream tracking-wide">Your Cart</h2>
              <button onClick={onClose} className="text-cream/60 hover:text-cream transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
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
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-sm text-cream tracking-wide">{item.name}</p>
                            <p className="font-body text-xs text-cream/40 mt-0.5">{item.weight}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-cream/30 hover:text-cream/70 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-cream/20">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-body text-cream text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-display text-sm text-cream">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream/10 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-cream/60 tracking-wide">Subtotal</span>
                  <span className="font-display text-lg text-cream">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="font-body text-xs text-cream/40">
                  Shipping & taxes calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full py-4 bg-cream text-primary text-center font-body text-sm tracking-widest font-medium transition-all duration-300 hover:bg-cream/90"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
