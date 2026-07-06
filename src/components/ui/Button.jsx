import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Reusable button. variant: 'gold' | 'outline' | 'brown' | 'soft'
 * Renders as <Link> (to), <a> (href) or <button> automatically.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40'

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-7 py-3.5 text-base',
}

const variants = {
  gold: 'bg-gold text-white shadow-btn hover:bg-gold-dark',
  outline: 'border-2 border-gold text-gold-dark hover:bg-gold hover:text-white',
  brown: 'bg-brown text-white hover:bg-brown-dark',
  soft: 'bg-cream text-ink border border-black/5 hover:border-gold/40',
  white: 'bg-white text-ink shadow-soft hover:text-gold-dark',
}

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  to,
  href,
  className = '',
  icon: Icon,
  ...props
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const content = (
    <>
      {Icon && <Icon size={18} strokeWidth={2} />}
      {children}
    </>
  )

  const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={to} className={classes} {...props}>
          {content}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        className={classes}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {content}
    </motion.button>
  )
}
