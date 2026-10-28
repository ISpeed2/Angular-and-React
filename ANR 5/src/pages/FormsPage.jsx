import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, orderSchema } from '../schemas/userSchema';
import { createUser } from '../api/users';
import UserForm from '../components/UserForm';
import FormField from '../components/FormField';

function LoginForm() {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema), mode: 'onChange', defaultValues: { email: '', password: '' },
  });
  async function submit({ email }) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setMessage(`Данные для ${email} проверены. Это учебная форма без авторизации.`);
    reset();
  }
  return <><form className="lesson-form" noValidate onSubmit={handleSubmit(submit)}>
    <FormField register={register} errors={errors} name="email" id="login-email" label="Email" type="email" autoComplete="username" />
    <FormField register={register} errors={errors} name="password" id="login-password" label="Пароль" type="password" autoComplete="current-password" />
    <button className="primary-button" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Проверка...' : 'Войти'}</button>
  </form>{message && <p role="status">{message}</p>}</>;
}

function OrderForm() {
  const [order, setOrder] = useState(null);
  const { register, control, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: zodResolver(orderSchema), mode: 'onChange', defaultValues: { items: [{ name: '', quantity: 1, price: '' }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  async function submit(data) {
    setOrder(data);
    reset();
  }
  return <><form className="lesson-form" noValidate onSubmit={handleSubmit(submit)}>
    {fields.map((field, index) => <fieldset key={field.id} className="order-item">
      <legend>Товар {index + 1}</legend>
      {[['name', 'Название', 'text'], ['quantity', 'Количество', 'number'], ['price', 'Цена', 'number']].map(([name, label, type]) => {
        const error = errors.items?.[index]?.[name];
        const id = `item-${field.id}-${name}`;
        return <div className="form-field" key={name}><label htmlFor={id}>{label}</label>
          <input id={id} type={type} step={name === 'price' ? 'any' : undefined} {...register(`items.${index}.${name}`)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
          {error && <p role="alert" id={`${id}-error`} className="field-error">{error.message}</p>}
        </div>;
      })}
      <button type="button" className="secondary-button" onClick={() => remove(index)}>Удалить товар {index + 1}</button>
    </fieldset>)}
    {(errors.items?.root?.message || errors.items?.message) && <p role="alert" className="field-error">{errors.items.root?.message || errors.items.message}</p>}
    <div className="button-row"><button type="button" className="secondary-button" onClick={() => append({ name: '', quantity: 1, price: '' })}>Добавить товар</button>
      <button className="primary-button" disabled={!isValid || isSubmitting}>Оформить заказ</button></div>
  </form>{order && <div role="status"><p>Заказ оформлен:</p><ul>{order.items.map((item, index) => <li key={index}>{item.name}: {item.quantity} × {item.price} ₽</li>)}</ul>
    <p>Итого: {order.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toLocaleString('ru-RU')} ₽</p></div>}</>;
}

export default function FormsPage() {
  return <><h1>Формы</h1><section><h2>Создание пользователя</h2><UserForm onSubmit={createUser} /></section>
    <section className="lesson-section"><h2>Вход</h2><LoginForm /></section>
    <section className="lesson-section"><h2>Заказ</h2><OrderForm /></section></>;
}
