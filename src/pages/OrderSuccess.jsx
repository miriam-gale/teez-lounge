import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle, Clock, Home, UtensilsCrossed, Copy, Check,
  User, Phone, MapPin, Landmark, CreditCard, Calendar,
} from 'lucide-react'
import Button from '../components/ui/Button'
import { img } from '../data/images'
import FoodPlaceholder from '../components/ui/FoodPlaceholder'
import { METHOD_LABELS } from '../services/payment'

// ── Fade-in animation helper ────────────────────────────────────────────────────
function Reveal({ delay = 0, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Copy button ──────────────────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-muted hover:text-gold-dark transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied
        ? <><Check size={12} className="text-green-500" /><span className="text-green-500">Copied</span></>
        : <><Copy size={12} /><span>Copy</span></>}
    </button>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function OrderSuccess() {
  const { state } = useLocation()

  if (!state?.orderId) return <Navigate to="/" replace />

  const {
    orderId,
    paymentRef,
    customer = {},
    items = [],
    subtotal = 0,
    deliveryFee = 0,
    total = 0,
    method,
    timestamp,
  } = state

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleString('en-GH', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null

  const methodLabel = METHOD_LABELS[method] ?? method ?? 'Mobile Money / Card'

  return (
    <div className="min-h-screen bg-cream pt-20 pb-20 px-5">
      <div className="mx-auto max-w-lg">

        {/* ── Success header ───────────────────────────────────────────────── */}
        <div className="text-center pt-8 pb-6">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 230, damping: 18 }}
            className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
          >
            <CheckCircle size={52} className="text-green-500" strokeWidth={1.5} />
          </motion.div>

          <Reveal delay={0.25}>
            <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Order Placed!</h1>
            <p className="mt-2 text-muted">
              Your food is being prepared with love. We'll be with you soon!
            </p>
          </Reveal>
        </div>

        {/* ── Reference card ───────────────────────────────────────────────── */}
        <Reveal delay={0.35}>
          <div className="rounded-2xl bg-white shadow-card p-5 space-y-3 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Order Reference
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Order ID</p>
                <p className="font-bold text-ink tracking-wide text-sm">{orderId}</p>
              </div>
              <CopyButton text={orderId} />
            </div>

            <div className="border-t border-cream pt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Payment Reference</p>
                <p className="font-semibold text-ink text-sm">{paymentRef}</p>
              </div>
              <CopyButton text={paymentRef} />
            </div>

            <div className="border-t border-cream pt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted">Method</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CreditCard size={13} className="text-gold shrink-0" />
                  <p className="text-sm font-semibold text-ink">{methodLabel}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted">Estimated delivery</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={13} className="text-gold shrink-0" />
                  <p className="text-sm font-semibold text-ink">30 – 45 min</p>
                </div>
              </div>
            </div>

            {formattedTime && (
              <div className="border-t border-cream pt-3">
                <p className="text-xs text-muted">Order placed</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Calendar size={13} className="text-gold shrink-0" />
                  <p className="text-sm font-semibold text-ink">{formattedTime}</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* ── Customer info ─────────────────────────────────────────────────── */}
        {customer.name && (
          <Reveal delay={0.45}>
            <div className="rounded-2xl bg-white shadow-card p-5 mb-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Delivery Details
              </p>

              <InfoRow icon={User} label="Name" value={customer.name} />
              <InfoRow icon={Phone} label="Phone" value={customer.phone} />
              <InfoRow icon={MapPin} label="Address" value={customer.address} multiline />
              {customer.landmark && (
                <InfoRow icon={Landmark} label="Landmark" value={customer.landmark} />
              )}
              {customer.notes && (
                <div className="border-t border-cream pt-3">
                  <p className="text-xs text-muted mb-1">Rider notes</p>
                  <p className="text-sm text-ink italic">"{customer.notes}"</p>
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* ── Itemized receipt ──────────────────────────────────────────────── */}
        <Reveal delay={0.52}>
          <div className="rounded-2xl bg-white shadow-card p-5 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Your Order
            </p>

            <ul className="space-y-3 mb-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-beige">
                    {item.image
                      ? <img src={img(item.image, 80)} alt={item.name} className="w-full h-full object-cover" />
                      : <FoodPlaceholder />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{item.name}</p>
                    <p className="text-xs text-muted">× {item.quantity}  @  ₵{item.price} each</p>
                  </div>
                  <span className="text-sm font-bold text-ink shrink-0">
                    ₵{item.price * item.quantity}
                  </span>
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
              <div className="flex justify-between items-center pt-2 border-t border-cream">
                <span className="font-bold text-ink">Total paid</span>
                <span className="text-xl font-bold text-gold-dark">₵{total}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── ETA banner ───────────────────────────────────────────────────── */}
        <Reveal delay={0.6}>
          <div className="flex items-center justify-center gap-2.5 rounded-xl bg-gold/10 border border-gold/20 px-5 py-3.5 text-sm mb-8">
            <UtensilsCrossed size={16} className="text-gold-dark shrink-0" />
            <p className="text-gold-dark font-medium">
              Our kitchen is on it — expect delivery in{' '}
              <strong>30–45 minutes</strong>.
            </p>
          </div>
        </Reveal>

        {/* ── Action buttons ────────────────────────────────────────────────── */}
        <Reveal delay={0.68}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button to="/" variant="gold" size="lg" className="flex-1" icon={Home}>
              Return Home
            </Button>
            <Button to="/menu" variant="outline" size="lg" className="flex-1">
              Order Again
            </Button>
          </div>
        </Reveal>

      </div>
    </div>
  )
}

// ── Info row helper ─────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, multiline }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={15} className="text-gold mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className={`text-sm font-semibold text-ink ${multiline ? 'leading-snug' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  )
}
