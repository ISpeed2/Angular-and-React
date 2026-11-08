import { useManagers } from "../hooks/useManagers";
export default function ManagerContact({ managerId }: { managerId: number }) {
  const query = useManagers();
  const manager = query.data?.find((item) => item.id === managerId);
  return (
    <section className="panel contact-panel">
      <p className="eyebrow">КОНТАКТЫ СТУДИИ</p>
      <h2>Администратор</h2>
      {query.isPending ? (
        <p className="muted" role="status">
          Загружаем контакты…
        </p>
      ) : query.isError ? (
        <div role="alert">
          <p className="muted">{query.error.message}</p>
          <button
            className="text-button"
            type="button"
            onClick={() => query.refetch()}
          >
            Повторить загрузку
          </button>
        </div>
      ) : manager ? (
        <div className="contact-details">
          <strong>{manager.name}</strong>
          <span>{manager.email}</span>
          <span>{manager.phone}</span>
          <small>Пример контакта из учебного API</small>
        </div>
      ) : (
        <p className="muted">Контакт администратора не найден.</p>
      )}
      {query.isFetching && !query.isPending && (
        <p className="muted" role="status">
          Обновляем контакты…
        </p>
      )}
    </section>
  );
}
