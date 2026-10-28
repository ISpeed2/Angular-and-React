// Учебный ответ сервера: настоящего сервиса пользователей в задании нет.
export async function createUser({ password, confirmPassword, ...profile }) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (profile.email.toLowerCase() === 'taken@example.com') {
    const error = new Error('Уже используется');
    error.field = 'email';
    throw error;
  }
  // Пароли не сохраняем и не возвращаем в интерфейс.
  return { ...profile, id: crypto.randomUUID() };
}
