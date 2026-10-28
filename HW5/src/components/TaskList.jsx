import { useMemo, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';
export default function TaskList() {
  const tasks = useTasks();
  const [filter, setFilter] = useState('all');
  const visibleTasks = useMemo(() => {
    if (import.meta.env.DEV) console.log('Пересчёт фильтрации');
    return tasks.filter(task => filter === 'all' || (filter === 'done' ? task.done : !task.done));
  }, [tasks, filter]);
  return <><div className="toolbar" aria-label="Фильтр задач">{[['all', 'Все'], ['active', 'Активные'], ['done', 'Готовые']].map(([key, label]) => <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}<span className="hint">Всего: {tasks.length} · Готово: {tasks.filter(task => task.done).length}</span></div>{visibleTasks.length ? <ul className="clean">{visibleTasks.map(task => <TaskItem key={task.id} task={task}/>)}</ul> : <p className="empty">{tasks.length ? 'Нет задач для этого фильтра.' : 'Задач пока нет. Добавьте первую.'}</p>}</>;
}
