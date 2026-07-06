import { motion } from 'framer-motion'

/**
 * Animated section heading with eyebrow + gold rule.
 * Restrained type scale (mobile-first).
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}) {
  const isLeft = align === 'left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`mb-10 flex flex-col sm:mb-14 ${
        isLeft ? 'items-start text-left' : 'items-center text-center'
      }`}
    >
      {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
      <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <div className={`gold-rule mt-4 ${isLeft ? '' : 'mx-auto'}`} />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base ${
            isLeft ? '' : 'mx-auto'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
