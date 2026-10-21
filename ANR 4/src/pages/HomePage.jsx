import { useNavigate } from 'react-router';

export default function HomePage({ counts }) {
  const navigate = useNavigate();
  return (
    <>
      <h1>📝 Мои задачи</h1>
      <p>Добро пожаловать! Здесь можно управлять своими задачами.</p>
      <p>Всего задач: {counts.all}</p>
      <p>Выполнено: {counts.done}</p>
      <p>Активно: {counts.active}</p>
      <button className="primary-button" onClick={() => navigate('/tasks')}>Перейти к задачам</button>
    </>
  );
}
