import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Некорректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
});

export const userSchema = loginSchema.extend({
  name: z.string().trim().min(2, 'Минимум 2 символа'),
  age: z.coerce.number().int('Введите целое число').min(18, 'Только с 18 лет'),
  role: z.enum(['admin', 'editor', 'viewer']),
  confirmPassword: z.string(),
  bio: z.string().max(500, 'Максимум 500 символов').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают', path: ['confirmPassword'],
});

export const orderSchema = z.object({
  items: z.array(z.object({
    name: z.string().trim().min(1, 'Название обязательно'),
    quantity: z.coerce.number().int('Введите целое число').positive('Количество > 0'),
    price: z.coerce.number().positive('Цена > 0'),
  })).min(1, 'Добавьте хотя бы один товар'),
});
