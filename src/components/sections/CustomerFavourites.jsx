import SectionTitle from '../ui/SectionTitle'
import FoodCard from '../ui/FoodCard'
import Button from '../ui/Button'
import { featuredDishes } from '../../data/menu'

export default function CustomerFavourites() {
  return (
    <section className="section-pad container-tight py-16 sm:py-24">
      <SectionTitle
        eyebrow="Customer Favourites"
        title="The Dishes Everyone Loves"
        subtitle="Hand-picked signatures that keep our guests coming back for more."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredDishes.map((item, i) => (
          <FoodCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button to="/menu" variant="outline" size="lg">
          See Full Menu
        </Button>
      </div>
    </section>
  )
}
