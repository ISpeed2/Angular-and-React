import { Link, useNavigate, useParams } from 'react-router';
import PostForm from '../components/PostForm';
import { usePost, useUpdatePost } from '../hooks/usePosts';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const query = usePost(id);
  const update = useUpdatePost();

  if (query.isPending) return <><h1>Редактирование поста</h1><p role="status">Загрузка...</p></>;
  if (query.isError) return <><h1>Пост не найден</h1><p role="alert" className="field-error">{query.error.message}</p><Link to="/posts">К списку постов</Link></>;

  async function save(data) {
    await update.mutateAsync({ id, ...data });
    navigate('/posts');
  }
  return <><h1>Редактировать пост</h1><PostForm initialData={query.data} onSubmit={save} /><p><Link to={'/posts/' + id}>← К посту</Link></p></>;
}
