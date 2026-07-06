import { motion } from 'framer-motion'
import logo from '../../assets/teez-lounge-hero.png'

/**
 * Light, quick branded splash. Logo used for branding only.
 */
export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <div className="relative flex h-28 w-28 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-gold/20 border-t-gold"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />
          <img
            src={logo}
            alt="Teez Lounge"
            className="h-20 w-20 rounded-full object-cover shadow-soft"
          />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.35em] text-brown">
          Teez Lounge
        </p>
      </motion.div>
    </motion.div>
  )
}
