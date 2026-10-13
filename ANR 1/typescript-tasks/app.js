"use strict";
const requestedRange = process.argv[2] ?? "1-24";
const [rangeStart, rangeEnd = rangeStart] = requestedRange.split("-").map(Number);
function task(number, title, run) {
    if (number < rangeStart || number > rangeEnd)
        return;
    console.log(`\n${"=".repeat(62)}`);
    console.log(`ЗАДАНИЕ ${number}. ${title}`);
    console.log("-".repeat(62));
    run();
}
// 1. Базовые типы
task(1, "Базовые типы", () => {
    const numericValue = 42;
    const textValue = "TypeScript";
    const booleanValue = true;
    const bigValue = 100n;
    const symbolValue = Symbol("id");
    const nullValue = null;
    const undefinedValue = undefined;
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
function processValue(value) {
    if (typeof value === "string")
        return value.toUpperCase();
    if (typeof value === "number")
        return value * 2;
    return "неизвестный тип";
}
task(2, "Обработка unknown без any", () => {
    console.log(`"hello" → ${processValue("hello")}`);
    console.log(`21 → ${processValue(21)}`);
    console.log(`true → ${processValue(true)}`);
});
// 3. Массивы и матрица
const cities = ["Москва", "Казань", "Сочи"];
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const emptyNumbers = [];
function sumMatrix(m) {
    return m.reduce((total, row) => total + row.reduce((sum, item) => sum + item, 0), 0);
}
task(3, "Массивы и матрица 3×3", () => {
    console.log("Города:", cities.join(", "));
    console.log("Матрица:", matrix);
    console.log("Сумма матрицы:", sumMatrix(matrix));
    console.log("Пустой number[]:", emptyNumbers);
});
function describeTuple([name, age, status]) {
    return `${name}, ${age} лет, ${status ? "активен" : "неактивен"}`;
}
task(4, "Кортежи", () => {
    const personTuple = ["Иван", 30, true];
    const optionalTuple = ["Анна", 25];
    console.log(describeTuple(personTuple));
    console.log("Опциональный кортеж:", optionalTuple);
});
const book = {
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
function createUser(name, age, email) {
    return { name, age, email: email ?? "не указан" };
}
task(6, "Создание пользователя", () => {
    console.log(createUser("Иван", 30, "ivan@example.com"));
    console.log(createUser("Анна", 25));
});
// 7. Rest-параметры
function max(...nums) {
    return nums.length === 0 ? -Infinity : Math.max(...nums);
}
task(7, "Максимум из чисел", () => {
    console.log("max(4, 9, 2, 15, 7) =", max(4, 9, 2, 15, 7));
    console.log("max() =", max());
});
function format(x) {
    if (typeof x === "string")
        return `"${x}"`;
    if (typeof x === "number")
        return x.toFixed(2);
    return x ? "да" : "нет";
}
task(8, "Перегрузки функции format", () => {
    console.log(format("текст"), format(12.3456), format(true), format(false));
});
function printId(id) {
    return typeof id === "string" ? `Строковый ID: ${id}` : `Числовой ID: ${id}`;
}
task(9, "Union-тип ID", () => {
    console.log(printId("user-42"));
    console.log(printId(101));
});
task(10, "Intersection-типы", () => {
    const person = { name: "Олег", age: 28 };
    const fullPerson = { ...person, email: "oleg@example.com" };
    console.log(person);
    console.log(fullPerson);
});
function move(dir) {
    const descriptions = {
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
task(12, "Интерфейсы Vehicle и Car", () => {
    const car = { brand: "Tesla", year: 2025, model: "Model 3", electric: true };
    console.log(car);
});
task(13, "Объединение деклараций interface", () => {
    const config = { apiUrl: "https://api.example.com", timeout: 5000 };
    console.log(config);
});
task(14, "Point через interface и type", () => {
    const pointA = { x: 10, y: 20 };
    const pointB = { x: -5, y: 8 };
    console.log("interface:", pointA, "type:", pointB);
});
// 15. Класс BankAccount
class BankAccount {
    accountNumber;
    owner;
    static totalAccounts = 0;
    balance;
    constructor(accountNumber, owner, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = initialBalance;
        BankAccount.totalAccounts++;
    }
    deposit(amount) {
        if (amount <= 0)
            throw new Error("Сумма пополнения должна быть положительной");
        this.balance += amount;
    }
    withdraw(amount) {
        if (amount <= 0 || amount > this.balance)
            return false;
        this.balance -= amount;
        return true;
    }
    getBalance() {
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
    makeSound() {
        return "Неизвестный звук";
    }
}
class Dog extends Animal {
    makeSound() {
        return "Гав!";
    }
}
class Cat extends Animal {
    makeSound() {
        return "Мяу!";
    }
}
task(16, "Animal, Dog и Cat", () => {
    const animals = [new Dog(), new Cat(), new Animal()];
    console.log(animals.map((animal) => animal.makeSound()).join(" | "));
});
// 17. Абстрактные классы
class Shape {
    describe() {
        return `${this.constructor.name}: площадь ${this.area().toFixed(2)}`;
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius ** 2;
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
}
class Triangle extends Shape {
    base;
    height;
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }
    area() {
        return (this.base * this.height) / 2;
    }
}
task(17, "Абстрактный класс Shape", () => {
    const shapes = [new Circle(3), new Rectangle(4, 5), new Triangle(6, 4)];
    shapes.forEach((shape) => console.log(shape.describe()));
    console.log("Общая площадь:", shapes.reduce((sum, shape) => sum + shape.area(), 0).toFixed(2));
});
class Settings {
    values;
    constructor(values = {}) {
        this.values = values;
    }
    serialize() {
        return JSON.stringify(this.values);
    }
    deserialize(data) {
        this.values = JSON.parse(data);
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
function last(arr) {
    return arr.at(-1);
}
task(19, "Дженерик last<T>", () => {
    console.log("number[]:", last([1, 2, 3]));
    console.log("string[]:", last(["a", "b", "c"]));
    console.log("object[]:", last([{ id: 1 }, { id: 2 }]));
});
// 20. keyof
function getProperty(obj, key) {
    return obj[key];
}
task(20, "getProperty и keyof", () => {
    const user = { name: "Иван", age: 30 };
    console.log("name:", getProperty(user, "name"));
    console.log("age:", getProperty(user, "age"));
});
// 21. Дженерик-класс Queue
class Queue {
    items = [];
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        return this.items.shift();
    }
    peek() {
        return this.items[0];
    }
    size() {
        return this.items.length;
    }
}
task(21, "Дженерик-класс Queue<T>", () => {
    const numbers = new Queue();
    numbers.enqueue(10);
    numbers.enqueue(20);
    const strings = new Queue();
    strings.enqueue("первый");
    strings.enqueue("второй");
    console.log("Числа — peek:", numbers.peek(), "dequeue:", numbers.dequeue(), "size:", numbers.size());
    console.log("Строки — peek:", strings.peek(), "dequeue:", strings.dequeue(), "size:", strings.size());
});
task(22, "Utility Types для Article", () => {
    const draft = { title: "Черновик" };
    const preview = { id: 1, title: "TypeScript" };
    const withoutId = {
        title: "Без ID",
        content: "Текст",
        publishedAt: new Date("2026-10-13"),
        tags: ["ts"],
    };
    const required = {
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
function makeConfig() {
    return { apiUrl: "https://api.example.com", timeout: 5000, retries: 3 };
}
task(23, "Record и ReturnType", () => {
    const scores = { Анна: 95, Иван: 88, Олег: 91, Мария: 100 };
    const appConfig = makeConfig();
    console.log("Результаты:", scores);
    console.log("Конфигурация:", appConfig);
});
// 24. Discriminated union. Namespace позволяет сохранить имя Response
// и избежать конфликта со встроенным браузерным типом Response.
var Task24;
(function (Task24) {
    function handle(res) {
        switch (res.status) {
            case "success":
                return `Успех: ${res.data.join(", ")}`;
            case "error":
                return `Ошибка: ${res.message}`;
            case "loading":
                return "Загрузка...";
        }
    }
    Task24.handle = handle;
})(Task24 || (Task24 = {}));
task(24, "Discriminated union Response", () => {
    console.log(Task24.handle({ status: "success", data: ["один", "два"] }));
    console.log(Task24.handle({ status: "error", message: "Нет соединения" }));
    console.log(Task24.handle({ status: "loading" }));
});
console.log(`\n${"=".repeat(62)}`);
console.log(`Выполнение заданий ${rangeStart}–${rangeEnd} завершено успешно.`);
