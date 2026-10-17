import { useState } from 'react';

const priorities = { low: 'Низкий', medium: 'Средний', high: 'Высокий' };

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');

  function startEditing() {
    setEditText(todo.text);
    setError('');
    setIsEditing(true);
  }

  function handleSave() {
    const trimmed = editText.trim();
    if (!trimmed) {
      setError('Название задачи не может быть пустым.');
      return;
    }
    onEdit(todo.id, trimmed);
    setIsEditing(false);
    setError('');
  }

  function handleCancel() {
    setEditText(todo.text);
    setIsEditing(false);
    setError('');
  }

  return (
    <li className={`todo-row priority-${todo.priority}`}>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} aria-label={`Выполнено: ${todo.text}`} />
      <div>
        {isEditing ? (
          <>
            <input aria-label="Название задачи" aria-invalid={Boolean(error)} aria-describedby={error ? `error-${todo.id}` : undefined} value={editText} autoFocus
              onChange={(e) => { setEditText(e.target.value); setError(''); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); handleSave(); }
                if (e.key === 'Escape') handleCancel();
              }} />
            {error && <p className="error" role="alert" id={`error-${todo.id}`}>{error}</p>}
          </>
        ) : <span className={todo.done ? 'completed' : ''} onDoubleClick={startEditing}>{todo.text}</span>}
        <small>{priorities[todo.priority]} приоритет</small>
      </div>
      <time dateTime={todo.createdAt}>{new Date(todo.createdAt).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</time>
      <div className="todo-actions">
        {isEditing ? <><button onClick={handleSave}>Сохранить</button><button onClick={handleCancel}>Отмена</button></> : <>
          <button onClick={startEditing} aria-label={`Редактировать: ${todo.text}`}>Изменить</button>
          <button onClick={() => onDelete(todo.id)} aria-label={`Удалить задачу: ${todo.text}`}>Удалить</button>
        </>}
      </div>
    </li>
  );
}
