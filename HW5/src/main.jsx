import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { ThemeProvider, AuthProvider, CartProvider } from './context/AppContexts';
import { TasksProvider } from './context/TasksContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode><BrowserRouter><ThemeProvider><AuthProvider><CartProvider><TasksProvider>
    <App />
  </TasksProvider></CartProvider></AuthProvider></ThemeProvider></BrowserRouter></StrictMode>,
);
