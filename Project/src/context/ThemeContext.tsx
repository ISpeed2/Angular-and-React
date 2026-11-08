import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
type Theme = "dark" | "light";
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem("soundspace:theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("soundspace:theme", theme);
      setError(false);
    } catch {
      setError(true);
    }
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () =>
          setTheme((previous) => (previous === "dark" ? "light" : "dark")),
      }}
    >
      {error && (
        <p className="storage-warning" role="alert">
          Не удалось сохранить тему в браузере.
        </p>
      )}
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme должен использоваться внутри ThemeProvider");
  return context;
}
