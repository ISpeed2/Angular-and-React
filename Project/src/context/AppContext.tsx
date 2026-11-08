import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
  type Dispatch,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { appReducer, emptyState, type AppAction } from "../state/appReducer";
import {
  isAppState,
  makeBookingSchema,
  type BookingFormValues,
} from "../schemas/bookingSchema";
import { findStudio } from "../data/studios";
import { hasOverlap } from "../utils/booking";
import type { AppState } from "../types/studio";
interface AppContextValue extends AppState {
  dispatch: Dispatch<AppAction>;
  storageWarning: string | null;
  bookStudio: (studioId: string, values: BookingFormValues) => string;
}
const AppContext = createContext<AppContextValue | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const {
    value: state,
    dispatch,
    storageWarning,
  } = useLocalStorage("soundspace:data:v1", emptyState, appReducer, isAppState);
  const bookStudio = useCallback(
    (studioId: string, input: BookingFormValues) => {
      const studio = findStudio(studioId);
      if (!studio) throw new Error("Студия не найдена");
      const values = makeBookingSchema(studio.capacity).parse(input);
      if (hasOverlap(state.bookings, { ...values, studioId }))
        throw new Error(
          "Это время уже занято в ваших бронированиях. Выберите другой слот.",
        );
      const id = crypto.randomUUID();
      dispatch({
        type: "book",
        booking: {
          ...values,
          id,
          studioId,
          studioName: studio.name,
          total: studio.price * values.duration,
          status: "active",
          createdAt: new Date().toISOString(),
        },
      });
      return id;
    },
    [state.bookings, dispatch],
  );
  const value = useMemo(
    () => ({ ...state, dispatch, storageWarning, bookStudio }),
    [state, dispatch, storageWarning, bookStudio],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useApp должен использоваться внутри AppProvider");
  return context;
}
