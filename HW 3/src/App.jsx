import { useState } from 'react';
import { UserCatalog, CatFacts, Weather, Posts, DebouncedSearch } from './components/ApiExercises';
import RegistrationForm from './components/RegistrationForm';
import { ReviewForm, DependentForm, FocusForm, FileInput, IdleForm, MultiStepForm } from './components/FormExercises';
const pages = [
  ['Каталог пользователей', UserCatalog], ['Регистрация', RegistrationForm],
  ['1. Факты о кошках', CatFacts], ['2. Погода', Weather], ['3. Пагинация', Posts], ['4. Поиск', DebouncedSearch],
  ['5. Отзыв', ReviewForm], ['6. Страна и город', DependentForm], ['7. Фокус', FocusForm], ['8. Файл', FileInput], ['9. Таймер', IdleForm], ['10. Шаги', MultiStepForm],
];
export default function App() {
  const [page, setPage] = useState(0);
  const Component = pages[page][1];
  return <main><header><p className="eyebrow">REACT · HOMEWORK 03</p><h1>Эффекты, API и формы</h1><p className="lead">Две практики и десять упражнений по useEffect и useRef.</p></header><div className="workspace"><nav aria-label="Разделы домашней работы"><p className="nav-label">Практика</p>{pages.map(([name], index) => <div key={name}>{index === 2 && <p className="nav-label">Упражнения</p>}<button aria-current={page === index ? 'page' : undefined} onClick={() => setPage(index)}>{name}</button></div>)}</nav><div className="content" key={page}><Component/></div></div><footer>Учебный проект · Части 5–6 · Данные форм остаются в этой вкладке и сбрасываются при переключении раздела.</footer></main>;
}
