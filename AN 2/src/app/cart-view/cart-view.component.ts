import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';
@Component({
 selector: 'app-cart-view', standalone: true, changeDetection: ChangeDetectionStrategy.Default,
 imports: [CurrencyPipe], templateUrl: './cart-view.component.html',
 styleUrl: './cart-view.component.css', 
})
export class CartViewComponent {
cart = inject(CartService);
}
