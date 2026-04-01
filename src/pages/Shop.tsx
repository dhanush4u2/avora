import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY } from "@/lib/shopify";
import { toast } from "sonner";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 20 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`Added ${product.node.title} to cart`);
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-4xl md:text-5xl text-cream font-light text-center mb-16 tracking-wide"
          >
            Shop
          </motion.p>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-cream/40 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-cream/60 tracking-wide">No products found</p>
              <p className="font-body text-sm text-cream/40 mt-2">Check back soon for new products.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product) => {
                const image = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;

                return (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <Link to={`/product/${product.node.handle}`}>
                      <div className="aspect-square overflow-hidden mb-4">
                        {image ? (
                          <motion.img
                            src={image.url}
                            alt={image.altText || product.node.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-cream/5 flex items-center justify-center">
                            <span className="font-body text-cream/20 text-sm">No image</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="space-y-2">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-display text-lg text-cream tracking-wide group-hover:text-cream/80 transition-colors">
                          {product.node.title}
                        </h3>
                      </Link>
                      <p className="font-display text-cream/80">
                        {price.currencyCode === 'INR' ? '₹' : price.currencyCode}{' '}
                        {parseFloat(price.amount).toLocaleString('en-IN')}
                      </p>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        disabled={cartLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 border border-cream/40 font-body text-xs tracking-widest text-cream hover:border-cream transition-all duration-500 disabled:opacity-50"
                      >
                        {cartLoading ? "Adding..." : "Add to cart"}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
