import { useContext } from 'react';
import { TasksContext, TasksDispatchContext } from '../context/TasksContext';
export function useTasks() {
  const value = useContext(TasksContext);
  if (value === null) throw new Error('useTasks должен использоваться внутри TasksProvider');
  return value;
}
export function useTasksDispatch() {
  const value = useContext(TasksDispatchContext);
  if (value === null) throw new Error('useTasksDispatch должен использоваться внутри TasksProvider');
  return value;
}
