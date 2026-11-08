import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
export default function SettingsPage() {
  const { dispatch, favorites, bookings } = useApp();
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">СДЕЛАЙ ПО-СВОЕМУ</p>
          <h1>Настройки</h1>
          <p className="muted">Твой комфорт, твои правила.</p>
        </div>
      </header>
      <section className="panel settings-section">
        <div>
          <h2>Оформление</h2>
          <p className="muted">
            Сейчас включена {theme === "dark" ? "тёмная" : "светлая"} тема.
          </p>
        </div>
        <button
          type="button"
          className="secondary-button"
          onClick={toggleTheme}
        >
          Включить {theme === "dark" ? "светлую" : "тёмную"}
        </button>
      </section>
      <section className="panel settings-section">
        <div>
          <h2>Данные на устройстве</h2>
          <p className="muted">
            Избранных студий: {favorites.length}. Бронирований:{" "}
            {bookings.length}.
          </p>
          <p className="settings-note">
            Избранное и бронирования сохраняются в этом браузере. Синхронизация
            между устройствами пока не подключена.
          </p>
        </div>
        <button
          type="button"
          className="secondary-button danger"
          onClick={() => {
            if (
              window.confirm(
                "Удалить все бронирования и избранное с этого устройства?",
              )
            )
              dispatch({ type: "reset" });
          }}
        >
          Сбросить данные
        </button>
      </section>
    </>
  );
}
