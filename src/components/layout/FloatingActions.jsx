import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { links } from '../../data/site'

/**
 * Persistent floating WhatsApp + Call buttons (soft shadow, no glow).
 */
export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <motion.a
        href={links.whatsapp}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-card"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.a>
      <motion.a
        href={links.call}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.42, type: 'spring' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex items-center justify-center rounded-full bg-gold p-3.5 text-white shadow-card"
        aria-label="Call Teez Lounge"
      >
        <Phone size={24} />
      </motion.a>
    </div>
  )
}
