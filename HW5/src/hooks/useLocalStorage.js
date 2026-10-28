import { useEffect, useState } from 'react';
export default function useLocalStorage(key, initialValue, validate) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      const saved = raw === null ? initialValue : JSON.parse(raw);
      return validate(saved) ? saved : initialValue;
    } catch { return initialValue; }
  });
  const [error, setError] = useState('');
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); setError(''); }
    catch { setError('Хранилище недоступно. Изменения сохранятся только до перезагрузки.'); }
  }, [key, value]);
  return [value, setValue, error];
}
