import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, ChevronUp, Loader2, AlertCircle, CreditCard, MessageCircle,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { processPayment, buildWhatsAppMessage } from '../services/payment'
import { createOrder } from '../services/orderService'
import { site } from '../data/site'
import { img } from '../data/images'
import FoodPlaceholder from '../components/ui/FoodPlaceholder'
import PageHeader from '../components/ui/PageHeader'

// ── Payment options ─────────────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: 'mtn-momo',   label: 'MTN Mobile Money', tag: 'MoMo',       color: '#FFC107' },
  { id: 'telecel',    label: 'Telecel Cash',      tag: 'Telecel',    color: '#E53935' },
  { id: 'airteltigo', label: 'AirtelTigo Money',  tag: 'AirtelTigo', color: '#C62828' },
  { id: 'visa',       label: 'Visa',              tag: 'VISA',       color: '#1A237E' },
  { id: 'mastercard', label: 'Mastercard',         tag: 'MC',         color: '#B71C1C' },
]

// ── Field wrapper ───────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (hasError) =>
  `w-full rounded-xl border px-4 py-3 text-sm text-ink placeholder-muted/60 outline-none transition-colors focus:ring-2 ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-beige focus:border-gold focus:ring-gold/20'
  }`

// ── Main component ──────────────────────────────────────────────────────────────
export default function Checkout() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    if (items.length === 0) navigate('/menu', { replace: true })
  }, []) // eslint-disable-line

  const [form, setForm] = useState({
    name: '', phone: '', address: '', landmark: '', notes: '',
  })
  const [errors, setErrors]           = useState({})
  const [paymentMethod, setPayment]   = useState('mtn-momo')
  const [submitting, setSubmitting]   = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required'
    } else {
      const stripped = form.phone.replace(/[\s\-()]/g, '')
      if (!/^(\+233|0)\d{9}$/.test(stripped))
        e.phone = 'Enter a valid Ghana phone number (e.g. 059 896 0027)'
    }
    if (!form.address.trim()) e.address = 'Delivery address is required'
    return e
  }

  function scrollToFirstError(errs) {
    const firstKey = Object.keys(errs)[0]
    document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // ── Pay with Mobile Money / Card ─────────────────────────────────────────────
  async function handlePay(e) {
    if (e?.preventDefault) e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); scrollToFirstError(errs); return }

    setSubmitting(true)
    try {
      const customer = { ...form }
      const result = await processPayment({
        amount:   total,
        customer,
        items:    items.map((i) => ({ ...i })),
        method:   paymentMethod,
      })

      try {
        await createOrder({
          orderId:       result.orderId,
          customer,
          items:         items.map((i) => ({ ...i })),
          paymentMethod,
          paymentRef:    result.paymentRef,
          subtotal,
          deliveryFee,
          total,
        })
      } catch (dbErr) {
        console.error('Order save failed:', dbErr)
        alert(JSON.stringify(dbErr, null, 2))
      }

      showToast('Payment successful! Preparing your order…', 'success')
      clearCart()
      navigate('/order-success', {
        state: { ...result, subtotal, deliveryFee },
      })
    } catch (err) {
      showToast(err.message, 'error')
      setSubmitting(false)
    }
  }

  // ── Order via WhatsApp ────────────────────────────────────────────────────────
  function handleWhatsApp() {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); scrollToFirstError(errs); return }

    const message = buildWhatsAppMessage({ customer: form, items, subtotal, deliveryFee, total })
    const url = `https://wa.me/${site.whatsappRaw}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    showToast('Opening WhatsApp with your order details…', 'info')
  }

  if (items.length === 0) return null

  return (
    <div className="min-h-screen bg-cream pt-20 pb-16">
      <PageHeader
        eyebrow="Almost there"
        title="Checkout"
        subtitle="Fill in your delivery details and choose how to pay."
      />

      <div className="section-pad container-tight mt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* ── LEFT: Form ───────────────────────────────────────────────────── */}
          <form onSubmit={handlePay} className="space-y-8" noValidate>

            {/* Mobile: collapsible order summary */}
            <div className="lg:hidden rounded-2xl bg-white shadow-card overflow-hidden">
              <button
                type="button"
                onClick={() => setSummaryOpen((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-4"
              >
                <div>
                  <span className="text-sm font-semibold text-ink">Order Summary</span>
                  <span className="ml-2 text-sm text-muted">
                    ({items.length} item{items.length !== 1 ? 's' : ''})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gold-dark">₵{total}</span>
                  {summaryOpen
                    ? <ChevronUp size={18} className="text-muted" />
                    : <ChevronDown size={18} className="text-muted" />}
                </div>
              </button>
              <AnimatePresence>
                {summaryOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-cream"
                  >
                    <div className="px-5 pb-4">
                      <SummaryContent items={items} subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Delivery details */}
            <section className="rounded-2xl bg-white shadow-card p-6 space-y-5">
              <h2 className="font-serif text-xl font-bold text-ink">Delivery Details</h2>

              <div id="field-name">
                <Field label="Full Name *" error={errors.name}>
                  <input
                    name="name" type="text" autoComplete="name"
                    placeholder="e.g. Kwame Mensah"
                    value={form.name} onChange={handleChange}
                    className={inputCls(!!errors.name)}
                  />
                </Field>
              </div>

              <div id="field-phone">
                <Field label="Phone Number *" error={errors.phone}>
                  <input
                    name="phone" type="tel" autoComplete="tel"
                    placeholder="e.g. 059 896 0027"
                    value={form.phone} onChange={handleChange}
                    className={inputCls(!!errors.phone)}
                  />
                </Field>
              </div>

              <div id="field-address">
                <Field label="Delivery Address *" error={errors.address}>
                  <textarea
                    name="address" rows={3}
                    placeholder="House number, street name, area — be as specific as possible"
                    value={form.address} onChange={handleChange}
                    className={`${inputCls(!!errors.address)} resize-none`}
                  />
                </Field>
              </div>

              <Field label="Landmark (optional)" error={errors.landmark}>
                <input
                  name="landmark" type="text"
                  placeholder="e.g. Near Kwabenya Market, opposite blue gate"
                  value={form.landmark} onChange={handleChange}
                  className={inputCls(false)}
                />
              </Field>

              <Field label="Notes for Rider (optional)" error={errors.notes}>
                <textarea
                  name="notes" rows={2}
                  placeholder="Any special instructions for your delivery rider"
                  value={form.notes} onChange={handleChange}
                  className={`${inputCls(false)} resize-none`}
                />
              </Field>
            </section>

            {/* Payment method selection */}
            <section className="rounded-2xl bg-white shadow-card p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-ink">Payment Method</h2>
              <p className="text-sm text-muted">Choose how you'd like to pay for your order.</p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PAYMENT_METHODS.map((method) => {
                  const selected = paymentMethod === method.id
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPayment(method.id)}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                        selected
                          ? 'border-gold bg-gold/5 shadow-btn'
                          : 'border-beige bg-white hover:border-gold/40'
                      }`}
                    >
                      <span
                        className="shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white"
                        style={{ backgroundColor: method.color }}
                      >
                        {method.tag}
                      </span>
                      <span className={`text-sm font-semibold ${selected ? 'text-gold-dark' : 'text-ink'}`}>
                        {method.label}
                      </span>
                      <span className="ml-auto shrink-0">
                        <span className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${selected ? 'border-gold' : 'border-muted/30'}`}>
                          {selected && <span className="h-2 w-2 rounded-full bg-gold" />}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Mobile: action buttons */}
            <div className="lg:hidden">
              <PaymentActions
                onPay={handlePay}
                onWhatsApp={handleWhatsApp}
                submitting={submitting}
                total={total}
              />
            </div>
          </form>

          {/* ── RIGHT: Sticky summary + actions (desktop) ─────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl bg-white shadow-card p-6">
                <h2 className="font-serif text-xl font-bold text-ink mb-5">Order Summary</h2>
                <SummaryContent items={items} subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
              </div>
              <PaymentActions
                onPay={handlePay}
                onWhatsApp={handleWhatsApp}
                submitting={submitting}
                total={total}
              />
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────────

function SummaryContent({ items, subtotal, deliveryFee, total }) {
  return (
    <div>
      <ul className="space-y-3 mb-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-beige">
              {item.image
                ? <img src={img(item.image, 88)} alt={item.name} className="w-full h-full object-cover" />
                : <FoodPlaceholder />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{item.name}</p>
              <p className="text-xs text-muted">× {item.quantity}</p>
            </div>
            <span className="text-sm font-bold text-ink shrink-0">₵{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-cream pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold text-ink">₵{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Delivery fee</span>
          <span className="font-semibold text-ink">₵{deliveryFee}</span>
        </div>
        <div className="flex justify-between text-base font-bold pt-2 border-t border-cream">
          <span className="text-ink">Total</span>
          <span className="text-gold-dark text-lg">₵{total}</span>
        </div>
      </div>
    </div>
  )
}

function PaymentActions({ onPay, onWhatsApp, submitting, total }) {
  return (
    <div className="space-y-3">
      {/* Primary: Pay button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={onPay}
        disabled={submitting}
        aria-busy={submitting}
        className="w-full flex items-center justify-center gap-2.5 rounded-full bg-gold py-4 text-sm font-semibold text-white shadow-btn hover:bg-gold-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden />
            <span>Processing payment…</span>
          </>
        ) : (
          <>
            <CreditCard size={17} aria-hidden />
            <span>Pay with Mobile Money / Card · ₵{total}</span>
          </>
        )}
      </motion.button>

      {/* Divider */}
      <div className="flex items-center gap-3" aria-hidden>
        <div className="flex-1 h-px bg-beige" />
        <span className="text-xs text-muted font-medium">or</span>
        <div className="flex-1 h-px bg-beige" />
      </div>

      {/* Secondary: WhatsApp */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={onWhatsApp}
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2.5 rounded-full border-2 border-green-500 bg-white py-3.5 text-sm font-semibold text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MessageCircle size={17} aria-hidden />
        <span>Order via WhatsApp</span>
      </motion.button>

      <p className="text-center text-[11px] text-muted leading-snug pt-1">
        Your details are safe. Payments are processed securely.
      </p>
    </div>
  )
}
