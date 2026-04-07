import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  CartItem,
  ShopifyProduct,
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  fetchShopifyCart,
} from '@/lib/shopify';

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
  totalItems: number;
  totalPrice: number;
}

function calcTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((s, i) => s + i.quantity, 0),
    totalPrice: items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0),
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,
      totalItems: 0,
      totalPrice: 0,

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existing = items.find(i => i.variantId === item.variantId);

        set({ isLoading: true });
        try {
          if (!cartId) {
            const result = await createShopifyCart({ ...item, lineId: null });
            if (result) {
              const newItems = [{ ...item, lineId: result.lineId }];
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: newItems,
                ...calcTotals(newItems),
              });
            }
          } else if (existing) {
            const newQuantity = existing.quantity + item.quantity;
            if (!existing.lineId) {
              console.error('Cannot update quantity for item without lineId');
              return;
            }
            const result = await updateShopifyCartLine(cartId, existing.lineId, newQuantity);
            if (result.success) {
              const updated = get().items.map(i =>
                i.variantId === item.variantId ? { ...i, quantity: newQuantity } : i
              );
              set({ items: updated, ...calcTotals(updated) });
            } else if (result.cartNotFound) {
              clearCart();
            }
          } else {
            const result = await addLineToShopifyCart(cartId, { ...item, lineId: null });
            if (result.success) {
              const updated = [...get().items, { ...item, lineId: result.lineId ?? null }];
              set({ items: updated, ...calcTotals(updated) });
            } else if (result.cartNotFound) {
              clearCart();
            }
          }
        } catch (error) {
          console.error('Failed to add item:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }

        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            const updated = get().items.map(i =>
              i.variantId === variantId ? { ...i, quantity } : i
            );
            set({ items: updated, ...calcTotals(updated) });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error('Failed to update quantity:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const updated = get().items.filter(i => i.variantId !== variantId);
            if (updated.length === 0) {
              clearCart();
            } else {
              set({ items: updated, ...calcTotals(updated) });
            }
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error('Failed to remove item:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null, totalItems: 0, totalPrice: 0 }),

      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;

        set({ isSyncing: true });
        try {
          const result = await fetchShopifyCart(cartId);
          if (!result.exists) clearCart();
        } catch (error) {
          console.error('Failed to sync cart:', error);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'avora-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);

export type { CartItem, ShopifyProduct };
