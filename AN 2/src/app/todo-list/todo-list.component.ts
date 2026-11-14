import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TodoService, Todo } from '../todo.service';
import { FavoritesService } from '../favorites.service';
import { FavoritesCounterComponent } from '../favorites-counter/favorites-counter.component';
@Component({
 selector: 'app-todo-list', standalone: true, changeDetection: ChangeDetectionStrategy.Default,
 imports: [FavoritesCounterComponent], templateUrl: './todo-list.component.html',
 styleUrl: './todo-list.component.css', 
})
export class TodoListComponent {
private todoService = inject(TodoService);
 favorites = inject(FavoritesService);
 filter: 'all' | 'active' | 'done' = 'all';
 get todos(): Todo[] { return this.todoService.getTodos(); }
 get filteredTodos(): Todo[] { return this.todos.filter(todo => this.filter === 'all' || (this.filter === 'done' ? todo.done : !todo.done)); }
 addTodo(input: HTMLInputElement): void { this.todoService.addTodo(input.value); input.value = ''; }
 removeTodo(id: number): void { this.todoService.removeTodo(id); }
 toggleDone(id: number): void { this.todoService.toggleDone(id); }
}
