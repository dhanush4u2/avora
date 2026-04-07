import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, ShopifyProduct } from '@/lib/shopify';

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: Omit<CartItem, 'lineId'>) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
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
      isLoading: false,
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const { items } = get();
        const existing = items.find(i => i.variantId === item.variantId);

        let updated: CartItem[];
        if (existing) {
          updated = items.map(i =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          updated = [...items, { ...item, lineId: null }];
        }

        set({ items: updated, ...calcTotals(updated) });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        const updated = get().items.map(i =>
          i.variantId === variantId ? { ...i, quantity } : i
        );
        set({ items: updated, ...calcTotals(updated) });
      },

      removeItem: (variantId) => {
        const updated = get().items.filter(i => i.variantId !== variantId);
        if (updated.length === 0) {
          set({ items: [], totalItems: 0, totalPrice: 0 });
        } else {
          set({ items: updated, ...calcTotals(updated) });
        }
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'avora-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, totalItems: state.totalItems, totalPrice: state.totalPrice }),
    }
  )
);

export type { CartItem, ShopifyProduct };
