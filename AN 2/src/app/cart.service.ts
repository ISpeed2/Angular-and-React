import { Injectable, signal } from '@angular/core';
export interface CartItem { id: number; name: string; price: number; quantity: number; }
@Injectable({ providedIn: 'root' })
export class CartService {
 private items = signal<CartItem[]>([]);
 private nextId = 1;
 getItems(): CartItem[] { return this.items().map(item => ({ ...item })); }
 addItem(name: string, price: number): void {
  name = name.trim(); if (!name || !Number.isFinite(price) || price < 0) return;
  price = Math.round(price * 100) / 100;
  const existing = this.items().find(item => item.name.toLocaleLowerCase('ru') === name.toLocaleLowerCase('ru'));
  this.items.update(items => existing ? items.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { id: this.nextId++, name, price, quantity: 1 }]);
 }
 removeItem(id: number): void { this.items.update(items => items.filter(item => item.id !== id)); }
 getTotal(): number { return this.items().reduce((total, item) => total + Math.round(item.price * 100) * item.quantity, 0) / 100; }
 clear(): void { this.items.set([]); }
}
