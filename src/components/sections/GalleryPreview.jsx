import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { img, food } from '../../data/images'

// Authentic Ghanaian food photography.
const tiles = [
  { id: food.jollofChicken, label: 'Jollof & Chicken', span: 'sm:col-span-2 sm:row-span-2' },
  { id: food.kelewele, label: 'Kelewele', span: '' },
  { id: food.bankuTilapia, label: 'Banku & Tilapia', span: '' },
  { id: food.fufuLightSoup, label: 'Fufu & Light Soup', span: '' },
  { id: food.attiekeChicken, label: 'Attieke & Chicken', span: 'sm:col-span-2' },
  { id: food.redRed, label: 'Red Red', span: '' },
]

export default function GalleryPreview() {
  return (
    <section className="section-pad container-tight py-16 sm:py-24">
      <SectionTitle
        eyebrow="Gallery"
        title="A Taste of the Experience"
        subtitle="A glimpse of the flavours and the warm atmosphere that await you."
      />

      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-4">
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl shadow-card ${tile.span}`}
          >
            <img
              src={img(tile.id, 700)}
              alt={tile.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {tile.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
