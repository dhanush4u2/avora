// Cart sync is no longer needed since we use Razorpay checkout instead of Shopify cart.
// This hook is kept as a no-op to avoid breaking imports.
export function useCartSync() {
  // No-op: cart is now local-only, no Shopify sync needed
}
