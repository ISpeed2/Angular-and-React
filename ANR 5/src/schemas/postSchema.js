import { z } from 'zod';

function localToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return now.getFullYear() + '-' + month + '-' + day;
}

export const postSchema = z.object({
  title: z.string().trim().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
  body: z.string().trim().min(10, 'Минимум 10 символов').max(1000, 'Максимум 1000 символов'),
  userId: z.coerce.number().int('Введите целое число').positive('ID автора должен быть больше нуля'),
  tags: z.array(z.object({
    value: z.string().trim().min(2, 'Минимум 2 символа').max(20, 'Максимум 20 символов'),
  })).min(1, 'Добавьте хотя бы один тег').max(5, 'Не больше 5 тегов')
    .transform((items) => items.map((item) => item.value)),
  status: z.enum(['draft', 'published']),
  publishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Укажите дату публикации')
    .refine((value) => value >= localToday(), 'Дата не может быть в прошлом'),
});

export const defaultPostValues = {
  title: '', body: '', userId: 1, tags: [{ value: '' }], status: 'draft', publishDate: localToday(),
};

export function toPostFormValues(post) {
  return {
    title: post.title ?? '', body: post.body ?? '', userId: post.userId ?? 1,
    tags: Array.isArray(post.tags) && post.tags.length ? post.tags.map((value) => ({ value })) : [{ value: '' }],
    status: post.status === 'published' ? 'published' : 'draft',
    publishDate: post.publishDate || localToday(),
  };
}
