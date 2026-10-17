import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState('1');
  const numericStep = Number(step);
  const validStep = step.trim() !== '' && Number.isFinite(numericStep) && numericStep > 0;

  return (
    <section className="card">
      <h2>1. Счётчик с шагом</h2>
      <label>Шаг<input type="number" min="0" step="any" value={step} onChange={(e) => setStep(e.target.value)} /></label>
      {!validStep && <p className="error">Введите положительное число.</p>}
      <div className="toolbar">
        <button disabled={!validStep} onClick={() => setCount((prev) => prev - numericStep)}>-1</button>
        <output aria-live="polite">{count}</output>
        <button disabled={!validStep} onClick={() => setCount((prev) => prev + numericStep)}>+1</button>
      </div>
      <p className="hint">Кнопки изменяют значение на указанный шаг.</p>
    </section>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = email.trim() !== '' && password.trim() !== '';

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    window.alert(`Вход выполнен: ${email.trim()}`);
  }

  return (
    <section className="card">
      <h2>3. Форма логина</h2>
      <form onSubmit={handleSubmit}>
        <label>Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Пароль<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button disabled={!canSubmit}>Войти</button>
      </form>
      <p className="hint">Учебная форма: отправка показывает alert.</p>
    </section>
  );
}

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    const item = { id: crypto.randomUUID(), text: text.trim() };
    setItems((prev) => [...prev, item]);
    setText('');
  }

  return (
    <section className="card">
      <h2>4. Список покупок</h2>
      <form className="toolbar" onSubmit={handleSubmit}>
        <label className="grow">Товар<input value={text} onChange={(e) => setText(e.target.value)} /></label>
        <button disabled={!text.trim()}>Добавить товар</button>
      </form>
      {items.length === 0 ? <p className="hint">Список покупок пуст.</p> : (
        <ul className="shopping-list">
          {items.map((item) => <li key={item.id}><span>{item.text}</span><button onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))} aria-label={`Удалить товар: ${item.text}`}>Удалить</button></li>)}
        </ul>
      )}
    </section>
  );
}

export default function StateExercises() {
  return <div className="exercises"><Counter /><LoginForm /><ShoppingList /></div>;
}
