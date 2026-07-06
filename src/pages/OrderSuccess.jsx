import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Home, UtensilsCrossed } from 'lucide-react'
import Button from '../components/ui/Button'

export default function OrderSuccess() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // Guard: if user navigates directly without state, send home
  if (!state?.orderNumber) {
    return <Navigate to="/" replace />
  }

  const { orderNumber, total, items = [], paymentMethod } = state

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 18 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
        >
          <CheckCircle size={52} className="text-green-500" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Order Placed!</h1>
          <p className="mt-2 text-muted">
            Your food is being prepared with love. We'll be with you soon!
          </p>
        </motion.div>

        {/* Order details card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8 rounded-2xl bg-white shadow-card p-6 text-left space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Order number</span>
            <span className="font-bold text-ink tracking-wide">#{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Clock size={14} />
              Estimated delivery
            </div>
            <span className="font-semibold text-ink">30 – 45 min</span>
          </div>

          {/* Order items */}
          {items.length > 0 && (
            <div className="border-t border-cream pt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Your order
              </p>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-ink/80">
                    {item.name}
                    <span className="text-muted ml-1">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold text-ink">₵{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center pt-3 border-t border-cream">
            <span className="font-semibold text-ink">Total paid</span>
            <span className="text-xl font-bold text-gold-dark">₵{total}</span>
          </div>
        </motion.div>

        {/* Estimated time banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 flex items-center justify-center gap-2.5 rounded-xl bg-gold/10 border border-gold/20 px-5 py-3.5 text-sm"
        >
          <UtensilsCrossed size={16} className="text-gold-dark shrink-0" />
          <p className="text-gold-dark font-medium">
            Our kitchen is on it — expect your delivery in <strong>30–45 minutes</strong>.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <Button to="/" variant="gold" size="lg" className="flex-1" icon={Home}>
            Return Home
          </Button>
          <Button to="/menu" variant="outline" size="lg" className="flex-1">
            Order Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
