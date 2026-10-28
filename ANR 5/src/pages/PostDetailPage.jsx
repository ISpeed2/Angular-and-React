import { Link, useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useDeletePost, usePost } from '../hooks/usePosts';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const query = usePost(id);
  const deletion = useDeletePost();

  if (query.isPending) return <p role="status">Загрузка...</p>;
  if (query.isError || !query.data || !query.data.id) return <><h1>Пост не найден</h1>
    <p role="alert" className="field-error">{query.error?.message || 'Пост с таким ID не существует.'}</p><Link to="/posts">← К списку постов</Link></>;

  async function remove() {
    try {
      await deletion.mutateAsync(id);
      queryClient.removeQueries({ queryKey: ['posts', String(id)], exact: true });
      navigate('/posts');
    } catch {
      // useDeletePost откатывает список; сообщение остаётся на странице.
    }
  }

  return <><h1>{query.data.title}</h1><p className="post-body">{query.data.body}</p>
    <p>Автор: {query.data.userId}</p>
    <p>Статус: {query.data.status || 'draft'}</p>
    {query.data.tags?.length > 0 && <p>Теги: {query.data.tags.join(', ')}</p>}
    {deletion.isError && <p role="alert" className="field-error">Ошибка удаления: {deletion.error.message}. Данные восстановлены.</p>}
    <div className="button-row">
      <Link className="secondary-button" to="/posts">← К списку</Link>
      <Link className="secondary-button" to={'/posts/' + id + '/edit'}>Редактировать</Link>
      <button className="secondary-button" onClick={remove} disabled={deletion.isPending}>{deletion.isPending ? 'Удаление...' : 'Удалить'}</button>
    </div>
  </>;
}
