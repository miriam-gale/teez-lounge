import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import logo from '../../assets/teez-lounge-hero.png'
import { links } from '../../data/site'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/95 shadow-soft backdrop-blur py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="section-pad container-tight flex items-center justify-between">
        {/* Logo (branding home) */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Teez Lounge"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-black/5"
          />
          <div className="leading-none">
            <span className="block font-serif text-base font-bold tracking-wide text-ink">
              Teez <span className="text-gold-dark">Lounge</span>
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-muted">
              Bar &amp; Restaurant
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-gold-dark' : 'text-ink/70 hover:text-gold-dark'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gold"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={links.call}
          className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-btn transition hover:bg-gold-dark lg:inline-flex"
        >
          <Phone size={16} />
          Call to Order
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-ink lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <ul className="section-pad flex flex-col gap-1 pb-5 pt-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-medium transition ${
                        isActive
                          ? 'bg-beige text-gold-dark'
                          : 'text-ink/75 hover:bg-cream'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <a
                href={links.call}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-semibold text-white"
              >
                <Phone size={16} />
                Call to Order
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
