import type { Studio } from "../types/studio";

export const studios: Studio[] = [
  {
    id: "signal",
    name: "Signal Room",
    type: "Репетиция",
    district: "Центр",
    address: "ул. Садовая, 12",
    price: 900,
    capacity: 6,
    area: 32,
    color: "#b5e78a",
    managerId: 1,
    description:
      "Плотный звук и всё, что нужно группе. Просторный зал с акустической обработкой, полноценной ударной установкой и отдельной вокальной линией.",
    equipment: [
      "Ударная установка Pearl",
      "Гитарный усилитель Marshall",
      "Басовый усилитель Ampeg",
      "Микрофоны Shure SM58",
      "Микшер Yamaha",
    ],
  },
  {
    id: "echo",
    name: "Echo Studio",
    type: "Запись",
    district: "Север",
    address: "ул. Лесная, 7",
    price: 1500,
    capacity: 4,
    area: 24,
    color: "#c0b3ee",
    managerId: 2,
    description:
      "Камерная студия для записи вокала, демо и подкастов. Тихая комната, студийные мониторы и конденсаторный микрофон для работы с деталями.",
    equipment: [
      "Микрофон Audio-Technica AT2020",
      "Интерфейс Focusrite Scarlett",
      "Мониторы Yamaha HS5",
      "MIDI-клавиатура Arturia",
      "Наушники AKG",
    ],
  },
  {
    id: "garage",
    name: "Garage 04",
    type: "Репетиция",
    district: "Юг",
    address: "ул. Заводская, 24",
    price: 700,
    capacity: 5,
    area: 28,
    color: "#e8b58c",
    managerId: 3,
    description:
      "Место для громких идей. Репетиционная комната с гитарным стеком, басовой линией и ударными. Удобный вариант для регулярных репетиций группы.",
    equipment: [
      "Ударная установка Tama",
      "Гитарный усилитель Orange",
      "Басовый усилитель Hartke",
      "Микрофоны Shure SM58",
      "Микшер Behringer",
    ],
  },
  {
    id: "wood",
    name: "Wood & Strings",
    type: "Акустика",
    district: "Центр",
    address: "пер. Тихий, 3",
    price: 800,
    capacity: 4,
    area: 22,
    color: "#e6d48c",
    managerId: 4,
    description:
      "Тёплая комната для акустических сетов, дуэтов и занятий вокалом. Мягкая акустика помогает слышать нюансы инструмента и голоса.",
    equipment: [
      "Цифровое пианино Yamaha",
      "Акустический усилитель Fender",
      "Микрофоны Shure SM58",
      "Пюпитры",
      "Кахон",
    ],
  },
  {
    id: "pulse",
    name: "Pulse Hall",
    type: "Репетиция",
    district: "Север",
    address: "пр-т Мира, 45",
    price: 1200,
    capacity: 8,
    area: 45,
    color: "#8dc9d5",
    managerId: 5,
    description:
      "Большой зал для полного состава. Подходит для подготовки концертной программы, репетиций с клавишными и работы над сценическим взаимодействием.",
    equipment: [
      "Ударная установка Yamaha",
      "Гитарный усилитель Marshall",
      "Басовый усилитель Ampeg",
      "Клавишные Roland",
      "Микрофоны Shure SM58",
    ],
  },
  {
    id: "mono",
    name: "Mono Lab",
    type: "Запись",
    district: "Запад",
    address: "ул. Студийная, 9",
    price: 1800,
    capacity: 3,
    area: 20,
    color: "#d6a6bc",
    managerId: 6,
    description:
      "Компактная студия для внимательной работы со звуком. Запись инструментов, вокальные партии и аранжировки в спокойной рабочей обстановке.",
    equipment: [
      "Микрофон Rode NT1",
      "Интерфейс Audient iD14",
      "Мониторы Adam T5V",
      "MIDI-клавиатура Arturia",
      "Наушники Beyerdynamic",
    ],
  },
];
export const districts = [...new Set(studios.map((studio) => studio.district))];
export function findStudio(id: string | undefined) {
  return studios.find((studio) => studio.id === id);
}
