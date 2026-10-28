import { NavLink, Outlet, Route, Routes, Link } from 'react-router';
import { useTheme, useAuth, useCart } from './context/AppContexts';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { CartPage, HooksPage, RequireAuth, LoginPage, ProfilePage, HomePage } from './pages/Exercises';
function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { count } = useCart();
  return <main><header><div><p className="eyebrow">REACT · HOMEWORK 05</p><h1>Контекст и продвинутые хуки</h1><p className="hint">Части 9–10 · Две практики и шесть упражнений</p></div><button onClick={toggleTheme}>{theme === 'light' ? '☾ Тёмная тема' : '☀ Светлая тема'}</button></header><div className="workspace"><nav className="sidebar" aria-label="Основная навигация">{[['/', 'Главная'], ['/todos', 'Мои задачи'], ['/profile', user ? `Кабинет: ${user.name}` : 'Личный кабинет'], ['/cart', `Корзина (${count})`], ['/hooks', 'Кастомные хуки']].map(([url, label]) => <NavLink key={url} to={url} end={url === '/'}>{label}</NavLink>)}</nav><div className="content"><Outlet/></div></div><footer>HW5 · React + Vite · Задачи и тема сохраняются в этом браузере.</footer></main>;
}
function TodoPage() {
  return <section className="card"><p className="eyebrow">ПРАКТИКА 9–10 · УПРАЖНЕНИЕ 6</p><h2>Мои задачи</h2><p className="hint">Добавляйте, отмечайте и удаляйте задачи. Список сохранится после перезагрузки.</p><AddTask/><TaskList/></section>;
}
export default function App() {
  return <Routes><Route element={<Layout/>}><Route index element={<HomePage/>}/><Route path="todos" element={<TodoPage/>}/><Route path="cart" element={<CartPage/>}/><Route path="hooks" element={<HooksPage/>}/><Route path="login" element={<LoginPage/>}/><Route element={<RequireAuth/>}><Route path="profile" element={<ProfilePage/>}/></Route><Route path="*" element={<section className="card"><h2>Страница не найдена</h2><Link to="/">На главную</Link></section>}/></Route></Routes>;
}
