import { motion } from 'framer-motion'
import { Target, Eye, Leaf, ChefHat, Truck, Sparkles, Heart, Clock } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import { site, links } from '../data/site'
import { img, scene } from '../data/images'

const reasons = [
  { icon: Leaf, title: 'Fresh Ingredients', text: 'Locally sourced and prepared fresh every day.' },
  { icon: ChefHat, title: 'Authentic Recipes', text: 'True Ghanaian flavours, cooked with heart.' },
  { icon: Truck, title: 'Fast & Reliable', text: 'Quick service and easy ordering by call or WhatsApp.' },
  { icon: Sparkles, title: 'Great Atmosphere', text: 'A warm, welcoming space for great vibes.' },
  { icon: Heart, title: 'Made with Love', text: 'Every plate crafted to taste just like home.' },
  { icon: Clock, title: 'Always Consistent', text: 'The same great quality, every single visit.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="The Teez Lounge Story"
        subtitle="Where authentic Ghanaian cuisine meets a warm, welcoming experience."
      />

      {/* Story */}
      <section className="section-pad container-tight py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[2rem] shadow-card"
          >
            <img
              src={img(scene.aboutPage, 800)}
              alt="Ghanaian fried rice and chicken at Teez Lounge"
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Our Journey</span>
            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
              Born in {site.location.split('—')[0].trim()}, Made for Everyone
            </h2>
            <div className="gold-rule mt-4" />
            <p className="mt-5 leading-relaxed text-muted">
              Teez Lounge began with a simple belief — that great Ghanaian food
              deserves a great setting. What started as a passion for bold,
              authentic flavours grew into a destination where locals and
              visitors gather to eat, relax and celebrate.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Today our kitchen blends time-honoured recipes with a modern touch,
              served in a warm and welcoming atmosphere. From smoky jollof to
              charcoal-grilled tilapia, every plate tells a story of heritage and
              heart.
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-gold-dark">
              {site.slogan}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-beige py-16 sm:py-24">
        <div className="section-pad container-tight grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              text: 'To serve authentic, high-quality Ghanaian cuisine in a warm, welcoming environment — delivering great food, great vibes and a great experience to every guest.',
            },
            {
              icon: Eye,
              title: 'Our Vision',
              text: "To become Accra's most-loved restaurant, celebrated for elevating local flavours and setting the standard for hospitality in Ghana.",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl bg-white p-8 shadow-card sm:p-10"
            >
              <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold-dark">
                <card.icon size={26} />
              </span>
              <h3 className="text-xl font-bold text-ink">{card.title}</h3>
              <div className="gold-rule mt-3" />
              <p className="mt-4 leading-relaxed text-muted">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-pad container-tight py-16 sm:py-24">
        <SectionTitle
          eyebrow="The Difference"
          title="Why Choose Teez Lounge"
          subtitle="More than a meal — a complete, warm experience."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold-dark">
                <r.icon size={22} />
              </span>
              <h3 className="text-lg font-bold text-ink">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button to="/menu" size="lg">
            View Our Menu
          </Button>
          <Button href={links.whatsapp} variant="outline" size="lg">
            Order Now
          </Button>
        </div>
      </section>
    </>
  )
}
