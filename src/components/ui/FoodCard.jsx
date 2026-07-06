import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Star } from 'lucide-react'
import FoodPlaceholder from './FoodPlaceholder'
import { img } from '../../data/images'
import { useCart } from '../../context/CartContext'

export default function FoodCard({ item, index = 0 }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (added) return
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {/* Food image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {item.image ? (
          <img
            src={img(item.image, 600)}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <FoodPlaceholder />
        )}
        {/* Rating pill */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-soft backdrop-blur">
          <Star size={13} className="text-gold" fill="currentColor" />
          {item.rating}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-snug text-ink sm:text-lg">{item.name}</h3>
          <span className="shrink-0 text-base font-bold text-gold-dark sm:text-lg">₵{item.price}</span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          {item.reviews != null && (
            <span className="text-xs text-muted">{item.reviews} reviews</span>
          )}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-btn transition-colors ${
              added ? 'bg-green-500 hover:bg-green-500' : 'bg-gold hover:bg-gold-dark'
            }`}
            aria-label={`Add ${item.name} to cart`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={14} strokeWidth={2.5} />
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Plus size={15} strokeWidth={2.5} />
                  Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
