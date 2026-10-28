import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useReducer, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { cartReducer, cartTotal } from '../state/cart';
const ThemeContext = createContext(null);
const AuthContext = createContext(null);
const CartContext = createContext(null);
const CartDispatchContext = createContext(null);
function useRequired(context, name) {
  const value = useContext(context);
  if (value === null) throw new Error(`${name} должен использоваться внутри своего Provider`);
  return value;
}
export const useTheme = () => useRequired(ThemeContext, 'useTheme');
export const useAuth = () => useRequired(AuthContext, 'useAuth');
export const useCart = () => useRequired(CartContext, 'useCart');
export const useCartDispatch = () => useRequired(CartDispatchContext, 'useCartDispatch');
export function ThemeProvider({ children }) {
  const [theme, setTheme, error] = useLocalStorage('hw5:theme', 'light', value => ['light', 'dark'].includes(value));
  useLayoutEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  const toggleTheme = useCallback(() => setTheme(theme => theme === 'light' ? 'dark' : 'light'), [setTheme]);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{error && <p role="alert" className="error storage-error">{error}</p>}{children}</ThemeContext.Provider>;
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = useCallback(name => { if (name.trim()) setUser({ name: name.trim() }); }, []);
  const logout = useCallback(() => setUser(null), []);
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const value = useMemo(() => ({ items, total: cartTotal(items), count: items.reduce((sum, item) => sum + item.quantity, 0) }), [items]);
  return <CartContext.Provider value={value}><CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider></CartContext.Provider>;
}
