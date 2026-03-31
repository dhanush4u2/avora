import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, ChevronLeft } from "lucide-react";
import matchaTin from "@/assets/matcha-tin.jpg";
import matchaDetail from "@/assets/matcha-detail.jpg";

const images = [matchaTin, matchaDetail];

const Shop = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-primary">
      {/* Top bar */}
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

      {/* Product section */}
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-4xl md:text-5xl text-cream font-light text-center mb-16 tracking-wide"
          >
            Shop
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Left — Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Main image */}
              <motion.div
                className="aspect-square overflow-hidden mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={images[selectedImage]}
                  alt="Avora Ceremonial Matcha"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i ? "border-cream" : "border-cream/20 hover:border-cream/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right — Product info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col"
            >
              <h1 className="font-display text-3xl md:text-4xl text-cream font-light tracking-wide">
                Ceremonial Matcha
              </h1>
              <p className="font-body text-cream/50 text-sm mt-1">30g</p>

              <p className="font-display text-2xl text-cream mt-6">
                ₹899
              </p>

              {/* Description */}
              <div className="mt-8 border-t border-cream/10 pt-8">
                <p className="font-body text-cream/70 leading-relaxed text-sm">
                  Our ceremonial matcha is vibrant green, softly aromatic and layered with umami,
                  offering a calm yet energizing experience in every sip, crafted from first harvest
                  leaves of Kyoto and Kagoshima.
                </p>
              </div>

              {/* Quantity */}
              <div className="mt-8 flex items-center gap-6">
                <span className="font-body text-sm text-cream/50 tracking-wide">Quantity</span>
                <div className="flex items-center border border-cream/20">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
                  >
                    <Minus size={14} />
                  </motion.button>
                  <span className="w-12 text-center font-body text-cream text-sm">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
                  >
                    <Plus size={14} />
                  </motion.button>
                </div>
              </div>

              {/* Add to cart */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "hsl(36 50% 94% / 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full py-4 border border-cream/40 font-body text-sm tracking-widest text-cream hover:border-cream transition-all duration-500"
              >
                Add to cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 w-full py-4 bg-cream text-primary font-body text-sm tracking-widest font-medium transition-all duration-300"
              >
                Buy now
              </motion.button>

              {/* Storage note */}
              <div className="mt-10 border-t border-cream/10 pt-6">
                <p className="font-body text-xs text-cream/40 leading-relaxed">
                  Store in a cool, dry place away from direct sunlight. Keep tin tightly sealed for freshness.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
