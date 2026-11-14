import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class FavoritesService {
 private ids = signal(new Set<number>());
 toggle(id: number): void {
  this.ids.update(current => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
 }
 isFavorite(id: number): boolean { return this.ids().has(id); }
 getCount(): number { return this.ids().size; }
 remove(id: number): void { this.ids.update(current => { const next = new Set(current); next.delete(id); return next; }); }
}
