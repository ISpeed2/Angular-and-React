import { useState } from 'react';
import { Link } from 'react-router';

// Один элемент списка. Принимает:
//   todo — объект задачи
//   onToggle — переключить done
//   onDelete — удалить
//   onEdit — сохранить новое название
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  // Локальное состояние редактирования — НЕ нужно родителю
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  // Цвет левой полоски по приоритету
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  function handleSave() {
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.title); // откатываем изменения
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className="todo-row"
      style={{
        borderBottom: '1px solid #eee',
        borderLeft: `4px solid ${priorityColors[todo.priority]}`,
      }}
    >
      <input
        type="checkbox"
        aria-label={`Выполнено: ${todo.title}`}
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      {/* Условный рендер: редактируем или показываем текст */}
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ddd' }}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            cursor: 'pointer',
            textDecoration: todo.done ? 'line-through' : 'none',
            color: todo.done ? '#999' : '#1e293b',
          }}
        >
          <Link to={`/tasks/${todo.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{todo.title}</Link>
        </span>
      )}

      <time dateTime={todo.createdAt} style={{ fontSize: 14, color: '#64748b' }}>
        {new Date(todo.createdAt).toLocaleString('ru-RU', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          timeZone: 'Europe/Moscow',
        })}
      </time>

      {/* Кнопки: показать в режиме редактирования, иначе — удалить */}
      <div className="todo-actions">
      {isEditing ? (
        <>
          <button onClick={handleSave} style={{ cursor: 'pointer' }}>
            💾
          </button>
          <button onClick={handleCancel} style={{ cursor: 'pointer' }}>
            ✖️
          </button>
        </>
      ) : (
        <>
        <button aria-label="Редактировать задачу" onClick={() => setIsEditing(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18 }}>✎</button>
        <button
          aria-label="Удалить задачу"
          onClick={() => onDelete(todo.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 18,
            color: '#ef4444',
          }}
        >
          ✕
        </button>
        </>
      )}
      </div>
    </li>
  );
}

export default TodoItem;
