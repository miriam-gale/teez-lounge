import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Instagram, MapPin, Clock } from 'lucide-react'
import logo from '../../assets/teez-lounge-hero.png'
import { site, links } from '../../data/site'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact', path: '/contact' },
]

export default function Footer() {
  const year = 2026

  return (
    <footer className="bg-brown-dark text-cream/80">
      <div className="section-pad container-tight grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand (logo used here for branding) */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Teez Lounge"
              className="h-11 w-11 rounded-full object-cover ring-1 ring-white/15"
            />
            <div className="leading-none">
              <span className="block font-serif text-lg font-bold text-white">
                Teez <span className="text-gold-light">Lounge</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-cream/50">
                Bar &amp; Restaurant
              </span>
            </div>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            {site.shortAbout}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.15em] text-gold-light">
            {site.slogan}
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Explore
          </h4>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-cream/65 transition hover:text-gold-light"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Get in Touch
          </h4>
          <ul className="space-y-3.5 text-sm text-cream/65">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-light" />
              {site.location}
            </li>
            <li>
              <a href={links.call} className="flex items-center gap-3 transition hover:text-gold-light">
                <Phone size={18} className="text-gold-light" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={links.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-gold-light">
                <MessageCircle size={18} className="text-gold-light" />
                {site.whatsapp}
              </a>
            </li>
            <li>
              <a href={links.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-gold-light">
                <Instagram size={18} className="text-gold-light" />
                {site.instagram}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Opening Hours
          </h4>
          <ul className="space-y-3.5 text-sm text-cream/65">
            {site.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-gold-light" />
                <span>
                  <span className="block text-cream/85">{h.day}</span>
                  <span className="text-cream/50">{h.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-pad container-tight flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-cream/45 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Great Food · Great Vibes · Great Experience</p>
        </div>
      </div>
    </footer>
  )
}
