import { Link } from "react-router-dom";
export default function EmptyState({
  title,
  hint,
  link,
  linkText,
}: {
  title: string;
  hint?: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <section className="empty-state panel">
      <span className="empty-symbol" aria-hidden="true">
        ◎
      </span>
      <h2>{title}</h2>
      {hint && <p className="muted">{hint}</p>}
      {link && (
        <Link className="button" to={link}>
          {linkText ?? "В каталог"}
        </Link>
      )}
    </section>
  );
}
