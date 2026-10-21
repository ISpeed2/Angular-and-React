export function Card({ title, children }) {
  return <section className="card"><h2>{title}</h2>{children}</section>;
}
export function Status({ state, children }) {
  if (state.loading) return <p role="status">Загрузка…</p>;
  if (state.error) return <p role="alert" className="error">Ошибка: {state.error}</p>;
  return children;
}
export function Field({ label, name, errors = {}, touched = {}, ...props }) {
  const error = touched[name] && errors[name];
  return <label>{label}<input name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props}/>{error && <span id={`${name}-error`} className="error">{error}</span>}</label>;
}
