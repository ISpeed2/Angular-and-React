import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { studios, districts } from "../data/studios";
import { studioTypes } from "../types/studio";
import { useApp } from "../context/AppContext";
import { useDebounce } from "../hooks/useDebounce";
import StudioGrid from "../components/StudioGrid";
import EmptyState from "../components/EmptyState";
export default function StudiosPage({
  favoritesOnly = false,
}: {
  favoritesOnly?: boolean;
}) {
  const { favorites, dispatch } = useApp();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const type = studioTypes.find((item) => item === params.get("type")) ?? "";
  const district =
    districts.find((item) => item === params.get("district")) ?? "";
  const sort = params.get("sort") ?? "default";
  const filtered = useMemo(() => {
    const query = debounced.trim().toLocaleLowerCase("ru");
    const result = studios.filter(
      (studio) =>
        (!favoritesOnly || favorites.includes(studio.id)) &&
        (!type || studio.type === type) &&
        (!district || studio.district === district) &&
        `${studio.name} ${studio.equipment.join(" ")}`
          .toLocaleLowerCase("ru")
          .includes(query),
    );
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "capacity") result.sort((a, b) => b.capacity - a.capacity);
    return result;
  }, [debounced, type, district, sort, favorites, favoritesOnly]);
  function update(key: string, value: string) {
    setParams((previous) => {
      value ? previous.set(key, value) : previous.delete(key);
      return previous;
    });
  }
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">ПРОСТРАНСТВО ДЛЯ МУЗЫКИ</p>
          <h1>{favoritesOnly ? "Избранные студии" : "Найди свою студию"}</h1>
          <p className="muted">
            {favoritesOnly
              ? "Места, в которые хочется вернуться."
              : "От акустического дуэта до полного состава."}
          </p>
        </div>
        {favoritesOnly && favorites.length > 0 && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              if (window.confirm("Очистить список избранного?"))
                dispatch({ type: "clearFavorites" });
            }}
          >
            Очистить избранное
          </button>
        )}
      </header>
      <section className="catalog-filters" aria-label="Поиск и фильтры">
        <label className="search-field">
          <span className="sr-only">Поиск по названию и оборудованию</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Название студии или оборудование…"
          />
        </label>
        <div className="filter-row">
          <div className="filter-chips">
            <button
              type="button"
              aria-pressed={!type}
              className={!type ? "active" : ""}
              onClick={() => update("type", "")}
            >
              Все студии
            </button>
            {studioTypes.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={type === item}
                className={type === item ? "active" : ""}
                onClick={() => update("type", item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label>
            <span className="sr-only">Район</span>
            <select
              value={district}
              onChange={(event) => update("district", event.target.value)}
            >
              <option value="">Все районы</option>
              {districts.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Сортировка</span>
            <select
              value={sort}
              onChange={(event) => update("sort", event.target.value)}
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="capacity">По вместимости</option>
            </select>
          </label>
        </div>
      </section>
      <p className="result-count" role="status">
        Найдено студий: {filtered.length}
      </p>
      {filtered.length ? (
        <StudioGrid studios={filtered} />
      ) : (
        <EmptyState
          title={
            favoritesOnly && !favorites.length
              ? "Сохрани место для музыки"
              : "Подходящих студий не нашлось"
          }
          hint={
            favoritesOnly && !favorites.length
              ? "Нажми на сердечко у понравившегося зала."
              : "Попробуй изменить поиск или фильтры."
          }
          link={favoritesOnly ? "/studios" : undefined}
        />
      )}
    </>
  );
}
