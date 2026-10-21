import { useEffect, useState } from 'react';

// request принимает AbortSignal; вызывающий компонент стабилизирует функцию useCallback.
export default function useRequest(request) {
  const [state, setState] = useState({ data: null, loading: Boolean(request), error: null });
  useEffect(() => {
    if (!request) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });
    async function load() {
      try {
        const data = await request(controller.signal);
        if (!controller.signal.aborted) setState({ data, loading: false, error: null });
      } catch (error) {
        if (!controller.signal.aborted) setState({ data: null, loading: false, error: error.message });
      }
    }
    load();
    return () => controller.abort();
  }, [request]);
  return state;
}
