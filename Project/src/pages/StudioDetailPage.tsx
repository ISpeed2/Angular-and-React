import { Link, useParams } from "react-router-dom";
import { findStudio } from "../data/studios";
import { useApp } from "../context/AppContext";
import StudioArtwork from "../components/StudioArtwork";
import BookingForm from "../components/BookingForm";
import ManagerContact from "../components/ManagerContact";
import EmptyState from "../components/EmptyState";
export default function StudioDetailPage() {
  const { id } = useParams();
  const studio = findStudio(id);
  const { favorites, dispatch } = useApp();
  if (!studio)
    return (
      <EmptyState
        title="Студия не найдена"
        hint="Проверь адрес или выбери другой зал в каталоге."
        link="/studios"
      />
    );
  const favorite = favorites.includes(studio.id);
  return (
    <>
      <Link className="back-link" to="/studios">
        ← Все студии
      </Link>
      <header className="page-heading">
        <div>
          <p className="eyebrow">
            {studio.type} · {studio.district}
          </p>
          <h1>{studio.name}</h1>
          <p className="muted">{studio.address}</p>
        </div>
        <button
          className="secondary-button"
          type="button"
          aria-pressed={favorite}
          onClick={() => dispatch({ type: "favorite", id: studio.id })}
        >
          {favorite ? "♥ В избранном" : "♡ В избранное"}
        </button>
      </header>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-art">
            <StudioArtwork id={`detail-${studio.id}`} color={studio.color} />
          </div>
          <div className="studio-specs">
            <span>
              <strong>{studio.area} м²</strong> площадь
            </span>
            <span>
              <strong>до {studio.capacity}</strong> человек
            </span>
            <span>
              <strong>10:00—23:00</strong> ежедневно
            </span>
          </div>
          <section className="detail-description">
            <h2>Здесь рождается твой звук</h2>
            <p>{studio.description}</p>
          </section>
          <section className="panel equipment-panel">
            <h2>Всё для репетиции</h2>
            <ul>
              {studio.equipment.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✓</span> {item}
                </li>
              ))}
            </ul>
          </section>
          <ManagerContact managerId={studio.managerId} />
        </div>
        <BookingForm key={studio.id} studio={studio} />
      </div>
    </>
  );
}
