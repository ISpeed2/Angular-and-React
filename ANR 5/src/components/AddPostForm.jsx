import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';

export default function AddPostForm() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      setTitle('');
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  function submit(event) {
    event.preventDefault();
    if (title.trim() && !mutation.isPending) mutation.mutate({ title: title.trim(), body: 'Новый пост', userId: 1 });
  }
  return <><form className="post-form" onSubmit={submit}>
    <input aria-label="Заголовок поста" placeholder="Заголовок поста" value={title} onChange={(event) => setTitle(event.target.value)} disabled={mutation.isPending} />
    <button className="primary-button" disabled={!title.trim() || mutation.isPending}>{mutation.isPending ? 'Создание...' : 'Создать'}</button>
  </form>
    {mutation.isError && <p className="field-error" role="alert">Ошибка: {mutation.error.message}. Текст сохранён, попробуйте снова.</p>}
    {mutation.isSuccess && <p role="status">Пост «{mutation.data.title}» отправлен (ID: {mutation.data.id}). Список обновлён. Учебный API не сохраняет изменения.</p>}
  </>;
}
