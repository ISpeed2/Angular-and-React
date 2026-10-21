import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch (error) {
      console.warn('Не удалось прочитать задачи:', error);
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Не удалось сохранить задачи:', error);
    }
  }, [key, value]);
  return [value, setValue];
}
