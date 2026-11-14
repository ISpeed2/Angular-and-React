import { Component } from '@angular/core';
import { ClickCounterComponent } from './click-counter/click-counter.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CounterAComponent } from './counter-a/counter-a.component';
import { CounterBComponent } from './counter-b/counter-b.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CartViewComponent } from './cart-view/cart-view.component';
@Component({
 selector: 'app-root', standalone: true,
 imports: [ClickCounterComponent, ShoppingListComponent, TodoListComponent, CounterAComponent, CounterBComponent, AddToCartComponent, CartViewComponent],
 templateUrl: './app.component.html', styleUrl: './app.component.css'
})
export class AppComponent {}
