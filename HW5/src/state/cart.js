export const products = [
  { id: 'book', name: 'Книга о React', price: 1500 },
  { id: 'notebook', name: 'Блокнот разработчика', price: 450 },
  { id: 'mug', name: 'Кружка с кодом', price: 800 },
];
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      if (!products.some(product => product.id === action.id)) return state;
      const item = state.find(item => item.id === action.id);
      return item ? state.map(item => item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item) : [...state, { id: action.id, quantity: 1 }];
    }
    case 'DECREASE': return state.flatMap(item => item.id !== action.id ? [item] : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []);
    case 'REMOVE': return state.filter(item => item.id !== action.id);
    case 'CLEAR': return [];
    default: throw new Error(`Неизвестное действие корзины: ${action.type}`);
  }
}
export function cartTotal(items) {
  return items.reduce((total, item) => total + products.find(product => product.id === item.id).price * item.quantity, 0);
}
