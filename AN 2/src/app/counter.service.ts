import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
 count = 0;
 increment(): void { this.count++; }
 decrement(): void { this.count--; }
 reset(): void { this.count = 0; }
}
