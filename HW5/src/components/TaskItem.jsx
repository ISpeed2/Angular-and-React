import { memo, useCallback } from 'react';
import { useTasksDispatch } from '../hooks/useTasks';
const TaskItem = memo(function TaskItem({ task }) {
  const dispatch = useTasksDispatch();
  const handleToggle = useCallback(() => dispatch({ type: 'TOGGLE', payload: task.id }), [dispatch, task.id]);
  const handleDelete = useCallback(() => dispatch({ type: 'DELETE', payload: task.id }), [dispatch, task.id]);
  if (import.meta.env.DEV) console.log('render TaskItem', task.text);
  return <li className="todo"><label className="check"><input type="checkbox" checked={task.done} onChange={handleToggle}/><span className={task.done ? 'done' : ''}>{task.text}</span></label><button className="danger" onClick={handleDelete} aria-label={`Удалить задачу ${task.text}`}>Удалить</button></li>;
});
export default TaskItem;
