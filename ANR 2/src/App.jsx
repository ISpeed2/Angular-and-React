import Avatar from './components/Avatar.jsx'
import Button from './components/Button.jsx'
import Card from './components/Card.jsx'
import Greeting from './components/Greeting.jsx'
import Product from './components/Product.jsx'

function App() {
  const handleClick = () => {
    window.alert('Кнопка работает!')
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">React · компоненты и пропсы</p>
        <h1>Практическая работа ANR 2</h1>
        <p>Пять заданий в одном небольшом приложении.</p>
      </header>

      <section className="task-section">
        <div className="section-heading">
          <span>01</span>
          <h2>Greeting</h2>
        </div>
        <div className="demo-panel greeting-list">
          <Greeting name="Иван" />
          <Greeting name="Анна" greeting="Доброе утро" />
          <Greeting />
        </div>
      </section>

      <section className="task-section">
        <div className="section-heading">
          <span>02</span>
          <h2>Product</h2>
        </div>
        <div className="product-grid">
          <Product title="Механическая клавиатура" price={8990} discount={15} />
          <Product title="Беспроводная мышь" price={3490} />
          <Product title="Монитор 27 дюймов" price={32990} discount={20} />
        </div>
      </section>

      <section className="task-section">
        <div className="section-heading">
          <span>03</span>
          <h2>Avatar</h2>
        </div>
        <div className="demo-panel avatar-row">
          <Avatar name="Иван" size={32} />
          <Avatar name="Мария" size={48} />
          <Avatar name="Алексей" size={80} />
        </div>
      </section>

      <section className="task-section">
        <div className="section-heading">
          <span>04</span>
          <h2>Card и children</h2>
        </div>
        <div className="card-grid">
          <Card title="О компоненте Card">
            <p>
              Это содержимое передано через <code>children</code>. Поэтому карточка
              может принимать почти любую разметку.
            </p>
            <Button onClick={handleClick}>Проверить кнопку</Button>
          </Card>
          <Card title="План на сегодня">
            <ul>
              <li>Разобраться с пропсами</li>
              <li>Создать переиспользуемые компоненты</li>
              <li>Запустить production-сборку</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="task-section">
        <div className="section-heading">
          <span>05</span>
          <h2>Button</h2>
        </div>
        <div className="demo-panel button-row">
          <Button onClick={handleClick}>Primary</Button>
          <Button variant="secondary" onClick={handleClick}>Secondary</Button>
          <Button variant="danger" onClick={handleClick}>Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </main>
  )
}

export default App
