import { Link, useNavigate } from 'react-router';
import PostForm from '../components/PostForm';
import { useCreatePost } from '../hooks/usePosts';

export default function NewPostPage() {
  const navigate = useNavigate();
  const creation = useCreatePost();
  async function save(data) {
    await creation.mutateAsync(data);
    navigate('/posts');
  }
  return <><h1>Создать пост</h1><PostForm onSubmit={save} /><p><Link to="/posts">← К списку постов</Link></p></>;
}
