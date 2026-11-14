import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FavoritesService } from '../favorites.service';
@Component({
 selector: 'app-favorites-counter', standalone: true, changeDetection: ChangeDetectionStrategy.Default,
 imports: [], templateUrl: './favorites-counter.component.html',
 styleUrl: './favorites-counter.component.css', 
})
export class FavoritesCounterComponent {
favorites = inject(FavoritesService);
}
