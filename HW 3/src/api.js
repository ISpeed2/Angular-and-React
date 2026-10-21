const BASE = 'https://jsonplaceholder.typicode.com';
export async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  return response.json();
}
export const getUsers = (signal) => fetchJson(`${BASE}/users`, signal);
export const getUserById = (id, signal) => fetchJson(`${BASE}/users/${id}`, signal);
export const getPosts = (page, signal) => fetchJson(`${BASE}/posts?_page=${page}&_limit=10`, signal);
export const searchUsers = (query, signal) => fetchJson(`${BASE}/users?name_like=${encodeURIComponent(query)}`, signal);
export const getFact = (signal) => fetchJson('https://catfact.ninja/fact', signal);
export async function getWeather(city, signal) {
  const geo = await fetchJson(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru`, signal);
  if (!geo.results?.length) throw new Error('Город не найден. Уточните название.');
  const place = geo.results[0];
  const weather = await fetchJson(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m&timezone=auto`, signal);
  return { place, temperature: weather.current.temperature_2m, unit: weather.current_units.temperature_2m };
}
