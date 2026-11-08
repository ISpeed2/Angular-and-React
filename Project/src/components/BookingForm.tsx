import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type { Studio } from "../types/studio";
import {
  makeBookingSchema,
  type BookingFormValues,
} from "../schemas/bookingSchema";
import { useApp } from "../context/AppContext";
import {
  hours,
  hourLabel,
  localDate,
  hasOverlap,
  isFutureSlot,
  money,
  CLOSE_HOUR,
} from "../utils/booking";
export default function BookingForm({ studio }: { studio: Studio }) {
  const { bookings, bookStudio } = useApp();
  const navigate = useNavigate();
  const schema = useMemo(
    () => makeBookingSchema(studio.capacity),
    [studio.capacity],
  );
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: localDate(tomorrow),
      startHour: 18,
      duration: 2,
      people: 2,
      guestName: "",
      phone: "",
    },
  });
  const date = watch("date");
  const duration = watch("duration");
  const startHour = watch("startHour");
  const validDuration =
    Number.isInteger(duration) && duration >= 1 && duration <= 4;
  const selectedUnavailable =
    !validDuration ||
    !isFutureSlot(date, startHour) ||
    startHour + duration > CLOSE_HOUR ||
    hasOverlap(bookings, { studioId: studio.id, date, startHour, duration });
  function error(name: keyof BookingFormValues) {
    return errors[name] ? (
      <p id={`${name}-error`} className="field-error" role="alert">
        {errors[name]?.message}
      </p>
    ) : null;
  }
  function accessibility(name: keyof BookingFormValues) {
    return {
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }
  function submit(values: BookingFormValues) {
    try {
      const id = bookStudio(studio.id, values);
      navigate(`/bookings?created=${encodeURIComponent(id)}`);
    } catch (cause) {
      setError("root", {
        message:
          cause instanceof Error
            ? cause.message
            : "Не удалось создать бронирование",
      });
    }
  }
  return (
    <section className="panel booking-panel" aria-labelledby="booking-title">
      <div className="booking-price">
        <strong>{money(studio.price)}</strong>
        <span> / час</span>
      </div>
      <h2 id="booking-title">Забронировать зал</h2>
      <form onSubmit={handleSubmit(submit)} noValidate className="booking-form">
        <div className="form-field">
          <label htmlFor="date">Дата репетиции</label>
          <input
            id="date"
            type="date"
            min={localDate()}
            {...accessibility("date")}
            {...register("date")}
          />
          {error("date")}
        </div>
        <div className="form-columns">
          <div className="form-field">
            <label htmlFor="startHour">Начало</label>
            <select
              id="startHour"
              {...accessibility("startHour")}
              {...register("startHour", { valueAsNumber: true })}
            >
              {hours.map((hour) => {
                const unavailable =
                  !validDuration ||
                  hour + duration > CLOSE_HOUR ||
                  !isFutureSlot(date, hour) ||
                  hasOverlap(bookings, {
                    studioId: studio.id,
                    date,
                    startHour: hour,
                    duration,
                  });
                return (
                  <option key={hour} value={hour} disabled={unavailable}>
                    {hourLabel(hour)}
                    {unavailable ? " — недоступно" : ""}
                  </option>
                );
              })}
            </select>
            {error("startHour")}
          </div>
          <div className="form-field">
            <label htmlFor="duration">Длительность</label>
            <select
              id="duration"
              {...accessibility("duration")}
              {...register("duration", { valueAsNumber: true })}
            >
              {[1, 2, 3, 4].map((value) => (
                <option key={value} value={value}>
                  {value} ч.
                </option>
              ))}
            </select>
            {error("duration")}
          </div>
        </div>
        {selectedUnavailable && (
          <p className="field-hint" role="status">
            Выбранное время недоступно. Измените время начала, дату или
            длительность.
          </p>
        )}
        <div className="form-field">
          <label htmlFor="people">Количество музыкантов</label>
          <input
            id="people"
            type="number"
            min={1}
            max={studio.capacity}
            {...accessibility("people")}
            {...register("people", { valueAsNumber: true })}
          />
          {error("people")}
        </div>
        <div className="form-field">
          <label htmlFor="guestName">Ваше имя</label>
          <input
            id="guestName"
            autoComplete="name"
            maxLength={60}
            placeholder="Как к вам обращаться"
            {...accessibility("guestName")}
            {...register("guestName")}
          />
          {error("guestName")}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Телефон</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            maxLength={25}
            placeholder="+7 (999) 123-45-67"
            {...accessibility("phone")}
            {...register("phone")}
          />
          {error("phone")}
        </div>
        <div className="booking-total">
          <span>Итого за {validDuration ? duration : "—"} ч.</span>
          <strong>
            {money(studio.price * (validDuration ? duration : 0))}
          </strong>
        </div>
        {errors.root && (
          <p className="field-error" role="alert">
            {errors.root.message}
          </p>
        )}
        <button
          className="button full-width"
          type="submit"
          disabled={isSubmitting}
        >
          Забронировать <span aria-hidden="true">↗</span>
        </button>
        <p className="booking-local-note">
          Бронь сохраняется на этом устройстве. Заявка не отправляется в студию.
        </p>
      </form>
    </section>
  );
}
