# AN 1 — основы Angular и компоненты

Учебный проект по [заданию 1_2a.md](https://github.com/yaroslavrychikin-crypto/log_test_safe/blob/main/angular/1_2a.md).

Реализован итог второй части: страница «Мой магазин» с отдельным standalone-компонентом карточки товара. Карточка показывает ноутбук за 75000 ₽, описание и результат метода `getProductInfo()`. Данные типизированы интерфейсом `Product`, описание выводится через `@if`.

## Запуск

Из папки `AN 1`:

```bash
npm install
npm start -- --open
```

Приложение откроется по адресу http://localhost:4200/.

## Файлы задания

- `src/main.ts` — запуск приложения.
- `src/app/app.component.ts` — корневой компонент и подключение карточки.
- `src/app/app.component.html` — заголовок магазина и `<app-product-card>`.
- `src/app/product-card/product-card.component.ts` — интерфейс `Product`, данные и метод.
- `src/app/product-card/product-card.component.html` — интерполяция и условный вывод описания.
- `src/app/product-card/product-card.component.css` — стили карточки.

Мини-задача первой части с приветствием — промежуточный шаг; в итоговом шаблоне её заменяет магазин, как в инструкции.

## Проверка

```bash
npm run build
npm test -- --watch=false
```
