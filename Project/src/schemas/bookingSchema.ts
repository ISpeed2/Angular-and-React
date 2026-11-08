import { z } from "zod";
import { findStudio } from "../data/studios";
import {
  validDate,
  isFutureSlot,
  OPEN_HOUR,
  CLOSE_HOUR,
} from "../utils/booking";
import type { AppState } from "../types/studio";

export function makeBookingSchema(capacity: number) {
  return z
    .object({
      date: z.string().refine(validDate, "Укажите корректную дату"),
      startHour: z
        .number({ invalid_type_error: "Выберите время" })
        .int()
        .min(OPEN_HOUR)
        .max(CLOSE_HOUR - 1),
      duration: z
        .number({ invalid_type_error: "Выберите длительность" })
        .int()
        .min(1)
        .max(4),
      people: z
        .number({ invalid_type_error: "Укажите количество человек" })
        .int("Укажите целое число")
        .min(1, "Минимум 1 человек")
        .max(capacity, `В зале не больше ${capacity} человек`),
      guestName: z
        .string()
        .trim()
        .min(2, "Минимум 2 символа")
        .max(60, "Максимум 60 символов"),
      phone: z
        .string()
        .trim()
        .max(25, "Слишком длинный номер")
        .regex(/^\+?[\d\s()\-]+$/, "Введите номер телефона")
        .refine((value) => {
          const length = value.replace(/\D/g, "").length;
          return length >= 10 && length <= 15;
        }, "От 10 до 15 цифр"),
    })
    .superRefine((values, context) => {
      if (values.startHour + values.duration > CLOSE_HOUR)
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["duration"],
          message: "Репетиция должна закончиться до 23:00",
        });
      if (!isFutureSlot(values.date, values.startHour))
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["date"],
          message: "Выберите дату и время в будущем",
        });
    });
}
export type BookingFormValues = z.infer<ReturnType<typeof makeBookingSchema>>;

const savedBookingSchema = z
  .object({
    id: z.string().min(1),
    studioId: z.string().refine((id) => !!findStudio(id)),
    studioName: z.string().min(1),
    date: z.string().refine(validDate),
    startHour: z
      .number()
      .int()
      .min(OPEN_HOUR)
      .max(CLOSE_HOUR - 1),
    duration: z.number().int().min(1).max(4),
    people: z.number().int().min(1).max(8),
    guestName: z.string().min(2).max(60),
    phone: z.string().min(10).max(25),
    total: z.number().int().positive(),
    status: z.enum(["active", "cancelled"]),
    createdAt: z.string().datetime(),
  })
  .refine(
    (booking) =>
      booking.startHour + booking.duration <= CLOSE_HOUR &&
      booking.people <= (findStudio(booking.studioId)?.capacity ?? 0),
  );
const appStateSchema = z.object({
  favorites: z
    .array(z.string().refine((id) => !!findStudio(id)))
    .refine((ids) => new Set(ids).size === ids.length),
  bookings: z
    .array(savedBookingSchema)
    .refine(
      (bookings) =>
        new Set(bookings.map((booking) => booking.id)).size === bookings.length,
    ),
});
export function isAppState(value: unknown): value is AppState {
  return appStateSchema.safeParse(value).success;
}
