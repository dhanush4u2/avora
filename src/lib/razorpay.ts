import { supabase } from '@/integrations/supabase/client';
import type { CartItem } from '@/lib/shopify';

const RAZORPAY_KEY_ID = 'rzp_live_SafIgGObqegDTg';

interface RazorpayOrder {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface CheckoutOptions {
  items: CartItem[];
  totalAmount: number;
  customer?: CustomerDetails;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

async function createRazorpayOrder(amount: number, items: CartItem[]): Promise<RazorpayOrder> {
  const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
    body: {
      amount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        itemCount: items.length,
        source: 'avoramatcha.com',
      },
    },
  });

  if (error) throw new Error(`Order creation failed: ${error.message}`);
  if (data?.error) throw new Error(data.error);
  return data as RazorpayOrder;
}

async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  orderDetails: {
    items: Array<{ variantId: string; quantity: number; price: string }>;
    totalAmount: string;
    customer?: CustomerDetails;
  }
) {
  const { data, error } = await supabase.functions.invoke('verify-payment', {
    body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails },
  });

  if (error) throw new Error(`Verification failed: ${error.message}`);
  if (data?.error) throw new Error(data.error);
  return data;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initiateRazorpayCheckout({ items, totalAmount, customer, onSuccess, onFailure }: CheckoutOptions) {
  try {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      onFailure('Failed to load payment gateway');
      return;
    }

    const order = await createRazorpayOrder(totalAmount, items);

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Avora Matcha',
      description: `Order of ${items.length} item${items.length > 1 ? 's' : ''}`,
      order_id: order.orderId,
      ...(customer ? {
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
      } : {}),
      theme: {
        color: '#2D3B2D',
      },
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        try {
          const result = await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            {
              items: items.map(i => ({
                variantId: i.variantId,
                quantity: i.quantity,
                price: i.price.amount,
              })),
              totalAmount: totalAmount.toString(),
              customer,
            }
          );

          if (result.verified) {
            onSuccess(response.razorpay_payment_id);
          } else {
            onFailure('Payment verification failed');
          }
        } catch (err: any) {
          onFailure(err.message || 'Payment verification failed');
        }
      },
      modal: {
        ondismiss: () => {
          onFailure('Payment cancelled');
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      onFailure(response.error?.description || 'Payment failed');
    });
    rzp.open();
  } catch (err: any) {
    onFailure(err.message || 'Failed to initiate payment');
  }
}
