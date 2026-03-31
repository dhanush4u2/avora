import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const shipping = totalPrice >= 500 ? 0 : 49;
  const orderTotal = totalPrice + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed! Payment gateway coming soon.");
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-6 pt-20">
        <p className="font-display text-2xl text-cream tracking-wide">Your cart is empty</p>
        <Link
          to="/shop"
          className="font-body text-sm text-cream/60 underline underline-offset-4 hover:text-cream transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-4xl md:text-5xl text-cream font-light text-center mb-16 tracking-wide"
          >
            Checkout
          </motion.p>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Left — Shipping Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Contact */}
              <div>
                <h2 className="font-display text-lg text-cream tracking-wide mb-4">Contact</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                />
              </div>

              {/* Shipping */}
              <div>
                <h2 className="font-display text-lg text-cream tracking-wide mb-4">Shipping address</h2>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    className="bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    className="bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full mt-3 bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                />
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="PIN code"
                    required
                    value={form.pincode}
                    onChange={handleChange}
                    className="bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-3 bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                />
              </div>

              {/* Place order */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-cream text-primary font-body text-sm tracking-widest font-medium transition-all duration-300"
              >
                Place order · ₹{orderTotal.toLocaleString("en-IN")}
              </motion.button>
              <p className="font-body text-xs text-cream/30 text-center">
                Payment gateway integration coming soon
              </p>
            </motion.div>

            {/* Right — Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="border border-cream/10 p-6 sticky top-28">
                <h2 className="font-display text-lg text-cream tracking-wide mb-6">Order summary</h2>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-cream text-primary rounded-full flex items-center justify-center font-body text-[10px] font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <p className="font-display text-sm text-cream">{item.name}</p>
                          <p className="font-body text-xs text-cream/40">{item.weight}</p>
                        </div>
                        <p className="font-body text-sm text-cream">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-cream/10 mt-6 pt-4 space-y-2">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-cream/50">Subtotal</span>
                    <span className="text-cream">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-cream/50">Shipping</span>
                    <span className="text-cream">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-display text-lg pt-2 border-t border-cream/10">
                    <span className="text-cream">Total</span>
                    <span className="text-cream">₹{orderTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
