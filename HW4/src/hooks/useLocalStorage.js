import { useEffect, useState } from 'react';

// key остаётся постоянным в течение жизни компонента. Проверяем и JSON, и его форму.
export function readStored(key, fallback, validate = () => true) {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const value = JSON.parse(raw);
      if (validate(value)) return value;
    }
  } catch { /* Повреждённые данные или недоступное хранилище: используем дефолт. */ }
  return typeof fallback === 'function' ? fallback() : fallback;
}
export default function useLocalStorage(key, initialValue, validate) {
  const [value, setValue] = useState(() => readStored(key, initialValue, validate));
  const [error, setError] = useState('');
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setError('');
    } catch { setError('Не удалось сохранить данные. Проверьте доступ к хранилищу браузера.'); }
  }, [key, value]);
  return [value, setValue, error];
}
