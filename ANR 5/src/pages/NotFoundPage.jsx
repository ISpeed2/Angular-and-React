import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <h1>404 — Страница не найдена</h1>
      <Link to="/">На главную</Link>
    </main>
  );
}
