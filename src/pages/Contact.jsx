import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  Mail,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import { site, links } from '../data/site'

const infoCards = [
  { icon: Phone, label: 'Call Us', value: site.phone, href: links.call },
  { icon: MessageCircle, label: 'WhatsApp', value: site.whatsapp, href: links.whatsapp },
  { icon: Instagram, label: 'Instagram', value: site.instagram, href: links.instagram },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // Phase 1: UI only — routes the message to WhatsApp.
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    const text = `Hello Teez Lounge!%0A%0AName: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`
    window.open(`https://wa.me/${site.whatsappRaw}?text=${text}`, '_blank')
  }

  const inputClass =
    'w-full rounded-xl border border-black/10 bg-cream px-4 py-3 text-ink placeholder-muted/60 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Connect"
        subtitle="Questions, reservations or orders — we're always happy to hear from you."
      />

      {/* Info cards */}
      <section className="section-pad container-tight py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {infoCards.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold-dark transition group-hover:bg-gold group-hover:text-white">
                <c.icon size={22} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {c.label}
              </span>
              <span className="break-all text-sm font-medium text-ink">
                {c.value}
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form + details */}
      <section className="section-pad container-tight pb-16 sm:pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white p-7 shadow-card sm:p-9"
          >
            <h2 className="text-xl font-bold text-ink">Send a Message</h2>
            <div className="gold-rule mt-3" />

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-12 text-center"
              >
                <CheckCircle2 size={52} className="text-gold" />
                <p className="text-lg font-semibold text-ink">
                  Thank you, {form.name || 'friend'}!
                </p>
                <p className="max-w-sm text-sm text-muted">
                  We've opened WhatsApp so you can send your message directly.
                  We'll get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Send another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <Button type="submit" size="lg" icon={Send} className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>

          {/* Details + map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl bg-white p-7 shadow-card">
              <h3 className="text-lg font-bold text-ink">Reach Us Directly</h3>
              <div className="gold-rule mt-3" />
              <ul className="mt-5 space-y-3.5 text-sm text-ink/80">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-gold-dark" /> {site.phone}
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-gold-dark" /> {site.whatsapp}
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-gold-dark" /> {site.email}
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-gold-dark" /> {site.location}
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 text-gold-dark" />
                  <span>
                    {site.hours.map((h) => (
                      <span key={h.day} className="block">
                        {h.day}: <span className="text-muted">{h.time}</span>
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>

            {/* Google Maps embed */}
            <div className="min-h-[260px] flex-1 overflow-hidden rounded-3xl shadow-card">
              <iframe
                title="Teez Lounge location map"
                src="https://www.google.com/maps?q=Kwabenya,Accra,Ghana&output=embed"
                className="h-full min-h-[260px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
