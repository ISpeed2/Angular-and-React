const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const build = process.env.SOUNDSPACE_TEST_BUILD;
const fromBuild = (file) => require(path.join(build, file));
const { appReducer, emptyState } = fromBuild("state/appReducer.js");
const { makeBookingSchema, isAppState } = fromBuild("schemas/bookingSchema.js");
const { hasOverlap, isFutureSlot, validDate, bookingEnded } =
  fromBuild("utils/booking.js");
const { getManagers, API_BASE } = fromBuild("api/managers.js");
const booking = {
  id: "booking-1",
  studioId: "signal",
  studioName: "Signal Room",
  date: "2099-05-10",
  startHour: 14,
  duration: 2,
  people: 3,
  guestName: "Музыкант",
  phone: "+7 999 111-22-33",
  total: 1800,
  status: "active",
  createdAt: "2026-11-08T12:00:00.000Z",
};

test("пересечения: соседние слоты разрешены, частичное и полное наложение запрещены", () => {
  const list = [booking];
  const slot = { studioId: "signal", date: booking.date, duration: 2 };
  assert.equal(hasOverlap(list, { ...slot, startHour: 12 }), false);
  assert.equal(hasOverlap(list, { ...slot, startHour: 16 }), false);
  assert.equal(hasOverlap(list, { ...slot, startHour: 13 }), true);
  assert.equal(hasOverlap(list, { ...slot, startHour: 15 }), true);
  assert.equal(hasOverlap(list, { ...slot, startHour: 14, duration: 1 }), true);
  assert.equal(hasOverlap(list, { ...slot, startHour: 12, duration: 6 }), true);
  assert.equal(
    hasOverlap(list, { ...slot, startHour: 14, studioId: "echo" }),
    false,
  );
  assert.equal(
    hasOverlap(list, { ...slot, startHour: 14, date: "2099-05-11" }),
    false,
  );
  assert.equal(
    hasOverlap([{ ...booking, status: "cancelled" }], {
      ...slot,
      startHour: 14,
    }),
    false,
  );
});

test("reducer предотвращает дубли и конфликтующие брони, отмена освобождает слот", () => {
  const state = appReducer(emptyState, { type: "book", booking });
  assert.equal(emptyState.bookings.length, 0);
  assert.equal(state.bookings.length, 1);
  assert.equal(appReducer(state, { type: "book", booking }).bookings.length, 1);
  assert.equal(
    appReducer(state, {
      type: "book",
      booking: { ...booking, id: "second", startHour: 15 },
    }).bookings.length,
    1,
  );
  const cancelled = appReducer(state, { type: "cancel", id: booking.id });
  assert.equal(state.bookings[0].status, "active");
  assert.equal(cancelled.bookings[0].status, "cancelled");
  assert.equal(
    appReducer(cancelled, {
      type: "book",
      booking: { ...booking, id: "second" },
    }).bookings.length,
    2,
  );
});

test("избранное переключается, очистка не затрагивает брони, сброс очищает всё", () => {
  const state = { favorites: ["signal"], bookings: [booking] };
  const toggled = appReducer(state, { type: "favorite", id: "signal" });
  assert.deepEqual(toggled.favorites, []);
  assert.deepEqual(state.favorites, ["signal"]);
  assert.deepEqual(
    appReducer(toggled, { type: "favorite", id: "echo" }).favorites,
    ["echo"],
  );
  assert.equal(appReducer(state, { type: "favorite", id: "unknown" }), state);
  assert.equal(
    appReducer(state, { type: "clearFavorites" }).bookings.length,
    1,
  );
  assert.deepEqual(appReducer(state, { type: "reset" }), emptyState);
});

test("форма отклоняет невалидный телефон, вместимость, прошлое и окончание после закрытия", () => {
  const schema = makeBookingSchema(6);
  const input = {
    date: booking.date,
    startHour: 14,
    duration: 2,
    people: 3,
    guestName: "  Музыкант  ",
    phone: booking.phone,
  };
  assert.equal(schema.parse(input).guestName, "Музыкант");
  for (const changes of [
    { date: "2099-02-30" },
    { date: "2020-01-01" },
    { startHour: 9 },
    { startHour: 23 },
    { startHour: 22, duration: 2 },
    { duration: 0 },
    { duration: 5 },
    { people: 7 },
    { people: 1.5 },
    { phone: "123" },
    { phone: "abcdefghijk" },
    { guestName: " " },
  ]) {
    assert.equal(
      schema.safeParse({ ...input, ...changes }).success,
      false,
      JSON.stringify(changes),
    );
  }
  assert.equal(
    schema.safeParse({ ...input, startHour: 22, duration: 1 }).success,
    true,
  );
});

test("даты проверяются без UTC-сдвига, завершение определяется по концу слота", () => {
  assert.equal(validDate("2028-02-29"), true);
  assert.equal(validDate("2027-02-29"), false);
  assert.equal(validDate("2027-13-01"), false);
  assert.equal(
    isFutureSlot("2026-11-08", 14, new Date("2026-11-08T13:59:00")),
    true,
  );
  assert.equal(
    isFutureSlot("2026-11-08", 14, new Date("2026-11-08T14:00:00")),
    false,
  );
  assert.equal(bookingEnded(booking, new Date("2099-05-10T15:59:00")), false);
  assert.equal(bookingEnded(booking, new Date("2099-05-10T16:00:00")), true);
});

test("сохранённое состояние проходит JSON round-trip, повреждённые данные отклоняются", () => {
  const state = { favorites: ["signal"], bookings: [booking] };
  assert.equal(isAppState(JSON.parse(JSON.stringify(state))), true);
  for (const invalid of [
    null,
    [],
    {},
    { ...state, favorites: ["unknown"] },
    { ...state, favorites: ["signal", "signal"] },
    { ...state, bookings: [booking, booking] },
    { ...state, bookings: [{ ...booking, total: "1800" }] },
    { ...state, bookings: [{ ...booking, startHour: 22 }] },
    { ...state, bookings: [{ ...booking, studioId: "unknown" }] },
  ]) {
    assert.equal(isAppState(invalid), false);
  }
});

test("API использует GET /users и сигнал, проверяет HTTP и структуру ответа", async () => {
  const originalFetch = global.fetch;
  const signal = new AbortController().signal;
  try {
    global.fetch = async (url, options) => {
      assert.equal(url, API_BASE + "/users");
      assert.equal(options.signal, signal);
      assert.equal(options.body, undefined);
      return {
        ok: true,
        json: async () => [
          {
            id: 1,
            name: "Test manager",
            email: "test@example.com",
            phone: "123",
          },
        ],
      };
    };
    assert.equal((await getManagers(signal))[0].name, "Test manager");
    global.fetch = async () => ({ ok: false, status: 503 });
    await assert.rejects(getManagers(), /HTTP 503/);
    global.fetch = async () => ({
      ok: true,
      json: async () => [{ id: "broken" }],
    });
    await assert.rejects(getManagers(), /неожиданном формате/);
    global.fetch = async () => {
      throw new Error("Network offline");
    };
    await assert.rejects(getManagers(), /Network offline/);
  } finally {
    global.fetch = originalFetch;
  }
});

test("страницы рендерят каталог, категорию, детали, избранное, брони и отдельную 404", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { MemoryRouter } = require("react-router-dom");
  const { QueryClient, QueryClientProvider } = require("@tanstack/react-query");
  const { AppProvider } = fromBuild("context/AppContext.js");
  const { ThemeProvider } = fromBuild("context/ThemeContext.js");
  const App = fromBuild("App.js").default;
  const storage = new Map();
  global.localStorage = { getItem: (key) => storage.get(key) ?? null };
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  client.setQueryData(
    ["studio-managers"],
    [{ id: 1, name: "Test manager", email: "test@example.com", phone: "123" }],
  );
  const render = (route) =>
    renderToStaticMarkup(
      React.createElement(
        QueryClientProvider,
        { client },
        React.createElement(
          MemoryRouter,
          { initialEntries: [route] },
          React.createElement(
            ThemeProvider,
            null,
            React.createElement(AppProvider, null, React.createElement(App)),
          ),
        ),
      ),
    );
  try {
    assert.match(render("/"), /Твой звук/);
    const catalog = render("/studios");
    assert.match(catalog, /Signal Room/);
    assert.match(catalog, /Mono Lab/);
    const recording = render("/studios?type=" + encodeURIComponent("Запись"));
    assert.match(recording, /Echo Studio/);
    assert.doesNotMatch(recording, /Signal Room/);
    const detail = render("/studios/signal");
    assert.match(detail, /Забронировать зал/);
    assert.match(detail, /Test manager/);
    assert.match(detail, /date-error|Дата репетиции/);
    assert.match(render("/studios/missing"), /Студия не найдена/);
    assert.match(render("/favorites"), /Сохрани место/);
    storage.set(
      "soundspace:data:v1",
      JSON.stringify({ favorites: ["signal"], bookings: [booking] }),
    );
    assert.match(render("/favorites"), /Signal Room/);
    assert.doesNotMatch(render("/favorites"), /Mono Lab/);
    assert.match(render("/bookings"), /Музыкант/);
    assert.match(render("/settings"), /Настройки/);
    assert.doesNotMatch(render("/unknown"), /<aside/);
    assert.match(render("/unknown"), /Здесь пока тишина/);
    storage.set("soundspace:data:v1", "broken");
    assert.match(render("/bookings"), /Не удалось прочитать/);
  } finally {
    client.clear();
    delete global.localStorage;
  }
});
