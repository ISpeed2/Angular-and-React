import { useEffect, useRef, useState } from 'react';
import { cities, validateCity, validateReview } from '../utils/validation';
import { Card, Field } from './Shared';

export function ReviewForm() {
  const initial = { name: '', rating: '', text: '' };
  const [form, setForm] = useState(initial);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const errors = validateReview(form);
  function change(e) { setSent(false); setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })); }
  function blur(e) { setTouched((prev) => ({ ...prev, [e.target.name]: true })); }
  return <Card title="5 · Форма отзыва"><form noValidate onSubmit={(e) => { e.preventDefault(); if (Object.keys(errors).length) return; setForm(initial); setTouched({}); setSent(true); }}>
    <Field label="Имя автора" name="name" value={form.name} onChange={change} onBlur={blur} errors={errors} touched={touched}/>
    <label>Оценка<select name="rating" value={form.rating} onChange={change} onBlur={blur}><option value="">Выберите оценку</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{'★'.repeat(n)}</option>)}</select>{touched.rating && <span className="error">{errors.rating}</span>}</label>
    <label>Текст отзыва<textarea name="text" value={form.text} onChange={change} onBlur={blur}/>{touched.text && <span className="error">{errors.text}</span>}</label><button disabled={Object.keys(errors).length > 0}>Отправить отзыв</button>{sent && <p role="status" className="success">Отзыв принят, форма сброшена.</p>}
  </form></Card>;
}
export function DependentForm() {
  const [country, setCountry] = useState('Россия');
  const [city, setCity] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const error = validateCity(country, city);
  return <Card title="6 · Страна и город"><form onSubmit={(e) => { e.preventDefault(); setTouched(true); if (!error) setSent(true); }} noValidate><label>Страна<select value={country} onChange={(e) => { setCountry(e.target.value); setSent(false); }}>{Object.keys(cities).map((name) => <option key={name}>{name}</option>)}</select></label><label>Город<input value={city} onChange={(e) => { setCity(e.target.value); setSent(false); }} onBlur={() => setTouched(true)} placeholder={cities[country].join(', ')} aria-invalid={touched && Boolean(error)}/></label>{touched && error && <p className="error">{error}</p>}<button>Проверить город</button>{sent && !error && <p role="status" className="success">{country}, {city.trim()} — город подходит.</p>}</form></Card>;
}
export function FocusForm() {
  const [form, setForm] = useState({ contactName: '', contactEmail: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const refs = useRef({});
  const errors = { ...(form.contactName.trim().length < 2 && { contactName: 'Минимум 2 символа' }), ...(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim()) && { contactEmail: 'Введите корректный email' }) };
  return <Card title="7 · Фокус на первой ошибке"><form noValidate onSubmit={(e) => { e.preventDefault(); setSubmitted(true); const first = Object.keys(errors)[0]; if (first) refs.current[first]?.focus(); else setSent(true); }}>{[['contactName', 'Контактное имя'], ['contactEmail', 'Контактный email']].map(([name, label]) => <Field key={name} name={name} label={label} type={name === 'contactEmail' ? 'email' : 'text'} ref={(node) => { refs.current[name] = node; }} value={form[name]} onChange={(e) => { setForm((prev) => ({ ...prev, [name]: e.target.value })); setSent(false); }} errors={errors} touched={{ [name]: submitted }}/ >)}<button>Отправить и проверить</button>{sent && <p role="status" className="success">Данные корректны.</p>}</form></Card>;
}
export function FileInput() {
  const fileRef = useRef(null);
  const [filename, setFilename] = useState('');
  return <Card title="8 · Файловый input"><label>Выберите файл<input type="file" ref={fileRef} onChange={() => setFilename(fileRef.current?.files?.[0]?.name || '')}/></label><p role="status">{filename ? `Выбран: ${filename}` : 'Файл не выбран'}</p><button onClick={() => { fileRef.current.value = ''; setFilename(''); }}>Очистить выбор</button></Card>;
}
export function IdleForm() {
  const timerRef = useRef(null);
  const [idle, setIdle] = useState(false);
  function restart() {
    clearTimeout(timerRef.current);
    setIdle(false);
    timerRef.current = setTimeout(() => setIdle(true), 30_000);
  }
  useEffect(() => {
    restart();
    return () => clearTimeout(timerRef.current);
  }, []);
  return <Card title="9 · Таймер бездействия"><form onChange={restart} onFocus={restart} onKeyDown={restart} onPointerDown={restart} onSubmit={(e) => e.preventDefault()}><label>Ваше сообщение<textarea placeholder="Напишите что-нибудь…"/></label><p className="hint">После 30 секунд без действий появится подсказка.</p>{idle && <p role="status">Всё ещё с нами?</p>}</form></Card>;
}
export function MultiStepForm() {
  const initial = { fullName: '', email: '', address: '' };
  const [form, setForm] = useState(initial);
  const [step, setStep] = useState(1);
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  const firstRef = useRef(null);
  const errors = step === 1 ? { ...(form.fullName.trim().length < 2 && { fullName: 'Минимум 2 символа' }), ...(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && { email: 'Введите корректный email' }) } : step === 2 && form.address.trim().length < 5 ? { address: 'Введите адрес (минимум 5 символов)' } : {};
  function move(e) {
    e.preventDefault(); setAttempted(true);
    if (Object.keys(errors).length) { e.currentTarget.elements.namedItem(Object.keys(errors)[0])?.focus(); return; }
    if (step < 3) { setStep((n) => n + 1); setAttempted(false); }
    else { setSent(true); setForm(initial); setStep(1); setAttempted(false); }
  }
  useEffect(() => { firstRef.current?.focus(); }, [step]);
  return <Card title="10 · Многошаговая форма"><p>Шаг {step} из 3 · {['Личные данные', 'Адрес', 'Подтверждение'][step - 1]}</p><progress value={step} max={3} aria-label="Шаг формы"/><form noValidate onSubmit={move}>
    {(step === 1 ? [['fullName', 'ФИО'], ['email', 'Email для подтверждения']] : step === 2 ? [['address', 'Адрес']] : []).map(([name, label], i) => <Field key={name} ref={i === 0 ? firstRef : undefined} name={name} label={label} value={form[name]} onChange={(e) => { setSent(false); setForm((prev) => ({ ...prev, [name]: e.target.value })); }} errors={errors} touched={{ [name]: attempted }}/>) }
    {step === 3 && <dl><dt>Имя</dt><dd>{form.fullName}</dd><dt>Email</dt><dd>{form.email}</dd><dt>Адрес</dt><dd>{form.address}</dd></dl>}
    <div className="toolbar">{step > 1 && <button type="button" onClick={() => { setStep((n) => n - 1); setAttempted(false); }}>Назад</button>}<button key={step} ref={step === 3 ? firstRef : undefined}>{step === 3 ? 'Подтвердить' : 'Далее'}</button></div>{sent && <p role="status" className="success">Данные подтверждены, форма сброшена.</p>}
  </form></Card>;
}
