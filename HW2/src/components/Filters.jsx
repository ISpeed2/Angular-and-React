const statuses = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'done', label: 'Выполненные' },
];

export default function Filters({ current, onChange, counts }) {
  return (
    <div className="toolbar" role="group" aria-label="Фильтр по статусу">
      {statuses.map(({ key, label }) => (
        <button key={key} aria-pressed={current === key} onClick={() => onChange(key)}>
          {label} ({counts[key]})
        </button>
      ))}
    </div>
  );
}
