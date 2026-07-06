import { motion } from 'framer-motion'
import StarRating from './StarRating'

// Soft, deterministic avatar colour per name
const avatarColors = [
  'bg-gold',
  'bg-brown',
  'bg-gold-dark',
  'bg-brown-light',
  'bg-gold-light',
]
const colorFor = (name) =>
  avatarColors[name.charCodeAt(0) % avatarColors.length]

export default function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-card"
    >
      {/* Header: avatar + name + date */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${colorFor(
            review.name
          )}`}
        >
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{review.name}</p>
          <p className="text-xs text-muted">{review.location}</p>
        </div>
      </div>

      {/* Stars + date */}
      <div className="mt-4 flex items-center justify-between">
        <StarRating value={review.rating} size={16} />
        <span className="text-xs text-muted">{review.date}</span>
      </div>

      {/* Text */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">
        {review.text}
      </p>
    </motion.div>
  )
}
