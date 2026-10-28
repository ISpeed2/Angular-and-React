import { createContext, useEffect, useReducer, useState } from 'react';
import { isTasks, tasksReducer } from '../state/tasks';
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
const STORAGE_KEY = 'hw5:tasks';
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, [], () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return isTasks(saved) ? saved : [];
    } catch { return []; }
  });
  const [error, setError] = useState('');
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); setError(''); }
    catch { setError('Не удалось сохранить задачи. После перезагрузки изменения будут потеряны.'); }
  }, [tasks]);
  return <TasksContext.Provider value={tasks}><TasksDispatchContext.Provider value={dispatch}>
    {error && <p role="alert" className="error storage-error">{error}</p>}{children}
  </TasksDispatchContext.Provider></TasksContext.Provider>;
}
