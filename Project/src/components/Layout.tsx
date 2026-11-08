import { NavLink, Outlet, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { bookingEnded } from "../utils/booking";
export default function Layout() {
  const { favorites, bookings, storageWarning } = useApp();
  const { theme, toggleTheme } = useTheme();
  const upcoming = bookings.filter(
    (booking) => booking.status === "active" && !bookingEnded(booking),
  ).length;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="Soundspace — главная">
          <span className="brand-icon" aria-hidden="true">
            s.
          </span>
          <span>
            soundspace<small>МЕСТО ДЛЯ ТВОЕГО ЗВУКА</small>
          </span>
        </Link>
        <p className="nav-caption">ТВОЁ ПРОСТРАНСТВО</p>
        <nav aria-label="Основная навигация">
          <NavLink to="/" end>
            <span aria-hidden="true">⌂</span> Главная
          </NavLink>
          <NavLink to="/studios">
            <span aria-hidden="true">▦</span> Студии
          </NavLink>
          <NavLink to="/favorites">
            <span aria-hidden="true">♡</span> Избранное{" "}
            <small>{favorites.length}</small>
          </NavLink>
          <NavLink to="/bookings">
            <span aria-hidden="true">▤</span> Бронирования{" "}
            <small>{upcoming}</small>
          </NavLink>
          <NavLink to="/settings">
            <span aria-hidden="true">⚙</span> Настройки
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-message">
            <span className="live-dot" /> Увидимся на репетиции
            <p>
              Собери группу.
              <br />
              Остальное уже на месте.
            </p>
          </div>
          <button className="theme-toggle" type="button" onClick={toggleTheme}>
            {theme === "dark" ? "☀ Светлая тема" : "☾ Тёмная тема"}
          </button>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span>Репетиционные пространства</span>
          <Link to="/bookings">
            Мои бронирования <span aria-hidden="true">↗</span>
          </Link>
        </header>
        <main className="main-content">
          {storageWarning && (
            <p className="storage-warning" role="alert">
              {storageWarning}
            </p>
          )}
          <Outlet />
        </main>
        <footer className="site-footer">
          <span>soundspace © {new Date().getFullYear()}</span>
          <span>Больше музыки. Меньше суеты.</span>
        </footer>
      </div>
    </div>
  );
}
