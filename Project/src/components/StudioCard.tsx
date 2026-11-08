import { memo } from "react";
import { Link } from "react-router-dom";
import type { Studio } from "../types/studio";
import { money } from "../utils/booking";
import StudioArtwork from "./StudioArtwork";
const StudioCard = memo(function StudioCard({
  studio,
  favorite,
  onFavorite,
}: {
  studio: Studio;
  favorite: boolean;
  onFavorite: (id: string) => void;
}) {
  return (
    <article className="studio-card">
      <div className="studio-visual">
        <Link
          to={`/studios/${studio.id}`}
          aria-label={`Открыть студию ${studio.name}`}
        >
          <StudioArtwork id={studio.id} color={studio.color} />
        </Link>
        <span className="type-badge">{studio.type}</span>
        <button
          className={`favorite-button${favorite ? " selected" : ""}`}
          type="button"
          aria-pressed={favorite}
          aria-label={`${favorite ? "Убрать из избранного" : "В избранное"}: ${studio.name}`}
          onClick={() => onFavorite(studio.id)}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="studio-card-body">
        <div className="card-location">
          {studio.district} · {studio.area} м² · до {studio.capacity} чел.
        </div>
        <h2>
          <Link to={`/studios/${studio.id}`}>{studio.name}</Link>
        </h2>
        <p>{studio.equipment.slice(0, 3).join(" · ")}</p>
        <div className="card-footer">
          <span>
            <strong>{money(studio.price)}</strong>
            <small> / час</small>
          </span>
          <Link to={`/studios/${studio.id}`} className="card-link">
            Выбрать зал ↗
          </Link>
        </div>
      </div>
    </article>
  );
});
export default StudioCard;
