import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 · ПОТЕРЯЛИ СИГНАЛ</p>
      <h1>Здесь пока тишина.</h1>
      <p className="muted">Такой страницы нет. Вернёмся к музыке?</p>
      <Link className="button" to="/">
        На главную ↗
      </Link>
    </main>
  );
}
