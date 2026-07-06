import { createContext, useContext, useReducer, useEffect } from 'react'

export const DELIVERY_FEE = 20

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    case 'DECREMENT': {
      const item = state.items.find((i) => i.id === action.id)
      if (!item) return state
      if (item.quantity <= 1) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      }
    }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'OPEN_DRAWER':
      return { ...state, drawerOpen: true }
    case 'CLOSE_DRAWER':
      return { ...state, drawerOpen: false }
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen }
    default:
      return state
  }
}

function loadSavedCart() {
  try {
    const raw = localStorage.getItem('teez-cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadSavedCart(),
    drawerOpen: false,
  })

  useEffect(() => {
    localStorage.setItem('teez-cart', JSON.stringify(state.items))
  }, [state.items])

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  const value = {
    items: state.items,
    drawerOpen: state.drawerOpen,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', item }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
    increment: (id) => dispatch({ type: 'INCREMENT', id }),
    decrement: (id) => dispatch({ type: 'DECREMENT', id }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
    openDrawer: () => dispatch({ type: 'OPEN_DRAWER' }),
    closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
    toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
