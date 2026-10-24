import { useLayoutEffect, useState } from 'react';
import { Navigate, NavLink, Outlet, Route, Routes } from 'react-router';
import useLocalStorage from './hooks/useLocalStorage';
import Todo from './components/Todo';
import Storage from './pages/Storage';
import { Home, Users, UserProfile, Posts, Post, About, NotFound } from './pages/RoutesPages';
export const isAdmin = false; // Учебная защита маршрута; реальная авторизация проверяется сервером.
function Layout({ theme, setTheme, error }) {
  return <main><header><div><p className="eyebrow">REACT · HOMEWORK 04</p><h1>Сохранение и маршруты</h1><p className="hint">Части 7–8 · Две практики и восемь упражнений</p></div><button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Переключить тему">{theme === 'dark' ? '☀ Светлая тема' : '☾ Тёмная тема'}</button></header>{error && <p role="alert" className="error">{error}</p>}<div className="workspace"><nav className="sidebar" aria-label="Основная навигация">{[['/','Главная'],['/todos','Мои задачи'],['/users','Пользователи'],['/storage','Хранилище'],['/posts','Блог'],['/about','О проекте'],['/admin','Администратор']].map(([url, label]) => <NavLink key={url} to={url} end={url === '/'}>{label}</NavLink>)}</nav><div className="content"><Outlet /></div></div><footer>HW4 · React + Vite · Данные сохраняются в этом браузере.</footer></main>;
}
export default function App() {
  const [theme, setTheme, themeError] = useLocalStorage('hw4:theme', 'light', v => v === 'light' || v === 'dark');
  const [generation, setGeneration] = useState(0);
  const [resetError, setResetError] = useState('');
  useLayoutEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  function reset() {
    try {
      ['todos', 'count', 'theme', 'note'].forEach(name => localStorage.removeItem(`hw4:${name}`));
      setTheme('light');
      setGeneration(n => n + 1); // Размонтирование отменяет и ожидающий debounce заметки.
      setResetError('');
    } catch { setResetError('Не удалось сбросить данные: хранилище недоступно.'); }
  }
  return <Routes key={generation}><Route element={<Layout theme={theme} setTheme={setTheme} error={themeError || resetError}/>}><Route index element={<Home/>}/><Route path="todos" element={<Todo/>}/><Route path="storage" element={<Storage onReset={reset}/>}/><Route path="users" element={<Users/>}/><Route path="users/:userId" element={<UserProfile/>}/><Route path="posts" element={<Posts/>}/><Route path="posts/:id" element={<Post/>}/><Route path="about" element={<About/>}/><Route path="admin" element={isAdmin ? <section className="card"><h2>Панель администратора</h2><p>Доступ разрешён.</p></section> : <Navigate to="/" replace/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>;
}
