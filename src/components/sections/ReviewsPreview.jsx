import SectionTitle from '../ui/SectionTitle'
import ReviewCard from '../ui/ReviewCard'
import Button from '../ui/Button'
import { reviews } from '../../data/reviews'

export default function ReviewsPreview() {
  const preview = reviews.slice(0, 3)

  return (
    <section className="bg-beige py-16 sm:py-24">
      <div className="section-pad container-tight">
        <SectionTitle
          eyebrow="Reviews"
          title="Loved by Our Guests"
          subtitle="Real words from real diners across Accra."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {preview.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button to="/reviews" variant="outline" size="lg">
            Read All Reviews
          </Button>
        </div>
      </div>
    </section>
  )
}
