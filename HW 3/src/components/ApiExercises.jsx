import { useCallback, useEffect, useState } from 'react';
import { getUsers, getUserById, getFact, getWeather, getPosts, searchUsers } from '../api';
import useRequest from '../hooks/useRequest';
import { Card, Status } from './Shared';

export function UserCatalog() {
  const users = useRequest(getUsers);
  const [selectedId, setSelectedId] = useState(null);
  const loadUser = useCallback((signal) => getUserById(selectedId, signal), [selectedId]);
  const user = useRequest(selectedId === null ? null : loadUser);
  return <Card title="Практика 5 · Каталог пользователей"><div className="catalog">
    <aside><h3>Пользователи</h3><Status state={users}>{users.data?.length === 0 && <p>Пользователей нет</p>}<ul className="user-list">{users.data?.map((item) => <li key={item.id}><button aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)}>{item.name}</button></li>)}</ul></Status></aside>
    <div><h3>Детали</h3>{selectedId === null ? <p className="hint">Выберите пользователя слева</p> : <Status state={user}>{user.data && <><h3>{user.data.name}</h3><dl>{[['Email', user.data.email], ['Телефон', user.data.phone], ['Сайт', user.data.website], ['Компания', user.data.company?.name], ['Город', user.data.address?.city]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></>}</Status>}</div>
  </div></Card>;
}
export function CatFacts() {
  const [revision, setRevision] = useState(0);
  const load = useCallback((signal) => { void revision; return getFact(signal); }, [revision]);
  const state = useRequest(load);
  return <Card title="1 · Факты о кошках"><Status state={state}><p>{state.data?.fact}</p></Status><button onClick={() => setRevision((n) => n + 1)}>{state.error ? 'Повторить' : 'Ещё факт'}</button></Card>;
}
export function Weather() {
  const [input, setInput] = useState('');
  const [city, setCity] = useState(null);
  const load = useCallback((signal) => getWeather(city.name, signal), [city]);
  const state = useRequest(city ? load : null);
  return <Card title="2 · Погода"><form onSubmit={(e) => { e.preventDefault(); if (input.trim().length >= 2) setCity({ name: input.trim() }); }}><label>Город<input value={input} onChange={(e) => setInput(e.target.value)} required minLength={2} placeholder="Москва"/></label><button>Узнать температуру</button></form><Status state={state}>{state.data && <p className="temperature">{state.data.place.name}, {state.data.place.country}: <strong>{state.data.temperature}{state.data.unit}</strong></p>}</Status><small>Данные: <a href="https://open-meteo.com/">Open-Meteo</a></small></Card>;
}
export function Posts() {
  const [page, setPage] = useState(1);
  const load = useCallback((signal) => getPosts(page, signal), [page]);
  const state = useRequest(load);
  return <Card title="3 · Пагинация постов"><Status state={state}>{state.data?.length === 0 && <p>Постов нет</p>}<ol start={(page - 1) * 10 + 1}>{state.data?.map((post) => <li key={post.id}>{post.title}</li>)}</ol></Status><div className="toolbar"><button disabled={page === 1} onClick={() => setPage((n) => n - 1)}>Назад</button><span>Страница {page} из 10</span><button disabled={page === 10} onClick={() => setPage((n) => n + 1)}>Вперёд</button></div></Card>;
}
export function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [settled, setSettled] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setSettled(query.trim()), 500);
    return () => clearTimeout(timer);
  }, [query]);
  const load = useCallback((signal) => searchUsers(settled, signal), [settled]);
  const current = settled === query.trim();
  const state = useRequest(current && settled ? load : null);
  return <Card title="4 · Поиск с задержкой 500 мс"><label>Имя пользователя<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Например, Leanne"/></label>{!current ? <p role="status">Ожидание окончания ввода…</p> : !settled ? <p className="hint">Введите имя для поиска</p> : <Status state={state}>{state.data?.length === 0 && <p>Ничего не найдено</p>}<ul>{state.data?.map((user) => <li key={user.id}>{user.name}</li>)}</ul></Status>}</Card>;
}
