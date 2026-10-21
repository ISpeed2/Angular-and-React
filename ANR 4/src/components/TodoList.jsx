import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  // Обработка пустого состояния
  if (todos.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>
        Пусто
      </p>
    );
  }

  return (
    <div className="todo-table">
      <div className="todo-columns" aria-hidden="true">
        <span />
        <span>Задача</span>
        <span>Создана</span>
        <span />
      </div>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
    </div>
  );
}

export default TodoList;
