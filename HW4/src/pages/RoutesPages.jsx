import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { posts, users } from '../data';
export function Home() {
  return <section className="card"><p className="eyebrow">Части 7–8 · React</p><h2>Сохранение и навигация</h2><p className="lead">Данные переживают перезагрузку, а каждый раздел имеет свой адрес.</p><div className="tiles"><Link to="/todos"><strong>Мои задачи</strong><span>Todo + localStorage →</span></Link><Link to="/users"><strong>Пользователи</strong><span>Профили и фильтр по городу →</span></Link><Link to="/storage"><strong>Упражнения</strong><span>Счётчик, тема, заметка, сброс →</span></Link><Link to="/posts"><strong>Учебный блог</strong><span>Динамические маршруты →</span></Link></div></section>;
}
export function Users() {
  const [params, setParams] = useSearchParams();
  const city = params.get('city') || '';
  const filtered = users.filter(user => !city || user.city === city);
  return <section className="card"><p className="eyebrow">Практика · Часть 8 / Упражнение 8</p><h2>Пользователи</h2><label>Город<select value={city} onChange={e => { const next = new URLSearchParams(params); if(e.target.value) next.set('city', e.target.value); else next.delete('city'); setParams(next); }}><option value="">Все города</option>{[...new Set(users.map(u => u.city)), ...(city && !users.some(u => u.city === city) ? [city] : [])].map(c => <option key={c}>{c}</option>)}</select></label><ul className="clean">{filtered.map(u => <li className="list-row" key={u.id}><Link to={`/users/${u.id}`}>{u.name}</Link><span className="hint">{u.city}</span></li>)}</ul>{!filtered.length && <p className="empty">Пользователей в этом городе нет.</p>}</section>;
}
export function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => String(u.id) === userId);
  if (!user) return <section className="card"><h2>Пользователь не найден</h2><p>ID: {userId}</p><Link to="/users">К списку пользователей</Link></section>;
  return <section className="card"><nav className="breadcrumbs" aria-label="Хлебные крошки"><Link to="/">Главная</Link><span>/</span><Link to="/users">Пользователи</Link><span>/</span><span aria-current="page">{user.name}</span></nav><h2>{user.name}</h2><dl><dt>Email</dt><dd>{user.email}</dd><dt>Город</dt><dd>{user.city}</dd></dl><div className="toolbar"><button onClick={() => navigate(-1)}>← Назад</button><Link to="/users">Все пользователи</Link></div></section>;
}
export function Posts() {
  return <section className="card"><p className="eyebrow">Упражнение 5</p><h2>Учебный блог</h2><ul className="clean">{posts.map(p => <li className="list-row" key={p.id}><Link to={`/posts/${p.id}`}>{p.title}</Link><span>→</span></li>)}</ul></section>;
}
export function Post() {
  const { id } = useParams();
  const post = posts.find(p => String(p.id) === id);
  return <article className="card"><Link to="/posts">← Все статьи</Link><h2 className="spaced">{post ? post.title : 'Статья не найдена'}</h2>{post && <p className="lead">{post.text}</p>}</article>;
}
export function About() {
  return <section className="card"><h2>О проекте</h2><p>HW4 — две практики и восемь упражнений по localStorage и React Router.</p><p>Данные пользователей и статей заданы массивами в памяти. Задачи, тема, счётчик и заметка сохраняются в браузере.</p><p>Маршрут /admin демонстрирует перенаправление: isAdmin задан как false. Для проверки разрешённого доступа измените константу в App.jsx на true.</p></section>;
}
export function NotFound() {
  return <section className="card"><p className="eyebrow">404</p><h2>Страница не найдена</h2><p>Проверьте адрес или вернитесь на главную.</p><Link to="/">На главную →</Link></section>;
}
