import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Loader2 } from "lucide-react";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, isLoading: cartLoading, getCheckoutUrl } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) {
          setProduct(data.data.product);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (handle) fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cream/40 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-4">
        <p className="font-display text-2xl text-cream tracking-wide">Product not found</p>
        <Link to="/shop" className="font-body text-sm text-cream/60 underline underline-offset-4 hover:text-cream transition-colors">
          Back to shop
        </Link>
      </div>
    );
  }

  const images = product.images.edges;
  const variant = product.variants.edges[0]?.node;
  const price = variant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!variant) return;
    const shopifyProduct: ShopifyProduct = { node: product };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart`);
  };

  const handleBuyNow = async () => {
    if (!variant) return;
    const shopifyProduct: ShopifyProduct = { node: product };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    const checkoutUrl = useCartStore.getState().getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Left — Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="aspect-square overflow-hidden mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-cream/5 flex items-center justify-center">
                    <span className="font-body text-cream/20">No image</span>
                  </div>
                )}
              </motion.div>

              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === i ? "border-cream" : "border-cream/20 hover:border-cream/50"
                      }`}
                    >
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right — Product info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col"
            >
              <h1 className="font-display text-3xl md:text-4xl text-cream font-light tracking-wide">
                {product.title}
              </h1>

              <p className="font-display text-2xl text-cream mt-6">
                {price.currencyCode === 'INR' ? '₹' : price.currencyCode}{' '}
                {parseFloat(price.amount).toLocaleString('en-IN')}
              </p>

              {/* Description */}
              {product.description && (
                <div className="mt-8 border-t border-cream/10 pt-8">
                  <p className="font-body text-cream/70 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              )}

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
                onClick={handleAddToCart}
                disabled={cartLoading}
                whileHover={{ scale: 1.02, backgroundColor: "hsl(36 50% 94% / 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full py-4 border border-cream/40 font-body text-sm tracking-widest text-cream hover:border-cream transition-all duration-500 disabled:opacity-50"
              >
                {cartLoading ? "Adding..." : "Add to cart"}
              </motion.button>

              <motion.button
                onClick={handleBuyNow}
                disabled={cartLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 w-full py-4 bg-cream text-primary font-body text-sm tracking-widest font-medium transition-all duration-300 disabled:opacity-50"
              >
                {cartLoading ? "Processing..." : "Buy now"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
