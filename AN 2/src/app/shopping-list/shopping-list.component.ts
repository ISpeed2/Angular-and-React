import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

@Component({
 selector: 'app-shopping-list', standalone: true, changeDetection: ChangeDetectionStrategy.Default,
 imports: [], templateUrl: './shopping-list.component.html',
 styleUrl: './shopping-list.component.css', 
})
export class ShoppingListComponent {
items: { id: number; name: string; done: boolean }[] = [
 { id: 1, name: 'Хлеб', done: false }, { id: 2, name: 'Молоко', done: false }
 ];
 private nextId = 3;
 get completed(): number { return this.items.filter(item => item.done).length; }
 addItem(input: HTMLInputElement): void {
  const name = input.value.trim(); if (!name) return;
  this.items = [...this.items, { id: this.nextId++, name, done: false }]; input.value = '';
 }
 toggle(id: number): void { this.items = this.items.map(item => item.id === id ? { ...item, done: !item.done } : item); }
 remove(id: number): void { this.items = this.items.filter(item => item.id !== id); }
}
