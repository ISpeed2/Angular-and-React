import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterService } from '../counter.service';
@Component({
 selector: 'app-counter-b', standalone: true, changeDetection: ChangeDetectionStrategy.Default,
 imports: [], templateUrl: './counter-b.component.html',
 styleUrl: './counter-b.component.css', 
})
export class CounterBComponent {
counterService = inject(CounterService);
}
