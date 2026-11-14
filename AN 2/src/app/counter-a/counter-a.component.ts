import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterService } from '../counter.service';
@Component({
 selector: 'app-counter-a', standalone: true, changeDetection: ChangeDetectionStrategy.Default,
 imports: [], templateUrl: './counter-a.component.html',
 styleUrl: './counter-a.component.css', 
})
export class CounterAComponent {
counterService = inject(CounterService);
}
