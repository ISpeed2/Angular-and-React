import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

@Component({
 selector: 'app-click-counter', standalone: true, changeDetection: ChangeDetectionStrategy.Default,
 imports: [], templateUrl: './click-counter.component.html',
 styleUrl: './click-counter.component.css', 
})
export class ClickCounterComponent {
count = 0;
 increment(): void { this.count++; }
 decrement(): void { this.count--; }
}
