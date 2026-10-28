const BASE = 'https://jsonplaceholder.typicode.com';
export const PAGE_SIZE = 10;

const RUSSIAN_SAMPLES = {
  1: {
    title: 'Как выстроить порядок действий',
    body: 'Чтобы прийти к результату, важно выбрать последовательность шагов, оценить возможные варианты и спокойно принять решение.',
  },
  2: {
    title: 'Время и полезные привычки',
    body: 'Время проходит быстро. Полезные привычки помогают планировать дела, замечать важное и не откладывать нужные решения.',
  },
  3: {
    title: 'Почему важно думать о последствиях',
    body: 'Перед важным решением стоит рассмотреть разные варианты и заранее представить, к чему может привести каждый из них.',
  },
  4: {
    title: 'Как находить время для главного',
    body: 'Список дел помогает расставить приоритеты и не забыть о важных задачах. Начните с того, что действительно нужно сделать сегодня.',
  },
  5: {
    title: 'Планирование помогает двигаться вперёд',
    body: 'Разбейте большую цель на небольшие шаги. Так проще начать, отслеживать прогресс и сохранять мотивацию.',
  },
  6: {
    title: 'Как принимать взвешенные решения',
    body: 'Соберите нужную информацию, сравните преимущества и недостатки вариантов, а затем выберите решение, которое подходит вашим целям.',
  },
  7: {
    title: 'Польза небольших шагов',
    body: 'Даже небольшое действие приближает к цели. Регулярность часто оказывается важнее редких больших усилий.',
  },
  8: {
    title: 'Спокойный подход к переменам',
    body: 'Перемены легче принимать, если сосредоточиться на том, что можно контролировать, и двигаться постепенно.',
  },
  9: {
    title: 'Как сохранять ясность мыслей',
    body: 'Короткая пауза помогает собраться с мыслями. Запишите вопрос, выделите главное и возвращайтесь к нему по шагам.',
  },
  10: {
    title: 'Проверяйте результат и корректируйте план',
    body: 'Регулярно оценивайте, что уже получилось. Если обстоятельства изменились, обновите план и продолжайте с ближайшего шага.',
  },
};

function localizePost(post) {
  const sample = RUSSIAN_SAMPLES[post.id];
  if (sample) return { ...post, ...sample };
  return {
    ...post,
    title: 'Публикация №' + post.id,
    body: 'Демонстрационный текст для публикации №' + post.id + '. Пример данных каталога постов.',
  };
}

async function request(path, options) {
  const response = await fetch(BASE + path, options);
  if (!response.ok) {
    let payload = {};
    try { payload = await response.json(); } catch { /* Пустой ответ сервера. */ }
    const error = new Error(payload.message || (response.status === 404 ? 'Пост не найден' : 'HTTP ' + response.status));
    if (payload.field) error.field = payload.field;
    throw error;
  }
  return response;
}

export async function getPosts({ page = 1, search = '' } = {}, signal) {
  const params = search.trim()
    ? new URLSearchParams({ _limit: '100' })
    : new URLSearchParams({ _page: String(page), _limit: String(PAGE_SIZE) });
  const response = await request('/posts?' + params, { signal });
  const items = (await response.json()).map(localizePost);
  if (search.trim()) {
    const normalizedSearch = search.trim().toLocaleLowerCase('ru');
    const filtered = items.filter((post) => post.title.toLocaleLowerCase('ru').includes(normalizedSearch));
    const start = (page - 1) * PAGE_SIZE;
    return { items: filtered.slice(start, start + PAGE_SIZE), total: filtered.length };
  }
  return { items, total: Number(response.headers.get('x-total-count') ?? items.length) };
}

export async function getPost(id, signal) {
  return localizePost(await (await request('/posts/' + encodeURIComponent(id), { signal })).json());
}

export async function createPost(data) {
  return (await request('/posts', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  })).json();
}

export async function updatePost({ id, ...data }) {
  return (await request('/posts/' + encodeURIComponent(id), {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  })).json();
}

export async function deletePost(id) {
  await request('/posts/' + encodeURIComponent(id), { method: 'DELETE' });
}
