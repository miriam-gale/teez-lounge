import { Star } from 'lucide-react'

/**
 * Gold star rating. Supports half values (e.g. 4.5).
 */
export default function StarRating({ value = 5, size = 16, showValue = false }) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    Math.max(0, Math.min(1, value - i))
  )

  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex gap-0.5">
        {stars.map((fill, i) => (
          <span key={i} className="relative">
            <Star size={size} className="text-gold/25" fill="currentColor" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={size} className="text-gold" fill="currentColor" />
            </span>
          </span>
        ))}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-ink">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}
