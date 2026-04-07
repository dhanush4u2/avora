import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ChevronLeft } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { initiateRazorpayCheckout } from "@/lib/razorpay";
import { toast } from "sonner";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email required"),
  phone: z.string().trim().min(10, "Valid phone number required"),
  address: z.string().trim().min(5, "Address is required"),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State is required"),
  pincode: z.string().trim().min(5, "Valid pincode required"),
});

type CustomerForm = z.infer<typeof customerSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerForm, string>>>({});
  const [form, setForm] = useState<CustomerForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-4 pt-20">
        <p className="font-display text-2xl text-cream tracking-wide">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="font-body text-sm text-cream/60 underline underline-offset-4 hover:text-cream transition-colors"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  const updateField = (field: keyof CustomerForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePayment = async () => {
    const result = customerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CustomerForm, string>> = {};
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof CustomerForm;
        fieldErrors[field] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsProcessing(true);
    setErrors({});

    await initiateRazorpayCheckout({
      items,
      totalAmount: totalPrice,
      customer: result.data,
      onSuccess: (paymentId) => {
        clearCart();
        navigate(`/order-success?payment_id=${paymentId}`);
      },
      onFailure: (error) => {
        setIsProcessing(false);
        if (error !== "Payment cancelled") {
          toast.error(error);
        }
      },
    });
  };

  const inputClasses =
    "w-full bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors";

  return (
    <div className="min-h-screen bg-primary pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 font-body text-sm text-cream/50 hover:text-cream transition-colors mb-8"
        >
          <ChevronLeft size={16} /> Back
        </button>

        <h1 className="font-display text-3xl text-cream tracking-wide mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Customer Details */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="font-display text-lg text-cream tracking-wide">Contact Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" value={form.name} error={errors.name} onChange={(v) => updateField("name", v)} placeholder="John Doe" />
              <Field label="Email" value={form.email} error={errors.email} onChange={(v) => updateField("email", v)} placeholder="john@example.com" type="email" />
              <Field label="Phone" value={form.phone} error={errors.phone} onChange={(v) => updateField("phone", v)} placeholder="+91 98765 43210" type="tel" className="sm:col-span-2" />
            </div>

            <h2 className="font-display text-lg text-cream tracking-wide pt-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Address" value={form.address} error={errors.address} onChange={(v) => updateField("address", v)} placeholder="123, Street Name" className="sm:col-span-2" />
              <Field label="City" value={form.city} error={errors.city} onChange={(v) => updateField("city", v)} placeholder="Mumbai" />
              <Field label="State" value={form.state} error={errors.state} onChange={(v) => updateField("state", v)} placeholder="Maharashtra" />
              <Field label="Pincode" value={form.pincode} error={errors.pincode} onChange={(v) => updateField("pincode", v)} placeholder="400001" />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="border border-cream/10 p-6 space-y-4 sticky top-28">
              <h2 className="font-display text-lg text-cream tracking-wide">Order Summary</h2>
              <ul className="space-y-3 border-b border-cream/10 pb-4">
                {items.map((item) => (
                  <li key={item.variantId} className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-body text-sm text-cream truncate">{item.product.node.title}</p>
                      <p className="font-body text-xs text-cream/40">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-body text-sm text-cream whitespace-nowrap">
                      ₹{(parseFloat(item.price.amount) * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-cream/60">Total</span>
                <span className="font-display text-xl text-cream">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <motion.button
                onClick={handlePayment}
                disabled={isProcessing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-cream text-primary font-body text-sm tracking-widest font-medium transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  `Pay ₹${totalPrice.toLocaleString("en-IN")}`
                )}
              </motion.button>
              <p className="font-body text-xs text-cream/30 text-center">Secured by Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Field({
  label, value, error, onChange, placeholder, type = "text", className = "",
}: {
  label: string; value: string; error?: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block font-body text-xs text-cream/50 mb-1.5 tracking-wide">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
      />
      {error && <p className="font-body text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

export default Checkout;
