// Компонент фильтров.
// Принимает:
//   current — текущий фильтр ('all' | 'active' | 'done')
//   onChange — колбэк смены фильтра
//   counts — объект { all, active, done } для отображения чисел
function Filters({ current, onChange, counts }) {
  const filters = [
    { key: 'all', label: 'Все', count: counts.all },
    { key: 'active', label: 'Активные', count: counts.active },
    { key: 'done', label: 'Выполненные', count: counts.done },
  ];

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      {filters.map((filter) => {
        // Тернарник для выбора стиля активной кнопки
        const isActive = filter.key === current;
        return (
          <button
            key={filter.key}
            onClick={() => onChange(filter.key)}
            style={{
              padding: '8px 14px',
              border: '1px solid #ddd',
              borderRadius: 8,
              background: isActive ? '#3b82f6' : 'white',
              color: isActive ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {filter.label} ({filter.count})
          </button>
        );
      })}
    </div>
  );
}

export default Filters;
