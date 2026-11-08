import type { Booking } from "../types/studio";

export const OPEN_HOUR = 10;
export const CLOSE_HOUR = 23;
export const hours = Array.from(
  { length: CLOSE_HOUR - OPEN_HOUR },
  (_, index) => index + OPEN_HOUR,
);
export function hourLabel(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return Number.isFinite(date.getTime()) && localDate(date) === value;
}
export function isFutureSlot(
  date: string,
  startHour: number,
  now = new Date(),
) {
  return (
    validDate(date) &&
    new Date(`${date}T${String(startHour).padStart(2, "0")}:00:00`).getTime() >
      now.getTime()
  );
}
export function hasOverlap(
  bookings: Booking[],
  slot: { studioId: string; date: string; startHour: number; duration: number },
) {
  return bookings.some(
    (booking) =>
      booking.status === "active" &&
      booking.studioId === slot.studioId &&
      booking.date === slot.date &&
      slot.startHour < booking.startHour + booking.duration &&
      slot.startHour + slot.duration > booking.startHour,
  );
}
export function bookingEnded(booking: Booking, now = new Date()) {
  return (
    new Date(
      `${booking.date}T${String(booking.startHour + booking.duration).padStart(2, "0")}:00:00`,
    ).getTime() <= now.getTime()
  );
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
export function money(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}
