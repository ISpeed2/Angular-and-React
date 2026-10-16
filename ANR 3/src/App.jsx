import { useState } from 'react';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import TodoList from './components/TodoList';

function App() {
  // ---- Состояние ----
  const [todos, setTodos] = useState(() => [
    { id: 1, text: 'Изучить useState', done: true, priority: 'high' },
    { id: 2, text: 'Разобраться со списками', done: false, priority: 'medium' },
    { id: 3, text: 'Сделать todo', done: false, priority: 'low' },
  ].map((todo) => ({ ...todo, createdAt: new Date().toISOString() })));
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'

  // ---- Колбэки для детей ----

  function addTodo({ text, priority }) {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  // ---- Вычисляемые данные ----

  // Подсчёты (пересчитываются при каждом рендере — это нормально для маленьких списков)
  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  };

  // Отфильтрованный список по текущему фильтру.
  // Логика: для 'all' — все; 'active' — только невыполненные; 'done' — только выполненные.
  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true; // 'all'
  });

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <h1>📝 Todo List</h1>

      <TodoForm onAdd={addTodo} />

      <Filters current={filter} onChange={setFilter} counts={counts} />

      {/* Условный рендер: если фильтр "done" и задач нет — особое сообщение */}
      {filter === 'done' && visibleTodos.length === 0 && counts.all > 0 && (
        <p style={{ color: '#f59e0b', fontStyle: 'italic' }}>
          Пока нет выполненных задач. Отметь что-нибудь ✅
        </p>
      )}

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
