import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultPostValues, postSchema, toPostFormValues } from '../schemas/postSchema';

function FieldError({ error }) {
  return error ? <p className="field-error" role="alert">{error.message}</p> : null;
}

export default function PostForm({ initialData, onSubmit }) {
  const isEdit = Boolean(initialData);
  const { register, control, handleSubmit, setError, formState: { errors, isSubmitting, isValid, isDirty } } = useForm({
    resolver: zodResolver(postSchema), mode: 'onChange',
    defaultValues: initialData ? toPostFormValues(initialData) : defaultPostValues,
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'tags' });

  async function submit(data) {
    try {
      await onSubmit(data);
    } catch (error) {
      if (error.field && ['title', 'body', 'userId', 'tags', 'status', 'publishDate'].includes(error.field)) {
        setError(error.field, { type: 'server', message: error.message });
      } else {
        setError('root.serverError', { type: 'server', message: error.message || 'Не удалось сохранить пост' });
      }
    }
  }

  return <form className="lesson-form" noValidate onSubmit={handleSubmit(submit)}>
    <div className="form-field"><label htmlFor="post-title">Заголовок</label><input id="post-title" {...register('title')} aria-invalid={Boolean(errors.title)} /><FieldError error={errors.title} /></div>
    <div className="form-field"><label htmlFor="post-body">Текст</label><textarea id="post-body" rows={5} {...register('body')} aria-invalid={Boolean(errors.body)} /><FieldError error={errors.body} /></div>
    <div className="form-field"><label htmlFor="post-user">ID автора</label><input id="post-user" type="number" {...register('userId')} aria-invalid={Boolean(errors.userId)} /><FieldError error={errors.userId} /></div>
    <fieldset className="order-item"><legend>Теги</legend>
      {fields.map((field, index) => <div className="form-field" key={field.id}>
        <label htmlFor={'post-tag-' + field.id}>Тег {index + 1}</label>
        <div className="button-row"><input id={'post-tag-' + field.id} {...register('tags.' + index + '.value')} aria-invalid={Boolean(errors.tags?.[index]?.value)} />
          <button type="button" className="secondary-button" onClick={() => remove(index)}>Удалить</button></div>
        <FieldError error={errors.tags?.[index]?.value} />
      </div>)}
      {(errors.tags?.root || errors.tags?.message) && <FieldError error={errors.tags.root || errors.tags} />}
      <button type="button" className="secondary-button" onClick={() => append({ value: '' })} disabled={fields.length >= 5}>Добавить тег</button>
    </fieldset>
    <div className="form-field"><label htmlFor="post-status">Статус</label><select id="post-status" {...register('status')}><option value="draft">Черновик</option><option value="published">Опубликован</option></select><FieldError error={errors.status} /></div>
    <div className="form-field"><label htmlFor="post-date">Дата публикации</label><input id="post-date" type="date" {...register('publishDate')} aria-invalid={Boolean(errors.publishDate)} /><FieldError error={errors.publishDate} /></div>
    {errors.root?.serverError && <FieldError error={errors.root.serverError} />}
    <button className="primary-button" disabled={!isValid || isSubmitting || (isEdit && !isDirty)}>{isSubmitting ? 'Сохранение...' : 'Сохранить'}</button>
  </form>;
}
