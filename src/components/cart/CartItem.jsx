import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { img } from '../../data/images'
import FoodPlaceholder from '../ui/FoodPlaceholder'

export default function CartItem({ item }) {
  const { increment, decrement, removeItem } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.22 }}
      className="flex items-center gap-3 py-3.5 border-b border-cream last:border-0"
    >
      {/* Thumbnail */}
      <div className="w-[60px] h-[60px] rounded-xl overflow-hidden shrink-0 bg-beige">
        {item.image ? (
          <img
            src={img(item.image, 120)}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FoodPlaceholder />
        )}
      </div>

      {/* Info + qty */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink leading-snug truncate">{item.name}</p>
        <p className="text-xs text-gold-dark font-bold mt-0.5">₵{item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => decrement(item.id)}
            className="w-6 h-6 rounded-full bg-cream flex items-center justify-center hover:bg-beige transition text-ink"
            aria-label="Decrease quantity"
          >
            <Minus size={11} strokeWidth={2.5} />
          </button>
          <span className="text-sm font-bold text-ink w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => increment(item.id)}
            className="w-6 h-6 rounded-full bg-gold flex items-center justify-center hover:bg-gold-dark transition text-white"
            aria-label="Increase quantity"
          >
            <Plus size={11} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Line total + remove */}
      <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-0.5">
        <button
          onClick={() => removeItem(item.id)}
          className="text-muted hover:text-red-500 transition"
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={14} />
        </button>
        <span className="text-sm font-bold text-ink">₵{item.price * item.quantity}</span>
      </div>
    </motion.div>
  )
}
