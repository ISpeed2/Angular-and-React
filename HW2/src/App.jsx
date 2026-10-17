import { useState } from 'react';
import StateExercises from './components/StateExercises';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import TodoList from './components/TodoList';

function createInitialTodos() {
  const now = Date.now();
  return [
    { id: 'initial-1', text: 'Изучить useState', done: true, priority: 'high' },
    { id: 'initial-2', text: 'Разобраться со списками', done: false, priority: 'medium' },
    { id: 'initial-3', text: 'Сделать todo', done: false, priority: 'low' },
  ].map((todo, index) => ({ ...todo, createdAt: new Date(now + index).toISOString() }));
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [todos, setTodos] = useState(createInitialTodos);
  const [filter, setFilter] = useState('all');
  const [priority, setPriority] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [search, setSearch] = useState('');

  function addTodo({ text, priority }) {
    if (!text.trim()) return;
    const todo = { id: crypto.randomUUID(), text: text.trim(), priority, done: false, createdAt: new Date().toISOString() };
    setTodos((prev) => [...prev, todo]);
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function editTodo(id, text) {
    if (!text.trim()) return;
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, text: text.trim() } : todo));
  }

  const counts = {
    all: todos.length,
    active: todos.filter((todo) => !todo.done).length,
    done: todos.filter((todo) => todo.done).length,
  };
  const progress = counts.all === 0 ? 0 : Math.round(counts.done / counts.all * 100);
  const query = search.trim().toLocaleLowerCase('ru-RU');
  // filter создаёт новый массив: sort не изменяет исходное состояние.
  const visibleTodos = todos.filter((todo) => {
    const matchesStatus = filter === 'all' || (filter === 'done' ? todo.done : !todo.done);
    const matchesPriority = priority === 'all' || todo.priority === priority;
    return matchesStatus && matchesPriority && todo.text.toLocaleLowerCase('ru-RU').includes(query);
  }).sort((a, b) => sortBy === 'alphabet'
    ? a.text.localeCompare(b.text, 'ru')
    : Date.parse(a.createdAt) - Date.parse(b.createdAt));

  return (
    <div className="app" data-theme={theme}>
      <main>
        <header>
          <div><p className="eyebrow">Homework / HW2</p><h1>Состояние, события и списки</h1></div>
          <button aria-label="Переключить тему" onClick={() => setTheme((prev) => prev === 'light' ? 'dark' : 'light')}>
            2. Тема: {theme}
          </button>
        </header>
        <StateExercises />
        <section className="card">
          <h2>5–10. Todo List</h2>
          <TodoForm onAdd={addTodo} />
          <Filters current={filter} onChange={setFilter} counts={counts} />
          <div className="toolbar">
            <label>Фильтр по приоритету<select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="all">Все приоритеты</option><option value="high">Высокий</option><option value="medium">Средний</option><option value="low">Низкий</option>
            </select></label>
            <label className="grow">Поиск задач<input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по названию" /></label>
            <button onClick={() => setSortBy((prev) => prev === 'date' ? 'alphabet' : 'date')}>
              Сортировка: {sortBy === 'date' ? 'по дате добавления' : 'по алфавиту'}
            </button>
          </div>
          <p className="hint">По дате — сначала старые. Фильтры и поиск работают вместе.</p>
          <label className="progress-label">Выполнено: {counts.done}/{counts.all} ({progress}%)
            <progress aria-label="Прогресс выполнения всех задач" value={counts.done} max={counts.all || 1} />
          </label>
          <div className="toolbar" role="group" aria-label="Массовые операции">
            <button disabled={counts.active === 0} onClick={() => setTodos((prev) => prev.map((todo) => ({ ...todo, done: true })))}>Отметить все</button>
            <button disabled={counts.done === 0} onClick={() => setTodos((prev) => prev.filter((todo) => !todo.done))}>Удалить выполненные</button>
            <button disabled={counts.all === 0} onClick={() => setTodos([])}>Очистить всё</button>
          </div>
          <p className="hint">Прогресс и массовые операции относятся ко всем задачам, включая скрытые фильтрами.</p>
          <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
        </section>
      </main>
    </div>
  );
}
