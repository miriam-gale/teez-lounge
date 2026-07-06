import { motion } from 'framer-motion'
import { Leaf, ChefHat, Truck, Sparkles } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const reasons = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    text: 'Locally sourced produce and quality meats, prepared fresh every single day.',
  },
  {
    icon: ChefHat,
    title: 'Authentic Recipes',
    text: 'True Ghanaian flavours crafted by chefs who cook with heart and heritage.',
  },
  {
    icon: Truck,
    title: 'Fast & Reliable',
    text: 'Quick service and easy ordering by call or WhatsApp — hot food, on time.',
  },
  {
    icon: Sparkles,
    title: 'Great Atmosphere',
    text: 'A warm, welcoming space perfect for friends, family and good vibes.',
  },
]

export default function WhyChoose() {
  return (
    <section className="bg-beige py-16 sm:py-24">
      <div className="section-pad container-tight">
        <SectionTitle
          eyebrow="Why Choose Us"
          title="Why Choose Teez Lounge"
          subtitle="More than a meal — a warm, premium experience every time you visit."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white p-6 text-center shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold-dark">
                <r.icon size={26} />
              </span>
              <h3 className="text-lg font-bold text-ink">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
