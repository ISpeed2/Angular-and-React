import { useRef, useState } from 'react';
import { validateForm } from '../utils/validation';
import { Card, Field } from './Shared';
const initial = { name: '', email: '', password: '', confirmPassword: '', age: '', agree: false };
export default function RegistrationForm() {
  const [form, setForm] = useState(initial);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState('');
  const nameRef = useRef(null);
  const fieldsRef = useRef({});
  const errors = validateForm(form);
  const isValid = Object.keys(errors).length === 0;
  function change(e) {
    const { name, value, type, checked } = e.target;
    setRegistered('');
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }
  function blur(e) { setTouched((prev) => ({ ...prev, [e.target.name]: true })); }
  function reset() { setForm(initial); setTouched({}); setShowPassword(false); nameRef.current?.focus(); }
  function submit(e) {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(initial).map((key) => [key, true])));
    if (!isValid) { fieldsRef.current[Object.keys(errors)[0]]?.focus(); return; }
    setRegistered(form.name.trim());
    reset();
  }
  return <Card title="Практика 6 · Регистрация"><form noValidate onSubmit={submit}>
    {Object.entries({ name: 'Имя', email: 'Email', password: 'Пароль', confirmPassword: 'Повтор пароля', age: 'Возраст' }).map(([name, label]) => <Field key={name} name={name} label={label} value={form[name]} errors={errors} touched={touched} onChange={change} onBlur={blur} autoFocus={name === 'name'} autoComplete={name === 'confirmPassword' || name === 'password' ? 'new-password' : name === 'age' ? 'off' : name} type={name === 'password' ? (showPassword ? 'text' : 'password') : name === 'confirmPassword' ? 'password' : name === 'age' ? 'number' : name === 'email' ? 'email' : 'text'} ref={(node) => { fieldsRef.current[name] = node; if (name === 'name') nameRef.current = node; }}/>) }
    <button type="button" aria-pressed={showPassword} onClick={() => setShowPassword((v) => !v)}>{showPassword ? 'Скрыть пароль' : 'Показать пароль'}</button>
    <label className="checkbox"><input ref={(node) => { fieldsRef.current.agree = node; }} name="agree" type="checkbox" checked={form.agree} onChange={change} onBlur={blur} aria-invalid={Boolean(touched.agree && errors.agree)}/>Согласен с условиями</label>{touched.agree && errors.agree && <p className="error">{errors.agree}</p>}
    <div className="toolbar"><button disabled={!isValid}>Зарегистрироваться</button><button type="button" onClick={() => { setRegistered(''); reset(); }}>Сбросить</button></div>
    {registered && <p role="status" className="success">Спасибо, {registered}! Форма успешно заполнена.</p>}
  </form></Card>;
}
