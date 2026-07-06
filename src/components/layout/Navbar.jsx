import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ShoppingBag } from 'lucide-react'
import logo from '../../assets/teez-lounge-hero.png'
import { links } from '../../data/site'
import { useCart } from '../../context/CartContext'

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
  const { itemCount, toggleDrawer } = useCart()

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
        {/* Logo */}
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

        {/* Desktop right: Cart + Call CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Cart icon */}
          <button
            onClick={toggleDrawer}
            className="relative p-2 text-ink/70 hover:text-gold-dark transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a
            href={links.call}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-btn transition hover:bg-gold-dark"
          >
            <Phone size={16} />
            Call to Order
          </a>
        </div>

        {/* Mobile: Cart icon + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleDrawer}
            className="relative p-2 text-ink"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key="badge-mobile"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-ink"
            aria-label="Toggle menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
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
                        isActive ? 'bg-beige text-gold-dark' : 'text-ink/75 hover:bg-cream'
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
