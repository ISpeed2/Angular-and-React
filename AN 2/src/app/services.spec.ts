import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { TodoService } from './todo.service';
import { FavoritesService } from './favorites.service';

describe('Сервисы задач и корзины', () => {
 beforeEach(() => { TestBed.resetTestingModule(); });
 it('игнорирует пустые задачи, обрезает пробелы и выдаёт уникальные ID', () => {
  const todos = TestBed.inject(TodoService);
  todos.addTodo('   '); expect(todos.getTodos().length).toBe(2);
  todos.addTodo('  Проверить  ');
  const last = todos.getTodos().at(-1)!;
  expect(last.text).toBe('Проверить');
  todos.removeTodo(last.id); todos.addTodo('Следующая');
  expect(todos.getTodos().at(-1)!.id).toBeGreaterThan(last.id);
 });

 it('удаляет избранное вместе с задачей и не раскрывает внутренние объекты', () => {
  const todos = TestBed.inject(TodoService); const favorites = TestBed.inject(FavoritesService);
  const copy = todos.getTodos(); copy[0].text = 'Изменено'; copy.pop();
  expect(todos.getTodos()[0].text).toBe('Изучить Angular'); expect(todos.getTodos().length).toBe(2);
  favorites.toggle(1); expect(favorites.getCount()).toBe(1);
  todos.removeTodo(1); expect(favorites.getCount()).toBe(0);
 });

 it('объединяет товары, считает сумму, удаляет и очищает корзину', () => {
  const cart = TestBed.inject(CartService);
  cart.addItem(' Чай ', 10.10); cart.addItem('чай', 99); cart.addItem('Хлеб', 20.20);
  expect(cart.getItems().length).toBe(2); expect(cart.getItems()[0].quantity).toBe(2);
  expect(cart.getTotal()).toBe(40.40);
  const copy = cart.getItems(); copy[0].quantity = 100;
  expect(cart.getItems()[0].quantity).toBe(2);
  cart.addItem('', 1); cart.addItem('Ошибка', -1); cart.addItem('Ошибка', NaN);
  expect(cart.getItems().length).toBe(2);
  cart.removeItem(cart.getItems()[0].id); expect(cart.getTotal()).toBe(20.20);
  cart.clear(); expect(cart.getTotal()).toBe(0); expect(cart.getItems()).toEqual([]);
 });
});
