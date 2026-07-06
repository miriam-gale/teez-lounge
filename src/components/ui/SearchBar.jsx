import { Search, X } from 'lucide-react'

/**
 * Rounded search input for the menu (food-ordering app feel).
 */
export default function SearchBar({ value, onChange, placeholder = 'Search dishes…' }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-black/10 bg-white py-3.5 pl-12 pr-12 text-sm text-ink shadow-soft outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20 sm:text-base"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-ink"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
