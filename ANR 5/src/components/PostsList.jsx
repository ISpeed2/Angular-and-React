import { Link } from 'react-router';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPosts, PAGE_SIZE } from '../api/posts';

const lists = { predicate: (query) => query.queryKey[0] === 'posts' && typeof query.queryKey[1] === 'number' };

export default function PostsList({ page, onPageChange }) {
  const queryClient = useQueryClient();
  // Номер страницы — число; ID в ключе деталей — строка из useParams.
  const query = useQuery({ queryKey: ['posts', page], queryFn: ({ signal }) => getPosts(page, signal), placeholderData: keepPreviousData });
  const deletion = useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries(lists);
      const previous = queryClient.getQueriesData(lists);
      queryClient.setQueriesData(lists, (old) => old ? { ...old, items: old.items.filter((post) => post.id !== id) } : old);
      return { previous };
    },
    onError: (_error, _id, context) => {
      context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data));
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
  if (query.isPending) return <p role="status">Загрузка постов...</p>;
  if (query.isError) return <div role="alert"><p className="field-error">Ошибка: {query.error.message}</p><button className="secondary-button" onClick={() => query.refetch()}>Повторить</button></div>;
  const pages = Math.max(1, Math.ceil(query.data.total / PAGE_SIZE));
  return <>
    {query.isFetching && <p role="status" className="muted">Обновление...</p>}
    {deletion.isError && <p className="field-error" role="alert">Не удалось удалить: {deletion.error.message}. Список восстановлен.</p>}
    {deletion.isSuccess && <p role="status">Удаление выполнено. После запроса учебный API возвращает исходные данные.</p>}
    <ul className="posts-list">{query.data.items.map((post) => <li key={post.id} className="post-item">
      <Link to={`/posts/${post.id}`}><strong>{post.title}</strong></Link><p>{post.body}</p>
      <button className="secondary-button" aria-label={`Удалить пост ${post.id}`} disabled={deletion.isPending || query.isPlaceholderData} onClick={() => deletion.mutate(post.id)}>Удалить</button>
    </li>)}</ul>
    <div className="button-row" aria-label="Пагинация">
      <button className="secondary-button" onClick={() => onPageChange(page - 1)} disabled={page <= 1 || query.isPlaceholderData || deletion.isPending}>← Назад</button>
      <span>Страница {page} из {pages}</span>
      <button className="secondary-button" onClick={() => onPageChange(page + 1)} disabled={page >= pages || query.isPlaceholderData || deletion.isPending}>Вперёд →</button>
    </div>
  </>;
}
