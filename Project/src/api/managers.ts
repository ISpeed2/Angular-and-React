import { z } from "zod";

export const API_BASE = "https://jsonplaceholder.typicode.com";
const managerSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});
export type Manager = z.infer<typeof managerSchema>;

// JSONPlaceholder — готовое учебное API. Наши описания залов находятся в data/studios.ts.
export async function getManagers(signal?: AbortSignal): Promise<Manager[]> {
  const response = await fetch(`${API_BASE}/users`, { signal });
  if (!response.ok)
    throw new Error(`Не удалось загрузить контакты: HTTP ${response.status}`);
  const json: unknown = await response.json();
  const result = z.array(managerSchema).safeParse(json);
  if (!result.success)
    throw new Error("Сервис вернул контакты в неожиданном формате");
  return result.data;
}
