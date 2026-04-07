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

    // Verify Razorpay signature
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

    // Payment verified — create order in Shopify via Admin API
    let shopifyOrderId = null
    let shopifyOrderName = null
    try {
      const shopifyToken = Deno.env.get('SHOPIFY_ACCESS_TOKEN')
      if (shopifyToken && orderDetails) {
        const customer = orderDetails.customer || {}

        const orderPayload: Record<string, unknown> = {
          line_items: (orderDetails.items || []).map((item: { title?: string; variantId?: string; quantity: number; price: string }) => {
            const lineItem: Record<string, unknown> = {
              title: item.title || 'Product',
              price: item.price,
              quantity: item.quantity,
            }
            // Include variant_id if available for inventory tracking
            if (item.variantId) {
              const numericId = item.variantId.split('/').pop()
              if (numericId && !isNaN(Number(numericId))) {
                lineItem.variant_id = parseInt(numericId)
              }
            }
            return lineItem
          }),
          financial_status: 'paid',
          transactions: [{
            kind: 'sale',
            status: 'success',
            amount: orderDetails.totalAmount,
            gateway: 'Razorpay',
          }],
          note: `Razorpay Payment ID: ${razorpay_payment_id} | Order ID: ${razorpay_order_id}`,
          tags: 'razorpay,lovable-checkout',
          send_receipt: true,
          inventory_behaviour: 'decrement_obeying_policy',
        }

        // Add customer info
        if (customer.name || customer.email || customer.phone) {
          const nameParts = (customer.name || '').split(' ')
          orderPayload.customer = {
            first_name: nameParts[0] || '',
            last_name: nameParts.slice(1).join(' ') || '',
            email: customer.email || '',
            phone: customer.phone || '',
          }
          orderPayload.email = customer.email || ''
          orderPayload.phone = customer.phone || ''
        }

        // Add shipping address
        if (customer.address) {
          orderPayload.shipping_address = {
            first_name: (customer.name || '').split(' ')[0] || '',
            last_name: (customer.name || '').split(' ').slice(1).join(' ') || '',
            address1: customer.address,
            city: customer.city || '',
            province: customer.state || '',
            zip: customer.pincode || '',
            country: 'India',
            country_code: 'IN',
            phone: customer.phone || '',
          }
          // Copy as billing address too
          orderPayload.billing_address = orderPayload.shipping_address
        }

        console.log('Creating Shopify order:', JSON.stringify(orderPayload, null, 2))

        const shopifyRes = await fetch(
          'https://a0c8rs-h4.myshopify.com/admin/api/2024-01/orders.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': shopifyToken,
            },
            body: JSON.stringify({ order: orderPayload }),
          }
        )

        if (shopifyRes.ok) {
          const shopifyOrder = await shopifyRes.json()
          shopifyOrderId = shopifyOrder.order?.id
          shopifyOrderName = shopifyOrder.order?.name
          console.log('Shopify order created:', shopifyOrderId, shopifyOrderName)
        } else {
          const errText = await shopifyRes.text()
          console.error('Shopify order creation failed:', shopifyRes.status, errText)
        }
      }
    } catch (e) {
      console.error('Shopify order sync error:', e)
    }

    return new Response(JSON.stringify({ 
      verified: true, 
      paymentId: razorpay_payment_id,
      shopifyOrderId,
      shopifyOrderName,
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
