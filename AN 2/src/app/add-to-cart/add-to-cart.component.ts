import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CartService } from '../cart.service';
@Component({
 selector: 'app-add-to-cart', standalone: true, changeDetection: ChangeDetectionStrategy.Default,
 imports: [], templateUrl: './add-to-cart.component.html',
 styleUrl: './add-to-cart.component.css', 
})
export class AddToCartComponent {
private cart = inject(CartService);
 add(name: HTMLInputElement, price: HTMLInputElement): void {
  if (!name.value.trim() || !price.checkValidity() || !Number.isFinite(price.valueAsNumber)) return;
  this.cart.addItem(name.value, price.valueAsNumber); name.value = ''; price.value = '';
 }
}
