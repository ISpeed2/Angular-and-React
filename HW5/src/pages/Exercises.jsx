import { useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth, useCart, useCartDispatch } from '../context/AppContexts';
import { products } from '../state/cart';
import useDebounce from '../hooks/useDebounce';
import usePrevious from '../hooks/usePrevious';
export const money = value => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
export function CartPage() {
  const { items, total } = useCart();
  const dispatch = useCartDispatch();
  return <section className="card"><p className="eyebrow">УПРАЖНЕНИЕ 3</p><h2>Корзина</h2><div className="products">{products.map(product => <article className="product" key={product.id}><h3>{product.name}</h3><p>{money(product.price)}</p><button onClick={() => dispatch({ type: 'ADD', id: product.id })}>В корзину</button></article>)}</div><h3>Ваш заказ</h3>{items.length ? <><ul className="clean">{items.map(item => {
    const product = products.find(product => product.id === item.id);
    return <li className="list-row cart-row" key={item.id}><div className="grow"><strong>{product.name}</strong><p className="hint">{money(product.price)} × {item.quantity} = {money(product.price * item.quantity)}</p></div><div className="toolbar"><button aria-label={`Уменьшить количество: ${product.name}`} onClick={() => dispatch({ type: 'DECREASE', id: item.id })}>−</button><span>{item.quantity}</span><button aria-label={`Увеличить количество: ${product.name}`} onClick={() => dispatch({ type: 'ADD', id: item.id })}>+</button><button className="danger" onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>Удалить</button></div></li>;
  })}</ul><div className="toolbar"><strong>Итого: {money(total)}</strong><button onClick={() => dispatch({ type: 'CLEAR' })}>Очистить корзину</button></div></> : <p className="empty">Корзина пуста. Выберите товары выше.</p>}</section>;
}
export function HooksPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);
  const matches = products.filter(product => product.name.toLocaleLowerCase('ru').includes(debouncedQuery.trim().toLocaleLowerCase('ru')));
  return <section className="card"><p className="eyebrow">УПРАЖНЕНИЯ 4–5</p><h2>Кастомные хуки</h2><h3>Поиск с задержкой 500 мс</h3><label>Название товара<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Например, книга"/></label><p className="hint" role="status">{query !== debouncedQuery ? 'Печатает…' : `Поиск завершён. Найдено: ${matches.length}`}</p>{matches.length ? <ul className="clean">{matches.map(product => <li className="list-row" key={product.id}>{product.name}<span>{money(product.price)}</span></li>)}</ul> : <p className="empty">Ничего не найдено.</p>}<h3>Предыдущее значение</h3><p>Сейчас: <strong>{count}</strong> · До изменения: <strong>{previous ?? 'ещё нет'}</strong></p><div className="toolbar"><button onClick={() => setCount(count => count - 1)}>−1</button><button onClick={() => setCount(count => count + 1)}>+1</button><button onClick={() => setCount(0)}>Сбросить</button></div><p className="hint">usePrevious возвращает значение с предыдущего рендера. Ввод в поиск также вызывает рендер этой страницы.</p></section>;
}
export function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  return user ? <Outlet/> : <Navigate to="/login" state={{ from: location.pathname }} replace/>;
}
export function LoginPage() {
  const { user, login } = useAuth();
  const [name, setName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from || '/profile';
  if (user) return <Navigate to={destination} replace/>;
  function submit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    login(name);
    navigate(destination, { replace: true });
  }
  return <section className="card"><p className="eyebrow">УПРАЖНЕНИЕ 2</p><h2>Вход в кабинет</h2><p className="hint">Учебная авторизация через Context: введите имя. После обновления страницы нужно войти снова.</p><form onSubmit={submit}><label>Ваше имя<input autoComplete="given-name" required maxLength={60} value={name} onChange={event => setName(event.target.value)}/></label><button className="primary" disabled={!name.trim()}>Войти</button></form></section>;
}
export function ProfilePage() {
  const { user, logout } = useAuth();
  return <section className="card"><h2>Личный кабинет</h2><p>Здравствуйте, <strong>{user.name}</strong>!</p><p className="hint">Этот маршрут доступен только после входа. Проверка находится в RequireAuth. В реальном приложении права доступа дополнительно проверяет сервер.</p><button onClick={logout}>Выйти</button></section>;
}
export function HomePage() {
  return <section className="card"><p className="eyebrow">ЧАСТИ 9–10</p><h2>Состояние без лишних пропсов</h2><p className="lead">Todo с Context API и оптимизацией рендеров, глобальная тема, учебный вход, корзина и два кастомных хука.</p><div className="tiles">{[['/todos', 'Мои задачи', 'Два контекста, reducer, memo и сохранение'], ['/profile', 'Личный кабинет', 'Вход, выход и защищённый маршрут'], ['/cart', 'Корзина', 'Товары, количество и итог через useReducer'], ['/hooks', 'Кастомные хуки', 'Поиск с debounce и предыдущее значение']].map(([url, title, description]) => <Link key={url} to={url}><strong>{title}</strong><span>{description}</span></Link>)}</div><h3>Как проверить оптимизацию</h3><p className="hint">Добавьте несколько задач и откройте консоль разработчика. При отметке одной задачи сообщения render TaskItem появляются только для неё. В режиме разработки StrictMode может вызывать рендер дважды. Подробности и теория — в README.</p></section>;
}
