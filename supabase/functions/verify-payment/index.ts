const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function hmacSha256(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(key)
  const msgData = encoder.encode(message)
  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Missing payment details' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')
    if (!keySecret) {
      return new Response(JSON.stringify({ error: 'Not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify signature
    const generatedSignature = await hmacSha256(
      keySecret,
      `${razorpay_order_id}|${razorpay_payment_id}`
    )

    if (generatedSignature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Invalid signature', verified: false }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Payment verified - now create order in Shopify so Eshopbox picks it up
    let shopifyOrderId = null
    try {
      const shopifyToken = Deno.env.get('SHOPIFY_ACCESS_TOKEN')
      if (shopifyToken && orderDetails) {
        const shopifyRes = await fetch(
          'https://a0c8rs-h4.myshopify.com/admin/api/2025-07/orders.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': shopifyToken,
            },
            body: JSON.stringify({
              order: {
                line_items: orderDetails.items.map((item: { variantId: string; quantity: number; price: string }) => ({
                  variant_id: parseInt(item.variantId.split('/').pop() || '0'),
                  quantity: item.quantity,
                  price: item.price,
                })),
                financial_status: 'paid',
                transactions: [{
                  kind: 'sale',
                  status: 'success',
                  amount: orderDetails.totalAmount,
                  gateway: 'Razorpay',
                }],
                note: `Razorpay Payment ID: ${razorpay_payment_id}`,
                tags: 'razorpay,lovable-checkout',
                ...(orderDetails.customer ? {
                  customer: {
                    first_name: orderDetails.customer.name?.split(' ')[0] || '',
                    last_name: orderDetails.customer.name?.split(' ').slice(1).join(' ') || '',
                    email: orderDetails.customer.email || '',
                    phone: orderDetails.customer.phone || '',
                  },
                  shipping_address: orderDetails.customer.address ? {
                    address1: orderDetails.customer.address,
                    city: orderDetails.customer.city || '',
                    province: orderDetails.customer.state || '',
                    zip: orderDetails.customer.pincode || '',
                    country: 'India',
                  } : undefined,
                } : {}),
              },
            }),
          }
        )

        if (shopifyRes.ok) {
          const shopifyOrder = await shopifyRes.json()
          shopifyOrderId = shopifyOrder.order?.id
        } else {
          console.error('Shopify order creation failed:', await shopifyRes.text())
        }
      }
    } catch (e) {
      console.error('Shopify order sync error:', e)
    }

    return new Response(JSON.stringify({ 
      verified: true, 
      paymentId: razorpay_payment_id,
      shopifyOrderId,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
