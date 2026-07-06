import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RefreshCw, Search, ChevronDown, ChevronUp,
  ShoppingBag, AlertCircle, Loader2, MapPin, CreditCard,
} from 'lucide-react'
import { getOrders, updateOrderStatus } from '../services/orderService'
import { METHOD_LABELS } from '../services/payment'

// ── Constants ──────────────────────────────────────────────────────────────────

const STATUSES = ['Pending', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled']

const STATUS_CFG = {
  'Pending':          { badge: 'bg-amber-100 text-amber-700 border-amber-200',    dot: 'bg-amber-400' },
  'Preparing':        { badge: 'bg-blue-100 text-blue-700 border-blue-200',       dot: 'bg-blue-400' },
  'Ready':            { badge: 'bg-purple-100 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  'Out for Delivery': { badge: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-400' },
  'Delivered':        { badge: 'bg-green-100 text-green-700 border-green-200',    dot: 'bg-green-500' },
  'Cancelled':        { badge: 'bg-gray-100 text-gray-500 border-gray-200',       dot: 'bg-gray-400' },
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// ── Status badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG['Pending']
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  )
}

// ── Order card ─────────────────────────────────────────────────────────────────

function OrderCard({ order, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)
  const [localStatus, setLocalStatus] = useState(order.status)
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState(null)

  const items = order.order_items ?? []

  async function handleStatusClick(newStatus) {
    if (newStatus === localStatus || updating) return
    setUpdating(true)
    setUpdateError(null)
    try {
      await onStatusChange(order.order_id, newStatus)
      setLocalStatus(newStatus)
    } catch {
      setUpdateError('Update failed — try again')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <motion.div layout className="rounded-2xl bg-white shadow-card overflow-hidden">
      {/* Summary row — always visible, click to expand */}
      <button
        type="button"
        className="w-full text-left px-5 py-4 hover:bg-cream/40 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-gold-dark tracking-wider">
                {order.order_id}
              </span>
              <StatusBadge status={localStatus} />
            </div>
            <p className="mt-1.5 font-serif font-bold text-ink text-[15px] leading-tight">
              {order.customer_name}
            </p>
            <p className="text-xs text-muted mt-0.5">{order.phone}</p>
          </div>

          <div className="text-right shrink-0">
            <p className="font-bold text-gold-dark text-lg leading-tight">₵{order.total}</p>
            <p className="text-[11px] text-muted mt-0.5">{timeAgo(order.created_at)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-cream/80">
          <span className="text-[11px] text-muted">
            {items.length} item{items.length !== 1 ? 's' : ''}
            {' · '}
            {METHOD_LABELS[order.payment_method] ?? order.payment_method}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-muted">
            <span>{expanded ? 'Hide' : 'Details'}</span>
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </div>
        </div>
      </button>

      {/* Expanded detail panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-cream px-5 py-4 space-y-5">

              {/* Items */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-2">
                  Order Items
                </p>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className="text-ink">
                        {item.item_name}
                        <span className="text-muted"> × {item.quantity}</span>
                      </span>
                      <span className="font-semibold text-ink">₵{item.line_total}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-cream space-y-1.5">
                  {order.subtotal != null && (
                    <div className="flex justify-between text-xs text-muted">
                      <span>Subtotal</span><span>₵{order.subtotal}</span>
                    </div>
                  )}
                  {order.delivery_fee != null && (
                    <div className="flex justify-between text-xs text-muted">
                      <span>Delivery fee</span><span>₵{order.delivery_fee}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold pt-1.5 border-t border-cream">
                    <span className="text-ink">Total</span>
                    <span className="text-gold-dark">₵{order.total}</span>
                  </div>
                </div>
              </div>

              {/* Delivery details */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-2">
                  Delivery
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-gold mt-0.5 shrink-0" />
                    <span className="text-ink leading-snug">{order.address}</span>
                  </div>
                  {order.landmark && (
                    <p className="ml-5 text-xs text-muted">Landmark: {order.landmark}</p>
                  )}
                  {order.notes && (
                    <p className="ml-5 text-xs text-muted italic">"{order.notes}"</p>
                  )}
                </div>
              </div>

              {/* Payment reference */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-2">
                  Payment
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <CreditCard size={13} className="text-gold" />
                  <span className="text-ink">{METHOD_LABELS[order.payment_method] ?? order.payment_method}</span>
                  <span className="font-mono text-[11px] text-muted">{order.payment_reference}</span>
                </div>
                <p className="text-[11px] text-muted mt-1">
                  {new Date(order.created_at).toLocaleString('en-GH', {
                    dateStyle: 'medium', timeStyle: 'short',
                  })}
                </p>
              </div>

              {/* Status update */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-2">
                  Update Status
                </p>
                {updateError && (
                  <p className="text-xs text-red-500 mb-2 flex items-center gap-1">
                    <AlertCircle size={11} />{updateError}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => {
                    const active = localStatus === s
                    const cfg = STATUS_CFG[s]
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={active || updating}
                        onClick={() => handleStatusClick(s)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-all ${
                          active
                            ? `${cfg.badge} cursor-default`
                            : 'border-beige bg-cream text-muted hover:border-gold/40 hover:text-gold-dark'
                        } disabled:opacity-60`}
                      >
                        {updating && !active && <Loader2 size={10} className="animate-spin inline mr-1" />}
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Stat card ──────────────────────────────────────────────────────────────────

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl bg-white shadow-soft p-4 text-center">
      <p className={`font-serif text-2xl font-bold ${accent}`}>{value}</p>
      <p className="text-xs text-muted mt-0.5">{label}</p>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function Admin() {
  const [orders, setOrders]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError]         = useState(null)
  const [search, setSearch]       = useState('')
  const [statusFilter, setFilter] = useState('All')

  async function loadOrders(isRefresh = false) {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)
    try {
      setOrders(await getOrders())
    } catch (err) {
      setError(err.message || 'Failed to load orders')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { loadOrders() }, [])

  async function handleStatusChange(orderId, newStatus) {
    await updateOrderStatus(orderId, newStatus)
    setOrders((prev) =>
      prev.map((o) => o.order_id === orderId ? { ...o, status: newStatus } : o)
    )
  }

  const stats = useMemo(() => ({
    total:     orders.length,
    pending:   orders.filter((o) => o.status === 'Pending').length,
    active:    orders.filter((o) => ['Preparing', 'Ready', 'Out for Delivery'].includes(o.status)).length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
  }), [orders])

  const filtered = useMemo(() => {
    let list = orders
    if (statusFilter !== 'All') list = list.filter((o) => o.status === statusFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((o) =>
        o.order_id.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q)
      )
    }
    return list
  }, [orders, search, statusFilter])

  const hasFilter = search.trim() || statusFilter !== 'All'

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Dark header ──────────────────────────────────────────────────────── */}
      <div className="bg-ink pt-20 pb-8 px-5">
        <div className="max-w-4xl mx-auto flex items-start justify-between gap-4">
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-widest mb-1">
              Teez Lounge
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm text-white/40 mt-1">Order Management System</p>
          </div>

          <button
            type="button"
            onClick={() => loadOrders(true)}
            disabled={loading || refreshing}
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/10 transition-colors disabled:opacity-40"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-16 space-y-5 mt-6">

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <StatCard label="Total Orders"  value={stats.total}     accent="text-ink" />
            <StatCard label="Pending"       value={stats.pending}   accent="text-amber-500" />
            <StatCard label="In Progress"   value={stats.active}    accent="text-blue-500" />
            <StatCard label="Delivered"     value={stats.delivered} accent="text-green-600" />
          </motion.div>
        )}

        {/* ── Search + filter ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, name, or phone…"
              className="w-full rounded-xl border border-beige bg-white pl-9 pr-4 py-3 text-sm text-ink placeholder-muted/50 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-beige bg-white px-4 py-3 text-sm text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors sm:w-48"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* ── Loading ───────────────────────────────────────────────────────── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={32} className="animate-spin text-gold" />
            <p className="text-sm text-muted">Loading orders…</p>
          </div>
        )}

        {/* ── Error ─────────────────────────────────────────────────────────── */}
        {error && !loading && (
          <div className="rounded-2xl bg-red-50 border border-red-100 p-6 flex items-start gap-3">
            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700 text-sm">Failed to load orders</p>
              <p className="text-xs text-red-400 mt-0.5">{error}</p>
              <button
                type="button"
                onClick={() => loadOrders()}
                className="mt-3 text-xs font-semibold text-red-600 underline hover:text-red-800"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* ── Empty state ───────────────────────────────────────────────────── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={40} className="text-muted/30 mb-4" strokeWidth={1.5} />
            <p className="font-serif text-xl font-bold text-ink">
              {hasFilter ? 'No matching orders' : 'No orders yet'}
            </p>
            <p className="text-sm text-muted mt-1.5 max-w-xs">
              {hasFilter
                ? 'Try clearing your search or changing the status filter.'
                : 'Orders will appear here as soon as customers start placing them.'}
            </p>
            {hasFilter && (
              <button
                type="button"
                onClick={() => { setSearch(''); setFilter('All') }}
                className="mt-4 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* ── Order list ────────────────────────────────────────────────────── */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-muted font-semibold">
              {filtered.length} order{filtered.length !== 1 ? 's' : ''}
              {hasFilter && ' matching your filter'}
            </p>

            {filtered.map((order) => (
              <OrderCard
                key={order.order_id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
