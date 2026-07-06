import { UtensilsCrossed } from 'lucide-react'

/**
 * Light fallback shown only if a dish has no image id.
 */
export default function FoodPlaceholder({ label = 'Teez Lounge' }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-beige">
      <div className="flex flex-col items-center gap-2 text-gold/60">
        <UtensilsCrossed size={36} strokeWidth={1.25} />
        <span className="text-[10px] uppercase tracking-[0.25em]">{label}</span>
      </div>
    </div>
  )
}
