import { useState } from 'react';

// Форма добавления задачи.
// Принимает onAdd — колбэк от родителя.
function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    // Вызываем колбэк родителя, передавая ему данные
    onAdd({ text: trimmed, priority });

    // Сбрасываем форму
    setText('');
    setPriority('medium');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: 8, marginBottom: 16 }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
        style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      />

      {/* Select приоритета */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;
