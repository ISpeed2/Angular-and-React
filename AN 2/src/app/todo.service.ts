import { Injectable, inject, signal } from '@angular/core';
import { FavoritesService } from './favorites.service';
export interface Todo { id: number; text: string; done: boolean; }
@Injectable({ providedIn: 'root' })
export class TodoService {
 private favorites = inject(FavoritesService);
 private items = signal<Todo[]>([{ id: 1, text: 'Изучить Angular', done: false }, { id: 2, text: 'Сделать проект', done: false }]);
 private nextId = 3;
 getTodos(): Todo[] { return this.items().map(todo => ({ ...todo })); }
 addTodo(text: string): void {
  text = text.trim(); if (!text) return;
  this.items.update(items => [...items, { id: this.nextId++, text, done: false }]);
 }
 removeTodo(id: number): void {
  this.items.update(items => items.filter(todo => todo.id !== id));
  this.favorites.remove(id);
 }
 toggleDone(id: number): void {
  this.items.update(items => items.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
 }
}
