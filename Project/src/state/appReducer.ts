import type { AppState, Booking } from "../types/studio";
import { hasOverlap } from "../utils/booking";
import { findStudio } from "../data/studios";
export type AppAction =
  | { type: "favorite"; id: string }
  | { type: "clearFavorites" }
  | { type: "book"; booking: Booking }
  | { type: "cancel"; id: string }
  | { type: "reset" };
export const emptyState: AppState = { favorites: [], bookings: [] };
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "favorite":
      if (!findStudio(action.id)) return state;
      return {
        ...state,
        favorites: state.favorites.includes(action.id)
          ? state.favorites.filter((id) => id !== action.id)
          : [...state.favorites, action.id],
      };
    case "clearFavorites":
      return { ...state, favorites: [] };
    case "book":
      if (
        state.bookings.some((booking) => booking.id === action.booking.id) ||
        hasOverlap(state.bookings, action.booking)
      )
        return state;
      return { ...state, bookings: [action.booking, ...state.bookings] };
    case "cancel":
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.id === action.id
            ? { ...booking, status: "cancelled" }
            : booking,
        ),
      };
    case "reset":
      return { favorites: [], bookings: [] };
  }
}
