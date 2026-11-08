import { useCallback } from "react";
import { useApp } from "../context/AppContext";
import type { Studio } from "../types/studio";
import StudioCard from "./StudioCard";
export default function StudioGrid({ studios }: { studios: Studio[] }) {
  const { favorites, dispatch } = useApp();
  const toggle = useCallback(
    (id: string) => dispatch({ type: "favorite", id }),
    [dispatch],
  );
  return (
    <div className="studio-grid">
      {studios.map((studio) => (
        <StudioCard
          key={studio.id}
          studio={studio}
          favorite={favorites.includes(studio.id)}
          onFavorite={toggle}
        />
      ))}
    </div>
  );
}
