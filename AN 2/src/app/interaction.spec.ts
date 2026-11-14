import { TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from './app.component';
registerLocaleData(localeRu);

describe('Взаимодействие компонентов', () => {
 beforeEach(() => { TestBed.resetTestingModule(); });
 async function setup() {
  await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  const fixture = TestBed.createComponent(AppComponent); fixture.detectChanges();
  const root: HTMLElement = fixture.nativeElement;
  const click = (element: Element) => { (element as HTMLElement).click(); fixture.detectChanges(); };
  const button = (parent: Element, text: string) => Array.from(parent.querySelectorAll('button')).find(b => b.textContent?.trim() === text)!;
  return { fixture, root, click, button };
 }
 it('показывает подсказки счётчика и синхронизирует два компонента через сервис', async () => {
  const { root, click, button } = await setup();
  const counter = root.querySelector('app-click-counter')!;
  for (let i=0; i<6; i++) click(button(counter, '+1'));
  expect(counter.textContent).toContain('Вы кликнули много раз!');
  for (let i=0; i<7; i++) click(button(counter, '−1'));
  expect(counter.textContent).toContain('Счётчик ушёл в минус');
  const a = root.querySelector('app-counter-a')!; const b = root.querySelector('app-counter-b')!;
  click(button(a, '+')); expect(b.querySelector('.value')?.textContent?.trim()).toBe('1');
  click(button(b, 'Сбросить')); expect(a.querySelector('.value')?.textContent?.trim()).toBe('0');
 });
 it('добавляет задачу Enter, фильтрует, меняет избранное и показывает пустой список', async () => {
  const { root, fixture, click, button } = await setup();
  const list = root.querySelector('app-todo-list')!; const input = list.querySelector('input')!;
  input.value = 'Новая задача'; input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true })); fixture.detectChanges();
  expect(input.value).toBe(''); expect(list.querySelectorAll('.list-item').length).toBe(3);
  click(list.querySelector('.list-item input')!); click(button(list, 'Выполненные'));
  expect(list.querySelectorAll('.list-item').length).toBe(1);
  click(list.querySelector('.star')!); expect(list.querySelector('app-favorites-counter')?.textContent).toContain('1');
  click(list.querySelector('.delete')!); expect(list.querySelector('app-favorites-counter')?.textContent).toContain('0');
  expect(list.textContent).toContain('Нет задач для выбранного фильтра');
  click(button(list, 'Все'));
  while (list.querySelector('.delete')) click(list.querySelector('.delete')!);
  expect(list.textContent).toContain('Список пуст. Добавьте первую задачу!');
 });

 it('обновляет корзину из формы другого компонента и переключает покупки', async () => {
  const { root, fixture, click, button } = await setup();
  const form = root.querySelector('app-add-to-cart form')!; const inputs = form.querySelectorAll('input');
  inputs[0].value = 'Книга'; inputs[1].value = '250.50';
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); fixture.detectChanges();
  const cart = root.querySelector('app-cart-view')!;
  expect(cart.textContent).toContain('Книга'); expect(cart.querySelector('.total')?.textContent).toContain('250,50');
  click(button(cart, 'Очистить корзину')); expect(cart.textContent).toContain('Корзина пуста');
  const shopping = root.querySelector('app-shopping-list')!;
  click(shopping.querySelector('input[type=checkbox]')!);
  expect(shopping.querySelectorAll('.done').length).toBe(1); expect(shopping.textContent).toContain('Выполнено 1 из 2');
  while (shopping.querySelector('.delete')) click(shopping.querySelector('.delete')!);
  expect(shopping.textContent).toContain('Список покупок пуст');
 });
});
