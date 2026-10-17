import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    onAdd({ text: text.trim(), priority });
    setText('');
    setPriority('medium');
  }

  return (
    <form className="toolbar" onSubmit={handleSubmit}>
      <label className="grow">Новая задача<input placeholder="Что нужно сделать?" value={text} onChange={(e) => setText(e.target.value)} /></label>
      <label>Приоритет новой задачи<select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Низкий</option><option value="medium">Средний</option><option value="high">Высокий</option>
      </select></label>
      <button disabled={!text.trim()}>Добавить задачу</button>
    </form>
  );
}
