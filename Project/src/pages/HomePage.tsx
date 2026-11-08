import { Link } from "react-router-dom";
import { studios } from "../data/studios";
import StudioGrid from "../components/StudioGrid";
import StudioArtwork from "../components/StudioArtwork";
export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> НАСТРОЙСЯ НА СВОЮ ВОЛНУ
          </p>
          <h1>
            Твой звук.
            <br />
            Твоё <em>место.</em>
          </h1>
          <p className="hero-description">
            Репетиционные залы и студии записи.
            <br />
            Найди пространство, в котором хочется играть.
          </p>
          <Link className="button" to="/studios">
            Найти студию <span aria-hidden="true">↗</span>
          </Link>
          <div className="hero-facts">
            <span>
              <strong>6</strong> студий
            </span>
            <span>
              <strong>от 700 ₽</strong> за час
            </span>
            <span>
              <strong>10—23</strong> каждый день
            </span>
          </div>
        </div>
        <div className="hero-room">
          <StudioArtwork id="hero" color="#b5e78a" />
          <div className="hero-room-label">
            <span>
              <small>В ФОКУСЕ</small>
              <strong>Signal Room</strong>
            </span>
            <Link to="/studios/signal" aria-label="Открыть Signal Room">
              ↗
            </Link>
          </div>
          <span className="room-index">01 / 06</span>
        </div>
      </section>
      <section className="experience-strip" aria-label="Возможности">
        <div>
          <span>01</span>
          <p>
            Выбери свой зал<small>Под состав и настроение</small>
          </p>
        </div>
        <div>
          <span>02</span>
          <p>
            Найди удобное время<small>От одного до четырёх часов</small>
          </p>
        </div>
        <div>
          <span>03</span>
          <p>
            Приходи играть<small>Оборудование уже на месте</small>
          </p>
        </div>
      </section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">ЕСТЬ ИЗ ЧЕГО ВЫБРАТЬ</p>
          <h2>Пространства со своим характером</h2>
        </div>
        <Link className="text-link" to="/studios">
          Все студии ↗
        </Link>
      </div>
      <StudioGrid studios={studios.slice(0, 3)} />
      <section className="home-note">
        <span aria-hidden="true">〰</span>
        <div>
          <h2>Хорошая репетиция начинается с места.</h2>
          <p className="muted">
            Ударные, усилители, микрофоны — выбери зал с нужным оборудованием.
          </p>
        </div>
        <Link className="text-link" to="/studios?type=Репетиция">
          Выбрать зал →
        </Link>
      </section>
    </>
  );
}
