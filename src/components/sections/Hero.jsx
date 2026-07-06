import { motion } from 'framer-motion'
import { ShoppingBag, UtensilsCrossed, Phone, MessageCircle, Star } from 'lucide-react'
import Button from '../ui/Button'
import { links, site } from '../../data/site'
import { img, scene, food } from '../../data/images'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-beige pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36">
      {/* soft warm blobs (no glow, very subtle) */}
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brown/5 blur-3xl" />

      <div className="section-pad container-tight relative grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        {/* Left: copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-1.5 text-xs font-semibold text-brown shadow-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Authentic Ghanaian Cuisine
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            Good Food,
            <br />
            <span className="text-gold-dark">Great Vibes.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-base leading-relaxed text-muted"
          >
            Authentic Ghanaian dishes made fresh daily and served in a warm,
            welcoming space in {site.location.split('—')[0].trim()}. {site.slogan}.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button href={links.whatsapp} size="lg" icon={ShoppingBag}>
              Order Now
            </Button>
            <Button to="/menu" variant="outline" size="lg" icon={UtensilsCrossed}>
              View Menu
            </Button>
          </motion.div>

          {/* Secondary CTAs */}
          <motion.div variants={item} className="mt-3 flex flex-wrap gap-3">
            <Button href={links.call} variant="soft" size="sm" icon={Phone}>
              {site.phone}
            </Button>
            <Button href={links.whatsapp} variant="soft" size="sm" icon={MessageCircle}>
              WhatsApp
            </Button>
          </motion.div>

          {/* trust row */}
          <motion.div
            variants={item}
            className="mt-8 flex items-center gap-2 text-sm text-muted"
          >
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-gold" fill="currentColor" />
              ))}
            </span>
            <span className="font-semibold text-ink">4.9</span>
            <span>· Loved by 12,000+ guests</span>
          </motion.div>
        </motion.div>

        {/* Right: food imagery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-card-hover">
            <img
              src={img(scene.hero, 900)}
              alt="Authentic Ghanaian waakye served at Teez Lounge"
              className="aspect-[4/5] w-full object-cover sm:aspect-[4/4]"
            />
          </div>

          {/* floating dish thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -left-3 bottom-10 hidden items-center gap-3 rounded-2xl bg-white p-3 shadow-card sm:flex"
          >
            <img
              src={img(food.jollofChicken, 120)}
              alt="Jollof & Chicken"
              className="h-12 w-12 rounded-xl object-cover"
            />
            <div className="pr-2">
              <p className="text-sm font-semibold text-ink">Jollof & Chicken</p>
              <p className="text-xs text-gold-dark font-semibold">₵70</p>
            </div>
          </motion.div>

          {/* floating rating badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -right-2 top-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-card"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15">
              <Star size={16} className="text-gold" fill="currentColor" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-ink">4.9 ★</p>
              <p className="text-[10px] text-muted">Top Rated</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
