import { useSearchParams } from 'react-router';
import TodoForm from '../components/TodoForm';
import Filters from '../components/Filters';
import TodoList from '../components/TodoList';

export default function TasksPage({ tasks, counts, onAdd, onToggle, onDelete, onEdit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedFilter = searchParams.get('filter');
  const filter = ['active', 'done'].includes(requestedFilter) ? requestedFilter : 'all';
  const visibleTasks = tasks.filter((task) => filter === 'active' ? !task.done : filter === 'done' ? task.done : true);
  function changeFilter(value) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value === 'all') next.delete('filter');
      else next.set('filter', value);
      return next;
    });
  }
  return (
    <>
      <h1>📝 Todo List</h1>
      <TodoForm onAdd={onAdd} />
      <Filters current={filter} onChange={changeFilter} counts={counts} />
      <TodoList todos={visibleTasks} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
    </>
  );
}
