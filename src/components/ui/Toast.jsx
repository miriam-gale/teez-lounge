import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const CONFIG = {
  success: { Icon: CheckCircle, iconCls: 'text-green-500', bar: 'bg-green-500' },
  error:   { Icon: XCircle,     iconCls: 'text-red-500',   bar: 'bg-red-500'   },
  info:    { Icon: Info,        iconCls: 'text-gold',      bar: 'bg-gold'      },
}

export default function ToastList({ toasts, onDismiss }) {
  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] flex flex-col-reverse gap-2.5 w-full max-w-sm px-4 pointer-events-none"
    >
      <AnimatePresence initial={false}>
        {toasts.map(({ id, message, type }) => {
          const { Icon, iconCls, bar } = CONFIG[type] ?? CONFIG.info
          return (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={  { opacity: 0, y: -8,  scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden flex items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3.5 shadow-card pointer-events-auto"
            >
              {/* Left accent bar */}
              <div className={`absolute left-0 inset-y-0 w-1 rounded-l-2xl ${bar}`} />
              <Icon size={17} className={`${iconCls} mt-0.5 shrink-0`} strokeWidth={2} />
              <p className="flex-1 text-sm font-medium text-ink leading-snug">{message}</p>
              <button
                onClick={() => onDismiss(id)}
                className="shrink-0 text-muted hover:text-ink transition mt-0.5"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
