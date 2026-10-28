import { useState } from 'react';

// Форма добавления задачи.
// Принимает onAdd — колбэк от родителя.
function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    // Вызываем колбэк родителя, передавая ему данные
    onAdd({ title: trimmed, description: description.trim(), priority });

    // Сбрасываем форму
    setText('');
    setDescription('');
    setPriority('medium');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}
    >
      <input
        aria-label="Название задачи"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
        style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      />

      <input
        aria-label="Описание задачи"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание (необязательно)"
        style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      />

      {/* Select приоритета */}
      <select
        aria-label="Приоритет"
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
