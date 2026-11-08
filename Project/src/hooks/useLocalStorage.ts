import { useEffect, useReducer, useState, type Reducer } from "react";

interface StoredState<T> {
  value: T;
  warning: string | null;
}

function readStorage<T>(
  key: string,
  initialValue: T,
  validate: (value: unknown) => value is T,
): StoredState<T> {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return { value: initialValue, warning: null };
    const parsed: unknown = JSON.parse(saved);
    if (!validate(parsed)) throw new Error("Неверный формат данных");
    return { value: parsed, warning: null };
  } catch {
    return {
      value: initialValue,
      warning:
        "Не удалось прочитать сохранённые данные. Открыто начальное состояние приложения.",
    };
  }
}

// В нашей версии хука состоянием управляет reducer, а эффект сохраняет результат.
// Ключ постоянный на протяжении жизни компонента.
export function useLocalStorage<T, A>(
  key: string,
  initialValue: T,
  reducer: Reducer<T, A>,
  validate: (value: unknown) => value is T,
) {
  const [initial] = useState(() => readStorage(key, initialValue, validate));
  const [value, dispatch] = useReducer(reducer, initial.value);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setSaveError(null);
    } catch {
      setSaveError(
        "Не удалось сохранить изменения. Они доступны в этой вкладке, но могут пропасть после перезагрузки.",
      );
    }
  }, [key, value]);

  return { value, dispatch, storageWarning: saveError ?? initial.warning };
}
