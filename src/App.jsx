import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { CartProvider } from './context/CartContext'
import CartDrawer from './components/cart/CartDrawer'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import Loader from './components/ui/Loader'

import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"              element={<PageTransition><Home /></PageTransition>} />
        <Route path="/menu"          element={<PageTransition><Menu /></PageTransition>} />
        <Route path="/about"         element={<PageTransition><About /></PageTransition>} />
        <Route path="/reviews"       element={<PageTransition><Reviews /></PageTransition>} />
        <Route path="/contact"       element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/checkout"      element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/order-success" element={<PageTransition><OrderSuccess /></PageTransition>} />
        <Route path="*"              element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <CartProvider>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      {!loading && (
        <>
          <ScrollToTop />
          <Layout>
            <AnimatedRoutes />
          </Layout>
          {/* CartDrawer is mounted outside Layout so it overlays everything */}
          <CartDrawer />
        </>
      )}
    </CartProvider>
  )
}
