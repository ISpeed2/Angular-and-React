import { useEffect, useRef } from 'react';
export default function usePrevious(value) {
  const previous = useRef();
  useEffect(() => { previous.current = value; }, [value]);
  return previous.current;
}
