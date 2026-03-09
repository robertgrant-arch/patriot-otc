'use client'
// Fix #5: Split CartContext into state + actions contexts to prevent global re-renders
// Actions context is stable (memoized) — only state consumers re-render on cart changes

import { createContext, useContext, useReducer, useMemo } from 'react'
import type { Product } from '@/data/products'

export interface CartItem extends Product { qty: number }
interface CartState { items: CartItem[] }

type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...action.product, qty: 1 }] }
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

// Separate contexts: state consumers don't re-render on action reference changes
const CartStateContext = createContext<CartState>({ items: [] })
const CartActionsContext = createContext<{
  addItem: (p: Product) => void
  removeItem: (id: string) => void
  clearCart: () => void
}>({ addItem: () => {}, removeItem: () => {}, clearCart: () => {} })

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Fix #5: Actions object is stable — never triggers re-renders in action consumers
  const actions = useMemo(() => ({
    addItem:    (product: Product) => dispatch({ type: 'ADD', product }),
    removeItem: (id: string)       => dispatch({ type: 'REMOVE', id }),
    clearCart:  ()                 => dispatch({ type: 'CLEAR' }),
  }), [])

  return (
    <CartActionsContext.Provider value={actions}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartActionsContext.Provider>
  )
}

// Derived selectors — compute only what's needed
export function useCartItems()   { return useContext(CartStateContext).items }
export function useCartCount()   { return useContext(CartStateContext).items.reduce((n, i) => n + i.qty, 0) }
export function useCartTotal()   { return useContext(CartStateContext).items.reduce((s, i) => s + i.price * i.qty, 0) }
export function useCartActions() { return useContext(CartActionsContext) }

// Legacy combined hook for pages that need both
export function useCart() {
  const items   = useCartItems()
  const actions = useCartActions()
  const count   = items.reduce((n, i) => n + i.qty, 0)
  const total   = items.reduce((s, i) => s + i.price * i.qty, 0)
  return { items, count, total, ...actions }
}
