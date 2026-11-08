import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import StudiosPage from "./pages/StudiosPage";
import StudioDetailPage from "./pages/StudioDetailPage";
import BookingsPage from "./pages/BookingsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/studios" element={<StudiosPage key="catalog" />} />
        <Route path="/studios/:id" element={<StudioDetailPage />} />
        <Route
          path="/favorites"
          element={<StudiosPage key="favorites" favoritesOnly />}
        />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
