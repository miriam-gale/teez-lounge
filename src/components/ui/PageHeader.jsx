import { motion } from 'framer-motion'

/**
 * Light, compact hero banner for inner pages.
 */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-beige pt-28 pb-12 sm:pt-32 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="section-pad container-tight text-center"
      >
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <div className="gold-rule mx-auto mt-5" />
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted sm:text-base">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  )
}
