import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SearchBar from '../components/ui/SearchBar'
import FoodCard from '../components/ui/FoodCard'
import Button from '../components/ui/Button'
import { menu, categories } from '../data/menu'
import { links } from '../data/site'

const allTabs = [{ id: 'all', label: 'All' }, ...categories]

export default function Menu() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menu.filter((m) => {
      const matchCat = active === 'all' || m.category === active
      const matchQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [active, query])

  return (
    <>
      <PageHeader
        eyebrow="Our Menu"
        title="Order Your Favourites"
        subtitle="Authentic Ghanaian classics and modern favourites — freshly made."
      />

      {/* Sticky search + category bar */}
      <div className="sticky top-[60px] z-30 border-b border-black/5 bg-cream/90 backdrop-blur">
        <div className="section-pad container-tight py-4">
          <SearchBar value={query} onChange={setQuery} />

          <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
            {allTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active === tab.id
                    ? 'text-white'
                    : 'bg-white text-ink/70 shadow-soft hover:text-gold-dark'
                }`}
              >
                {active === tab.id && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-pad container-tight py-12 sm:py-16">
        <p className="mb-6 text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}
          {active !== 'all' &&
            ` in ${allTabs.find((t) => t.id === active)?.label}`}
        </p>

        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <FoodCard item={item} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold text-ink">No dishes found</p>
            <p className="mt-1 text-sm text-muted">
              Try a different search or category.
            </p>
          </div>
        )}

        {/* Order CTA */}
        <div className="mt-16 rounded-3xl bg-beige p-8 text-center shadow-soft sm:p-12">
          <h3 className="text-2xl font-bold text-ink sm:text-3xl">
            Ready to Order?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Place your order on WhatsApp or give us a call — fresh, hot and made
            with love.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={links.whatsapp} size="lg" icon={MessageCircle}>
              Order on WhatsApp
            </Button>
            <Button href={links.call} variant="outline" size="lg">
              Call to Order
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
