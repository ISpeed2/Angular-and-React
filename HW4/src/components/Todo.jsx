import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
const validTodos = value => Array.isArray(value) && value.every(t => t && typeof t.id === 'string' && typeof t.text === 'string' && typeof t.done === 'boolean');
export default function Todo() {
  const [todos, setTodos, error] = useLocalStorage('hw4:todos', [], validTodos);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  function add(event) {
    event.preventDefault();
    if (!text.trim()) return;
    setTodos(previous => [...previous, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText('');
  }
  const visible = todos.filter(t => filter === 'all' || (filter === 'done' ? t.done : !t.done));
  return <section className="card"><p className="eyebrow">Практика · Часть 7</p><h2>Задачи с сохранением</h2><p className="hint">Добавьте задачу и обновите страницу — она останется здесь.</p>
    <form onSubmit={add} className="inline"><label className="grow">Новая задача<input value={text} onChange={e => setText(e.target.value)} maxLength={200} placeholder="Что нужно сделать?" /></label><button className="primary" disabled={!text.trim()}>Добавить</button></form>
    {error && <p role="alert" className="error">{error}</p>}
    <div className="toolbar">{[['all','Все'],['active','Активные'],['done','Выполненные']].map(([id, label]) => <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}</div>
    <p className="hint">Всего: {todos.length} · Выполнено: {todos.filter(t => t.done).length}</p>
    <ul className="clean">{visible.map(todo => <li className="todo" key={todo.id}><label className="check"><input type="checkbox" checked={todo.done} onChange={() => setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, done: !t.done } : t))}/><span className={todo.done ? 'done' : ''}>{todo.text}</span></label><button aria-label={`Удалить: ${todo.text}`} onClick={() => setTodos(prev => prev.filter(t => t.id !== todo.id))}>Удалить</button></li>)}</ul>
    {!visible.length && <p className="empty">{todos.length ? 'В этом фильтре задач пока нет.' : 'Задач пока нет. Добавьте первую!'}</p>}
    <button className="danger" disabled={!todos.length} onClick={() => { if (window.confirm('Удалить все задачи?')) setTodos([]); }}>Очистить задачи</button>
  </section>;
}
