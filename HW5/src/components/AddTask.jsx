import { useState } from 'react';
import { useTasksDispatch } from '../hooks/useTasks';
export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  if (import.meta.env.DEV) console.log('render AddTask');
  function submit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'ADD', payload: { id: crypto.randomUUID(), text: text.trim(), done: false } });
    setText('');
  }
  return <form className="inline" onSubmit={submit}><label className="grow">Новая задача<input value={text} onChange={event => setText(event.target.value)} maxLength={300} placeholder="Что нужно сделать?"/></label><button className="primary" disabled={!text.trim()}>Добавить</button></form>;
}
