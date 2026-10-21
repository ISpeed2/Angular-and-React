export function validateForm({ name, email, password, confirmPassword, age, agree }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Введите имя';
  else if (name.trim().length < 2) errors.name = 'Минимум 2 символа';
  else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) errors.name = 'Только буквы и пробелы';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Введите корректный email';
  if (password.length < 6) errors.password = 'Минимум 6 символов';
  else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) errors.password = 'Нужны латинская буква и цифра';
  if (!confirmPassword || confirmPassword !== password) errors.confirmPassword = 'Пароли должны совпадать';
  if (!String(age).trim() || !Number.isInteger(Number(age)) || Number(age) < 18 || Number(age) > 120) errors.age = 'Введите целый возраст от 18 до 120';
  if (!agree) errors.agree = 'Необходимо согласие';
  return errors;
}
export const cities = { Россия: ['Москва', 'Санкт-Петербург', 'Казань'], Беларусь: ['Минск', 'Брест', 'Гродно'], Казахстан: ['Астана', 'Алматы', 'Караганда'] };
export function validateCity(country, city) {
  return cities[country]?.some((item) => item.toLocaleLowerCase('ru') === city.trim().toLocaleLowerCase('ru')) ? '' : `Выберите город страны «${country}»: ${(cities[country] || []).join(', ')}`;
}
export function validateReview({ name, rating, text }) {
  return { ...(name.trim().length < 2 && { name: 'Введите имя (минимум 2 символа)' }), ...(![1, 2, 3, 4, 5].includes(Number(rating)) && { rating: 'Выберите оценку' }), ...(text.trim().length < 10 && { text: 'Минимум 10 символов' }) };
}
