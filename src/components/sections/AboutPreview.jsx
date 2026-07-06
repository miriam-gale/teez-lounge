import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '../ui/Button'
import { site } from '../../data/site'
import { img, scene } from '../../data/images'

const points = [
  'Authentic, freshly cooked Ghanaian dishes',
  'Warm, welcoming dining atmosphere',
  'Fast ordering by call or WhatsApp',
]

export default function AboutPreview() {
  return (
    <section className="section-pad container-tight py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-card">
            <img
              src={img(scene.aboutPreview, 800)}
              alt="Authentic Ghanaian jollof and chicken at Teez Lounge"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-5 rounded-2xl bg-white px-5 py-4 text-center shadow-card">
            <p className="text-2xl font-bold text-gold-dark">4.9★</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
              Guest Rating
            </p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">About Teez Lounge</span>
          <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            A Warm Home for Great Ghanaian Food
          </h2>
          <div className="gold-rule mt-4" />
          <p className="mt-5 leading-relaxed text-muted">
            Nestled in {site.location}, Teez Lounge brings the soul of authentic
            Ghanaian cuisine to a relaxed, modern setting. Every dish is made
            with care, and every guest is treated like family.
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-ink">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  <Check size={14} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button to="/about" size="lg">
              Our Story
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
