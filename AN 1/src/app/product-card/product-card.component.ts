import { Component } from '@angular/core';

// Интерфейс описывает данные товара. Описание может отсутствовать.
interface Product {
  name: string;
  price: number;
  description?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product: Product = {
    name: 'Ноутбук',
    price: 75000,
    description: 'Мощный и легкий',
  };

  getProductInfo(): string {
    return `${this.product.name} стоит ${this.product.price} руб.`;
  }
}
