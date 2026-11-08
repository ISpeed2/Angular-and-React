import { Link, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { money, formatDate, hourLabel, bookingEnded } from "../utils/booking";
import EmptyState from "../components/EmptyState";
export default function BookingsPage() {
  const { bookings, dispatch } = useApp();
  const [params, setParams] = useSearchParams();
  const filter = ["upcoming", "past", "cancelled"].includes(
    params.get("filter") ?? "",
  )
    ? params.get("filter")!
    : "all";
  const created = bookings.find(
    (booking) => booking.id === params.get("created"),
  );
  const visible = bookings
    .filter(
      (booking) =>
        filter === "all" ||
        (filter === "cancelled"
          ? booking.status === "cancelled"
          : booking.status === "active" &&
            (filter === "past"
              ? bookingEnded(booking)
              : !bookingEnded(booking))),
    )
    .sort((a, b) =>
      `${a.date} ${hourLabel(a.startHour)}`.localeCompare(
        `${b.date} ${hourLabel(b.startHour)}`,
      ),
    );
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">ВРЕМЯ ДЛЯ МУЗЫКИ</p>
          <h1>Мои бронирования</h1>
          <p className="muted">Все репетиции в одном месте.</p>
        </div>
        <Link className="button" to="/studios">
          Найти студию ↗
        </Link>
      </header>
      {created && (
        <p className="success-notice" role="status">
          Бронирование {created.studioName} сохранено на этом устройстве.
        </p>
      )}
      <div className="filter-chips booking-tabs">
        {[
          ["all", "Все"],
          ["upcoming", "Предстоящие"],
          ["past", "Прошедшие"],
          ["cancelled", "Отменённые"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            className={filter === value ? "active" : ""}
            onClick={() =>
              setParams((previous) => {
                value === "all"
                  ? previous.delete("filter")
                  : previous.set("filter", value);
                previous.delete("created");
                return previous;
              })
            }
          >
            {label}
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="booking-list">
          {visible.map((booking) => (
            <article
              className={`panel booking-card${booking.status === "cancelled" ? " cancelled" : ""}`}
              key={booking.id}
            >
              <div className="booking-date">
                <strong>{booking.date.slice(8)}</strong>
                <span>
                  {new Intl.DateTimeFormat("ru-RU", { month: "short" }).format(
                    new Date(`${booking.date}T12:00:00`),
                  )}
                </span>
              </div>
              <div className="booking-info">
                <span className={`status-badge ${booking.status}`}>
                  {booking.status === "cancelled"
                    ? "Отменено"
                    : bookingEnded(booking)
                      ? "Завершено"
                      : "Предстоит"}
                </span>
                <h2>
                  <Link to={`/studios/${booking.studioId}`}>
                    {booking.studioName}
                  </Link>
                </h2>
                <p>
                  {formatDate(booking.date)} · {hourLabel(booking.startHour)}—
                  {hourLabel(booking.startHour + booking.duration)} ·{" "}
                  {booking.people} чел.
                </p>
                <small>
                  {booking.guestName} · {booking.phone}
                </small>
              </div>
              <div className="booking-actions">
                <strong>{money(booking.total)}</strong>
                {booking.status === "active" && !bookingEnded(booking) && (
                  <button
                    className="text-button danger"
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Отменить бронирование ${booking.studioName} на ${formatDate(booking.date)}?`,
                        )
                      )
                        dispatch({ type: "cancel", id: booking.id });
                    }}
                  >
                    Отменить бронь
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            filter === "all"
              ? "Твоя следующая репетиция — здесь"
              : "Таких бронирований пока нет"
          }
          hint="Выбери зал, дату и удобное время."
          link="/studios"
        />
      )}
    </>
  );
}
