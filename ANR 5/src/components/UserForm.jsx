import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../schemas/userSchema';
import FormField from './FormField';

export default function UserForm({ onSubmit }) {
  const [created, setCreated] = useState(null);
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting, isValid, isDirty } } = useForm({
    resolver: zodResolver(userSchema), mode: 'onChange',
    defaultValues: { name: '', email: '', age: '', role: 'viewer', password: '', confirmPassword: '', bio: '' },
  });
  async function submit(data) {
    setCreated(null);
    try {
      const user = await onSubmit(data);
      setCreated(user);
      reset();
    } catch (error) {
      setError(error.field === 'email' ? 'email' : 'root', { type: 'server', message: error.message });
    }
  }
  const field = { register, errors };
  return <>
    <p>Для проверки ошибки сервера используйте taken@example.com.</p>
    <form className="lesson-form" onSubmit={handleSubmit(submit)} noValidate>
      <FormField {...field} name="name" label="Имя" autoComplete="name" />
      <FormField {...field} name="email" label="Email" type="email" autoComplete="email" />
      <FormField {...field} name="age" label="Возраст" type="number" />
      <FormField {...field} name="role" label="Роль" type="select">
        <option value="viewer">Читатель</option><option value="editor">Редактор</option><option value="admin">Администратор</option>
      </FormField>
      <FormField {...field} name="password" label="Пароль" type="password" autoComplete="new-password" />
      <FormField {...field} name="confirmPassword" label="Повтор пароля" type="password" autoComplete="new-password" />
      <FormField {...field} name="bio" label="О себе" type="textarea" />
      {errors.root && <p role="alert" className="field-error">{errors.root.message}</p>}
      <button className="primary-button" disabled={!isValid || !isDirty || isSubmitting}>{isSubmitting ? 'Отправка...' : 'Создать'}</button>
    </form>
    {created && <p role="status">Пользователь {created.name} ({created.email}) создан. Роль: {created.role}.</p>}
  </>;
}
