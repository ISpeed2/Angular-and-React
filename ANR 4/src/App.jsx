import { BrowserRouter, Route, Routes } from 'react-router';
import useLocalStorage from './hooks/useLocalStorage';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

function createDemoTasks() {
  return [
    { title: 'Изучить useState', description: 'Разобраться с состоянием компонентов.', done: true, priority: 'high' },
    { title: 'Разобраться со списками', description: 'Попрактиковаться с выводом и фильтрацией задач.', done: false, priority: 'medium' },
    { title: 'Сделать todo', description: 'Добавить страницы и сохранение задач.', done: false, priority: 'low' },
  ].map((task) => ({ ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() }));
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('tasks-app:v1', createDemoTasks);
  function addTask({ title, description, priority }) {
    const task = { id: crypto.randomUUID(), title, description, priority, done: false, createdAt: new Date().toISOString() };
    setTasks((previous) => [...previous, task]);
  }
  function toggleTask(id) {
    setTasks((previous) => previous.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }
  function deleteTask(id) {
    if (!window.confirm('Удалить задачу?')) return false;
    setTasks((previous) => previous.filter((task) => task.id !== id));
    return true;
  }
  function editTask(id, title) {
    setTasks((previous) => previous.map((task) => task.id === id ? { ...task, title } : task));
  }
  const counts = { all: tasks.length, active: tasks.filter((task) => !task.done).length, done: tasks.filter((task) => task.done).length };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage counts={counts} />} />
          <Route path="tasks" element={<TasksPage tasks={tasks} counts={counts} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />} />
          <Route path="tasks/:taskId" element={<TaskDetailsPage tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
