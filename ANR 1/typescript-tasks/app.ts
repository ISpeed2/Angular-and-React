declare const process: { argv: string[] };

const requestedRange = process.argv[2] ?? "1-24";
const [rangeStart, rangeEnd = rangeStart] = requestedRange.split("-").map(Number);

function task(number: number, title: string, run: () => void): void {
  if (number < rangeStart || number > rangeEnd) return;
  console.log(`\n${"=".repeat(62)}`);
  console.log(`ЗАДАНИЕ ${number}. ${title}`);
  console.log("-".repeat(62));
  run();
}

// 1. Базовые типы
task(1, "Базовые типы", () => {
  const numericValue: number = 42;
  const textValue: string = "TypeScript";
  const booleanValue: boolean = true;
  const bigValue: bigint = 100n;
  const symbolValue: symbol = Symbol("id");
  const nullValue: null = null;
  const undefinedValue: undefined = undefined;

  console.log({
    numericValue,
    textValue,
    booleanValue,
    bigValue: bigValue.toString() + "n",
    symbolValue: symbolValue.toString(),
    nullValue,
    undefinedValue,
  });
});

// 2. unknown и сужение типа
function processValue(value: unknown): string | number {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value * 2;
  return "неизвестный тип";
}

task(2, "Обработка unknown без any", () => {
  console.log(`"hello" → ${processValue("hello")}`);
  console.log(`21 → ${processValue(21)}`);
  console.log(`true → ${processValue(true)}`);
});

// 3. Массивы и матрица
const cities: string[] = ["Москва", "Казань", "Сочи"];
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const emptyNumbers: number[] = [];

function sumMatrix(m: number[][]): number {
  return m.reduce((total, row) => total + row.reduce((sum, item) => sum + item, 0), 0);
}

task(3, "Массивы и матрица 3×3", () => {
  console.log("Города:", cities.join(", "));
  console.log("Матрица:", matrix);
  console.log("Сумма матрицы:", sumMatrix(matrix));
  console.log("Пустой number[]:", emptyNumbers);
});

// 4. Кортежи
type PersonTuple = [string, number, boolean];
type OptionalPersonTuple = [string, number, boolean?];

function describeTuple([name, age, status]: PersonTuple): string {
  return `${name}, ${age} лет, ${status ? "активен" : "неактивен"}`;
}

task(4, "Кортежи", () => {
  const personTuple: PersonTuple = ["Иван", 30, true];
  const optionalTuple: OptionalPersonTuple = ["Анна", 25];
  console.log(describeTuple(personTuple));
  console.log("Опциональный кортеж:", optionalTuple);
});

// 5. Тип Book
type Book = {
  title: string;
  author: string;
  year: number;
  readonly isbn: string;
  genre?: string;
};

const book: Book = {
  title: "Мастер и Маргарита",
  author: "Михаил Булгаков",
  year: 1967,
  isbn: "978-5-17-118366-3",
  genre: "роман",
};

if (false) {
  // Ожидаемая ошибка: readonly-свойство изменять нельзя.
  // @ts-expect-error
  book.isbn = "другой ISBN";
}

task(5, "Объект Book и readonly", () => {
  console.log(book);
  console.log("isbn защищён от изменения на этапе компиляции");
});

// 6. Опциональный параметр
function createUser(name: string, age: number, email?: string) {
  return { name, age, email: email ?? "не указан" };
}

task(6, "Создание пользователя", () => {
  console.log(createUser("Иван", 30, "ivan@example.com"));
  console.log(createUser("Анна", 25));
});

// 7. Rest-параметры
function max(...nums: number[]): number {
  return nums.length === 0 ? -Infinity : Math.max(...nums);
}

task(7, "Максимум из чисел", () => {
  console.log("max(4, 9, 2, 15, 7) =", max(4, 9, 2, 15, 7));
  console.log("max() =", max());
});

// 8. Перегрузки
function format(x: string): string;
function format(x: number): string;
function format(x: boolean): string;
function format(x: string | number | boolean): string {
  if (typeof x === "string") return `"${x}"`;
  if (typeof x === "number") return x.toFixed(2);
  return x ? "да" : "нет";
}

task(8, "Перегрузки функции format", () => {
  console.log(format("текст"), format(12.3456), format(true), format(false));
});

// 9. Union
type ID = string | number;

function printId(id: ID): string {
  return typeof id === "string" ? `Строковый ID: ${id}` : `Числовой ID: ${id}`;
}

task(9, "Union-тип ID", () => {
  console.log(printId("user-42"));
  console.log(printId(101));
});

// 10. Intersection
type HasName = { name: string };
type HasAge = { age: number };
type HasEmail = { email: string };
type Person = HasName & HasAge;
type FullPerson = Person & HasEmail;

task(10, "Intersection-типы", () => {
  const person: Person = { name: "Олег", age: 28 };
  const fullPerson: FullPerson = { ...person, email: "oleg@example.com" };
  console.log(person);
  console.log(fullPerson);
});

// 11. Литеральные типы
type Direction = "up" | "down" | "left" | "right";

function move(dir: Direction): string {
  const descriptions: Record<Direction, string> = {
    up: "Движение вверх",
    down: "Движение вниз",
    left: "Движение влево",
    right: "Движение вправо",
  };
  return descriptions[dir];
}

if (false) {
  // Ожидаемая ошибка: "north" не входит в Direction.
  // @ts-expect-error
  move("north");
}

task(11, "Литеральный тип Direction", () => {
  console.log(move("up"));
  console.log(move("left"));
  console.log('"north" отклоняется компилятором');
});

// 12. Наследование интерфейсов
interface Vehicle {
  brand: string;
  year: number;
}

interface Car extends Vehicle {
  model: string;
  electric: boolean;
}

task(12, "Интерфейсы Vehicle и Car", () => {
  const car: Car = { brand: "Tesla", year: 2025, model: "Model 3", electric: true };
  console.log(car);
});

// 13. Declaration merging
interface Config {
  apiUrl: string;
}

interface Config {
  timeout: number;
}

task(13, "Объединение деклараций interface", () => {
  const config: Config = { apiUrl: "https://api.example.com", timeout: 5000 };
  console.log(config);
});

// 14. Interface и type
interface PointInterface {
  x: number;
  y: number;
}

type PointType = {
  x: number;
  y: number;
};

task(14, "Point через interface и type", () => {
  const pointA: PointInterface = { x: 10, y: 20 };
  const pointB: PointType = { x: -5, y: 8 };
  console.log("interface:", pointA, "type:", pointB);
});

// 15. Класс BankAccount
class BankAccount {
  static totalAccounts = 0;
  private balance: number;

  constructor(
    public accountNumber: string,
    public readonly owner: string,
    initialBalance = 0,
  ) {
    this.balance = initialBalance;
    BankAccount.totalAccounts++;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Сумма пополнения должна быть положительной");
    this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}

task(15, "Класс BankAccount", () => {
  const account = new BankAccount("RU-001", "Иван", 1000);
  account.deposit(500);
  console.log("Снятие 300:", account.withdraw(300));
  console.log("Баланс:", account.getBalance());
  console.log("Всего счетов:", BankAccount.totalAccounts);
});

// 16. Наследование классов
class Animal {
  makeSound(): string {
    return "Неизвестный звук";
  }
}

class Dog extends Animal {
  override makeSound(): string {
    return "Гав!";
  }
}

class Cat extends Animal {
  override makeSound(): string {
    return "Мяу!";
  }
}

task(16, "Animal, Dog и Cat", () => {
  const animals: Animal[] = [new Dog(), new Cat(), new Animal()];
  console.log(animals.map((animal) => animal.makeSound()).join(" | "));
});

// 17. Абстрактные классы
abstract class Shape {
  abstract area(): number;

  describe(): string {
    return `${this.constructor.name}: площадь ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(private readonly radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private readonly width: number, private readonly height: number) {
    super();
  }
  area(): number {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(private readonly base: number, private readonly height: number) {
    super();
  }
  area(): number {
    return (this.base * this.height) / 2;
  }
}

task(17, "Абстрактный класс Shape", () => {
  const shapes: Shape[] = [new Circle(3), new Rectangle(4, 5), new Triangle(6, 4)];
  shapes.forEach((shape) => console.log(shape.describe()));
  console.log("Общая площадь:", shapes.reduce((sum, shape) => sum + shape.area(), 0).toFixed(2));
});

// 18. Реализация интерфейса
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

class Settings implements Serializable {
  constructor(public values: Record<string, unknown> = {}) {}

  serialize(): string {
    return JSON.stringify(this.values);
  }

  deserialize(data: string): void {
    this.values = JSON.parse(data) as Record<string, unknown>;
  }
}

task(18, "Интерфейс Serializable", () => {
  const settings = new Settings({ theme: "dark", language: "ru" });
  const json = settings.serialize();
  console.log("JSON:", json);
  settings.deserialize('{"theme":"light","notifications":true}');
  console.log("После deserialize:", settings.values);
});

// 19. Дженерик last
function last<T>(arr: T[]): T | undefined {
  return arr.at(-1);
}

task(19, "Дженерик last<T>", () => {
  console.log("number[]:", last([1, 2, 3]));
  console.log("string[]:", last(["a", "b", "c"]));
  console.log("object[]:", last([{ id: 1 }, { id: 2 }]));
});

// 20. keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

task(20, "getProperty и keyof", () => {
  const user = { name: "Иван", age: 30 };
  console.log("name:", getProperty(user, "name"));
  console.log("age:", getProperty(user, "age"));
});

// 21. Дженерик-класс Queue
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }
  dequeue(): T | undefined {
    return this.items.shift();
  }
  peek(): T | undefined {
    return this.items[0];
  }
  size(): number {
    return this.items.length;
  }
}

task(21, "Дженерик-класс Queue<T>", () => {
  const numbers = new Queue<number>();
  numbers.enqueue(10);
  numbers.enqueue(20);
  const strings = new Queue<string>();
  strings.enqueue("первый");
  strings.enqueue("второй");
  console.log("Числа — peek:", numbers.peek(), "dequeue:", numbers.dequeue(), "size:", numbers.size());
  console.log("Строки — peek:", strings.peek(), "dequeue:", strings.dequeue(), "size:", strings.size());
});

// 22. Utility Types
interface Article {
  id: number;
  title: string;
  content: string;
  publishedAt: Date;
  tags: string[];
}

type ArticleDraft = Partial<Article>;
type ArticlePreview = Pick<Article, "id" | "title">;
type ArticleWithoutId = Omit<Article, "id">;
type ArticleRequired = Required<Partial<Article>>;

task(22, "Utility Types для Article", () => {
  const draft: ArticleDraft = { title: "Черновик" };
  const preview: ArticlePreview = { id: 1, title: "TypeScript" };
  const withoutId: ArticleWithoutId = {
    title: "Без ID",
    content: "Текст",
    publishedAt: new Date("2026-10-13"),
    tags: ["ts"],
  };
  const required: ArticleRequired = {
    id: 2,
    title: "Готово",
    content: "Все поля обязательны",
    publishedAt: new Date("2026-10-13"),
    tags: ["typescript", "utility-types"],
  };
  console.log("Partial:", draft);
  console.log("Pick:", preview);
  console.log("Omit:", withoutId);
  console.log("Required:", required);
});

// 23. Record и ReturnType
type Scores = Record<string, number>;

function makeConfig() {
  return { apiUrl: "https://api.example.com", timeout: 5000, retries: 3 };
}

type AppConfig = ReturnType<typeof makeConfig>;

task(23, "Record и ReturnType", () => {
  const scores: Scores = { Анна: 95, Иван: 88, Олег: 91, Мария: 100 };
  const appConfig: AppConfig = makeConfig();
  console.log("Результаты:", scores);
  console.log("Конфигурация:", appConfig);
});

// 24. Discriminated union. Namespace позволяет сохранить имя Response
// и избежать конфликта со встроенным браузерным типом Response.
namespace Task24 {
  export type Response =
    | { status: "success"; data: string[] }
    | { status: "error"; message: string }
    | { status: "loading" };

  export function handle(res: Response): string {
    switch (res.status) {
      case "success":
        return `Успех: ${res.data.join(", ")}`;
      case "error":
        return `Ошибка: ${res.message}`;
      case "loading":
        return "Загрузка...";
    }
  }
}

task(24, "Discriminated union Response", () => {
  console.log(Task24.handle({ status: "success", data: ["один", "два"] }));
  console.log(Task24.handle({ status: "error", message: "Нет соединения" }));
  console.log(Task24.handle({ status: "loading" }));
});

console.log(`\n${"=".repeat(62)}`);
console.log(`Выполнение заданий ${rangeStart}–${rangeEnd} завершено успешно.`);
