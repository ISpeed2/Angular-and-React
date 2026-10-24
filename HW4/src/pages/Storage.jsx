import { useEffect, useState } from 'react';
import useLocalStorage, { readStored } from '../hooks/useLocalStorage';
export default function Storage({ onReset }) {
  const [count, setCount, countError] = useLocalStorage('hw4:count', 0, Number.isSafeInteger);
  const [note, setNote] = useState(() => readStored('hw4:note', '', value => typeof value === 'string'));
  const [status, setStatus] = useState('Сохранено');
  useEffect(() => {
    const timer = setTimeout(() => {
      try { localStorage.setItem('hw4:note', JSON.stringify(note)); setStatus('Сохранено'); }
      catch { setStatus('Ошибка сохранения'); }
    }, 500);
    return () => clearTimeout(timer);
  }, [note]);
  return <section className="card"><p className="eyebrow">Упражнения 1–4</p><h2>Локальное хранилище</h2><h3>1. Счётчик с сохранением</h3><div className="toolbar"><button aria-label="Уменьшить счётчик" onClick={() => setCount(n => n - 1)}>−</button><output className="counter">{count}</output><button aria-label="Увеличить счётчик" onClick={() => setCount(n => n + 1)}>+</button></div>{countError && <p role="alert" className="error">{countError}</p>}
  <h3>2. Тема с сохранением</h3><p>Переключатель в шапке работает на всех страницах. Тема применяется до первого отображения приложения.</p>
  <h3>3. Черновик заметки</h3><label>Текст заметки<textarea value={note} onChange={e => { setNote(e.target.value); setStatus('Ожидание сохранения…'); }} placeholder="Начните писать…" /></label><p className="hint" role="status">{status} · задержка 500 мс. Дождитесь сохранения перед переходом.</p>
  <h3>4. Очистка с подтверждением</h3><p>Сбрасывает задачи, счётчик, тему и заметку этой домашней работы.</p><button className="danger" onClick={() => { if (window.confirm('Сбросить все данные HW4: задачи, счётчик, тему и заметку?')) onReset(); }}>Сбросить всё</button></section>;
}
