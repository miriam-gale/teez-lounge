// ── Payment service — single swap-point for Paystack ──────────────────────────
//
// To activate Paystack when your account is ready:
//   1. Add VITE_PAYSTACK_PUBLIC_KEY=pk_live_... to .env
//   2. Add to index.html <head>:
//        <script src="https://js.paystack.co/v1/inline.js"></script>
//   3. Replace processPayment() with the commented paystackPay() below.
//      Keep the same call signature { amount, customer, items, method }
//      and the same return shape { orderId, paymentRef, amount, customer, items, method }.

// ── ID generators ──────────────────────────────────────────────────────────────

export function generateOrderId() {
  const ts   = Date.now().toString(36).toUpperCase().slice(-6)
  const rand = Math.floor(Math.random() * 9000 + 1000)
  return `TL-${ts}-${rand}`
}

export function generatePaymentRef(method = 'card') {
  const prefix = {
    'mtn-momo':  'MTN',
    telecel:     'TCL',
    airteltigo:  'ATG',
    visa:        'VSA',
    mastercard:  'MSC',
  }[method] ?? 'PAY'
  const ts   = Date.now().toString().slice(-8)
  const rand = String(Math.floor(Math.random() * 9000 + 1000))
  return `${prefix}-${ts}-${rand}`
}

// ── Method labels (shared with OrderSuccess page) ──────────────────────────────

export const METHOD_LABELS = {
  'mtn-momo':  'MTN Mobile Money',
  telecel:     'Telecel Cash',
  airteltigo:  'AirtelTigo Money',
  visa:        'Visa',
  mastercard:  'Mastercard',
}

// ── Simulated payment (production-ready) ───────────────────────────────────────
// Mimics real gateway latency (2.2–3s) and a realistic 5% decline rate.
// Replace with paystackPay() below when going live.

export async function processPayment({ amount, customer, items, method }) {
  await new Promise((r) => setTimeout(r, 2200 + Math.random() * 800))

  if (Math.random() < 0.05) {
    throw new Error('Payment declined. Please check your details and try again.')
  }

  return {
    orderId:    generateOrderId(),
    paymentRef: generatePaymentRef(method),
    amount,
    customer,
    items,
    method,
    timestamp:  new Date().toISOString(),
  }
}

// ── Paystack drop-in ───────────────────────────────────────────────────────────
// Uncomment and export when Paystack account is active:
//
// export function processPayment({ amount, customer, items, method }) {
//   return new Promise((resolve, reject) => {
//     const ref = generateOrderId()
//     const handler = PaystackPop.setup({
//       key:      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
//       email:    `${customer.phone.replace(/[\s-]/g, '')}@teezlounge.com`,
//       amount:   amount * 100,   // pesewas (GHS = 100 pesewas)
//       currency: 'GHS',
//       ref,
//       metadata: { customer, items, method },
//       onClose:  () => reject(new Error('Payment cancelled')),
//       callback: (response) => resolve({
//         orderId:    response.reference,
//         paymentRef: response.transaction,
//         amount, customer, items, method,
//       }),
//     })
//     handler.openIframe()
//   })
// }

// ── WhatsApp order message builder ─────────────────────────────────────────────

export function buildWhatsAppMessage({ customer, items, subtotal, deliveryFee, total }) {
  const itemLines = items.map(
    (i) => `  • ${i.name} × ${i.quantity}  —  ₵${i.price * i.quantity}`
  )

  return [
    'Hello Teez Lounge! 🍽️',
    '',
    '*New Order Request*',
    '━━━━━━━━━━━━━━',
    `👤 Name:     ${customer.name}`,
    `📱 Phone:    ${customer.phone}`,
    `📍 Address:  ${customer.address}`,
    customer.landmark ? `📌 Landmark: ${customer.landmark}` : null,
    customer.notes    ? `📝 Notes:    ${customer.notes}`    : null,
    '',
    '*Order Items:*',
    ...itemLines,
    '',
    '━━━━━━━━━━━━━━',
    `Subtotal:  ₵${subtotal}`,
    `Delivery:  ₵${deliveryFee}`,
    `*Total:    ₵${total}*`,
    '',
    '_Please confirm my order. Thank you!_ 🙏',
  ]
    .filter((l) => l !== null)
    .join('\n')
}
