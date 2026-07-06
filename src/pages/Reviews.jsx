import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import ReviewCard from '../components/ui/ReviewCard'
import StarRating from '../components/ui/StarRating'
import Button from '../components/ui/Button'
import { reviews } from '../data/reviews'
import { links } from '../data/site'

export default function Reviews() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="What Our Guests Say"
        subtitle="Honest words from the people who dine with us."
      />

      {/* Compact rating summary (not oversized) */}
      <section className="section-pad container-tight pt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-xl flex-col items-center gap-2 rounded-2xl bg-white px-6 py-6 text-center shadow-card sm:flex-row sm:justify-center sm:gap-6"
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gold-dark">4.9</span>
            <StarRating value={4.9} size={18} />
          </div>
          <div className="hidden h-12 w-px bg-black/10 sm:block" />
          <p className="text-sm text-muted">
            Based on <span className="font-semibold text-ink">hundreds</span> of
            happy guests across Accra
          </p>
        </motion.div>
      </section>

      {/* Reviews grid */}
      <section className="section-pad container-tight py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-beige p-8 text-center shadow-soft sm:p-12">
          <h3 className="text-2xl font-bold text-ink sm:text-3xl">
            Loved your visit?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Share your experience on Instagram or WhatsApp — we'd love to hear
            from you!
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={links.instagram} size="lg">
              Tag us on Instagram
            </Button>
            <Button href={links.whatsapp} variant="outline" size="lg" icon={MessageCircle}>
              Message Us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
