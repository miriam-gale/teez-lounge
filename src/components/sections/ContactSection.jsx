import { motion } from 'framer-motion'
import { Phone, MessageCircle, Instagram, MapPin, Clock } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import { site, links } from '../../data/site'

const cards = [
  { icon: Phone, label: 'Call Us', value: site.phone, href: links.call },
  { icon: MessageCircle, label: 'WhatsApp', value: site.whatsapp, href: links.whatsapp },
  { icon: Instagram, label: 'Instagram', value: site.instagram, href: links.instagram },
]

export default function ContactSection() {
  return (
    <section className="section-pad container-tight py-16 sm:py-24">
      <SectionTitle
        eyebrow="Visit Us"
        title="Location & Contact"
        subtitle="Drop by for a meal or order ahead — we'd love to host you."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {cards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold-dark transition group-hover:bg-gold group-hover:text-white">
                  <c.icon size={22} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {c.label}
                </span>
                <span className="text-sm font-medium text-ink">{c.value}</span>
              </a>
            ))}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-card">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-gold-dark" size={20} />
              <div>
                <p className="font-semibold text-ink">Find Us</p>
                <p className="text-sm text-muted">{site.location}</p>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-3">
              <Clock className="mt-0.5 shrink-0 text-gold-dark" size={20} />
              <div>
                <p className="font-semibold text-ink">Opening Hours</p>
                <ul className="mt-1 space-y-1 text-sm text-muted">
                  {site.hours.map((h) => (
                    <li key={h.day}>
                      {h.day}: <span className="text-ink/70">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={links.whatsapp} icon={MessageCircle}>
                Order on WhatsApp
              </Button>
              <Button to="/contact" variant="soft">
                Contact Page
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Right: map */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="min-h-[320px] overflow-hidden rounded-2xl shadow-card"
        >
          <iframe
            title="Teez Lounge location map"
            src="https://www.google.com/maps?q=Kwabenya,Accra,Ghana&output=embed"
            className="h-full min-h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )
}
