import { useQueryClient } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router';
import { PAGE_SIZE } from '../api/posts';
import { useDeletePost, usePosts } from '../hooks/usePosts';

export default function PostsPage() {
  const [params, setParams] = useSearchParams();
  const queryClient = useQueryClient();
  const rawPage = Number(params.get('page') || 1);
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const search = params.get('search') || '';
  const query = usePosts({ page, search });
  const deletion = useDeletePost();

  function changeParams(changes) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      Object.entries(changes).forEach(([key, value]) => {
        if (value) next.set(key, String(value)); else next.delete(key);
      });
      return next;
    });
  }

  if (query.isPending) return <><h1>Посты</h1><p role="status">Загрузка...</p></>;
  if (query.isError) return <><h1>Посты</h1><div role="alert"><p className="field-error">Ошибка: {query.error.message}</p><button className="secondary-button" onClick={() => query.refetch()}>Повторить</button></div></>;

  const pages = Math.max(1, Math.ceil(query.data.total / PAGE_SIZE));
  return <><h1>Каталог постов</h1>
    <p className="muted">JSONPlaceholder принимает создание, обновление и удаление, но не сохраняет изменения. После синхронизации с сервером вернутся исходные посты.</p>
    <div className="button-row post-toolbar">
      <Link className="primary-button" to="/posts/new">Создать пост</Link>
      <label className="post-search">Поиск по заголовку
        <input type="search" value={search} onChange={(event) => changeParams({ search: event.target.value, page: '' })} placeholder="Введите заголовок" />
      </label>
    </div>
    {query.isFetching && <p role="status" className="muted">Обновление...</p>}
    {deletion.isError && <p role="alert" className="field-error">Ошибка удаления: {deletion.error.message}. Пост возвращён в список.</p>}
    {deletion.isSuccess && <p role="status">Пост удалён на время оптимистичного обновления. Учебный API вернёт его при синхронизации.</p>}
    {query.data.items.length ? <ul className="posts-list">{query.data.items.map((post) => <li key={post.id} className="post-item">
      <Link to={'/posts/' + post.id} onMouseEnter={() => queryClient.setQueryData(['posts', String(post.id)], post)} onFocus={() => queryClient.setQueryData(['posts', String(post.id)], post)}><strong>{post.title}</strong></Link>
      <p>{post.body}</p>
      <div className="button-row"><Link className="secondary-button" to={'/posts/' + post.id + '/edit'}>Редактировать</Link>
        <button className="secondary-button" aria-label={'Удалить пост ' + post.id} disabled={deletion.isPending || query.isPlaceholderData} onClick={() => deletion.mutate(post.id)}>Удалить</button></div>
    </li>)}</ul> : <p>Посты не найдены.</p>}
    <div className="button-row" aria-label="Пагинация">
      <button className="secondary-button" onClick={() => changeParams({ page: page - 1 })} disabled={page <= 1 || query.isPlaceholderData}>← Назад</button>
      <span>Страница {page} из {pages}</span>
      <button className="secondary-button" onClick={() => changeParams({ page: page + 1 })} disabled={page >= pages || query.isPlaceholderData}>Вперёд →</button>
    </div>
  </>;
}
