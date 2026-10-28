export const ACTIONS = { ADD: 'ADD', TOGGLE: 'TOGGLE', DELETE: 'DELETE', HYDRATE: 'HYDRATE' };
export function isTasks(value) {
  return Array.isArray(value) && value.every(task => task && typeof task.id === 'string' && typeof task.text === 'string' && typeof task.done === 'boolean') && new Set(value.map(task => task.id)).size === value.length;
}
export function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: return [action.payload, ...state];
    case ACTIONS.TOGGLE: return state.map(task => task.id === action.payload ? { ...task, done: !task.done } : task);
    case ACTIONS.DELETE: return state.filter(task => task.id !== action.payload);
    case ACTIONS.HYDRATE: return isTasks(action.payload) ? action.payload : state;
    default: throw new Error(`Неизвестное действие задач: ${action.type}`);
  }
}
