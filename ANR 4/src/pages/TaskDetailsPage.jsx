import { Link, useNavigate, useParams } from 'react-router';

export default function TaskDetailsPage({ tasks, onToggle, onDelete }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return <><h1>Задача не найдена</h1><Link to="/tasks">К списку задач</Link></>;
  function handleDelete() {
    if (onDelete(task.id)) navigate('/tasks');
  }
  return (
    <>
      <h1 style={{ overflowWrap: 'anywhere' }}>{task.title}</h1>
      <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{task.description || 'Описание не указано'}</p>
      <p>Создана: <time dateTime={task.createdAt}>{new Date(task.createdAt).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</time></p>
      <p>Статус: {task.done ? 'Выполнена' : 'Активна'}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="secondary-button" onClick={() => navigate(-1)}>← Назад</button>
        <button className="primary-button" onClick={() => onToggle(task.id)}>{task.done ? 'Вернуть в работу' : 'Отметить выполненной'}</button>
        <button className="secondary-button" onClick={handleDelete}>Удалить</button>
      </div>
    </>
  );
}
