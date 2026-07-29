import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getAllProducts } from './data/categories';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...product, quantity }];
    });
    setLastAdded(product);
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    }
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + (i.price || 0) * i.quantity, 0);
  const vat = subtotal * 0.18;
  const total = subtotal + vat;

  const recommendations = useMemo(() => {
    const all = getAllProducts();
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, []);

  return (
    <CartContext.Provider value={{
      items, addItem, updateQty, removeItem,
      totalItems, subtotal, vat, total,
      drawerOpen, openDrawer, closeDrawer, lastAdded,
      recommendations
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
