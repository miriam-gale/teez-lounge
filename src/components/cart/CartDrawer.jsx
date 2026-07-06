import { AnimatePresence, motion } from 'framer-motion'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, subtotal, deliveryFee, total, itemCount } = useCart()
  const navigate = useNavigate()

  function handleCheckout() {
    closeDrawer()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-[380px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} className="text-gold" />
                <h2 className="font-serif text-lg font-bold text-ink">Your Cart</h2>
                {itemCount > 0 && (
                  <span className="text-[11px] font-bold bg-gold text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-1 text-muted hover:text-ink transition rounded-full"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
                  <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center">
                    <ShoppingBag size={36} className="text-muted/40" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold text-ink">Your cart is empty</p>
                    <p className="text-sm text-muted mt-1">Add something delicious from the menu!</p>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="mt-2 text-sm font-semibold text-gold-dark underline underline-offset-2"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer totals + checkout */}
            {items.length > 0 && (
              <div className="px-5 py-5 border-t border-cream space-y-3 bg-white">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold text-ink">₵{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Delivery fee</span>
                  <span className="font-semibold text-ink">₵{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-ink pt-2 border-t border-cream">
                  <span>Total</span>
                  <span className="text-gold-dark text-lg">₵{total}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-white shadow-btn hover:bg-gold-dark transition-colors"
                >
                  Checkout · ₵{total}
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
