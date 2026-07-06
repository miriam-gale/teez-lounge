import SectionTitle from '../ui/SectionTitle'
import FoodCard from '../ui/FoodCard'
import Button from '../ui/Button'
import { featuredDishes } from '../../data/menu'

export default function FeaturedDishes() {
  return (
    <section className="section-pad py-20 sm:py-28">
      <SectionTitle
        eyebrow="Signature Selection"
        title="Our Featured Dishes"
        subtitle="Hand-picked favourites that keep our guests coming back for more."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredDishes.map((item, i) => (
          <FoodCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Button to="/menu" variant="outline" size="lg">
          Explore Full Menu
        </Button>
      </div>
    </section>
  )
}
