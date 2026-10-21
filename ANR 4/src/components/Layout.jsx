import { NavLink, Outlet } from 'react-router';

export default function Layout() {
  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <header style={{ marginBottom: 24 }}>
        <nav aria-label="Основная навигация" style={{ display: 'flex', gap: 8 }}>
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Главная</NavLink>
          <NavLink to="/tasks" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Задачи</NavLink>
        </nav>
      </header>
      <main><Outlet /></main>
    </div>
  );
}
