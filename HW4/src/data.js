export const users = [
  { id: 1, name: 'Анна', email: 'anna@example.com', city: 'Москва' },
  { id: 2, name: 'Пётр', email: 'petr@example.com', city: 'Санкт-Петербург' },
  { id: 3, name: 'Мария', email: 'maria@example.com', city: 'Казань' },
  { id: 4, name: 'Иван', email: 'ivan@example.com', city: 'Москва' },
];
export const posts = [
  { id: 1, title: 'Состояние, которое остаётся', text: 'localStorage хранит строки. JSON.stringify превращает объект в строку, а JSON.parse восстанавливает его. Чтение выполняем при ленивой инициализации состояния, сохранение — в эффекте.' },
  { id: 2, title: 'Один экран — много адресов', text: 'React Router связывает адрес с компонентом. Link меняет маршрут без перезагрузки, а BrowserRouter обеспечивает работу истории браузера.' },
  { id: 3, title: 'Эффект и его очистка', text: 'Возвращаемая из useEffect функция очищает предыдущий таймер. Благодаря этому debounce сохраняет заметку через 500 мс после последнего изменения.' },
];
