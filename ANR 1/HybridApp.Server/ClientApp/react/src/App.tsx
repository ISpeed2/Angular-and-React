import { FormEvent, useEffect, useState } from 'react'

type Session = { isAuthenticated: boolean; name: string | null }
type Dashboard = {
  user: string
  generatedAt: string
  items: { title: string; description: string; status: string }[]
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const loadSession = async () => {
    const current = await fetch('/api/auth/session').then((response) => response.json())
    setSession(current)
    if (current.isAuthenticated) {
      const data = await fetch('/api/dashboard').then((response) => response.json())
      setDashboard(data)
    } else {
      setDashboard(null)
    }
  }

  useEffect(() => {
    loadSession().catch(() => setError('Не удалось связаться с API'))
  }, [])

  const login = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (!response.ok) {
      const body = await response.json()
      setError(body.message ?? 'Не удалось войти')
      return
    }
    await loadSession()
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    await loadSession()
  }

  return (
    <main className="shell">
      <nav>
        <a className="brand" href="/react/"><span>H</span> Hybrid Hub</a>
        <div className="switcher" aria-label="Переключение интерфейса">
          <a className="active" href="/react/">React</a>
          <a href="/angular/">Angular</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">ASP.NET CORE × REACT</p>
          <h1>Два интерфейса.<br /><em>Одна сессия.</em></h1>
          <p className="lead">React и Angular работают поверх единого API. Войдите здесь — и останетесь авторизованы во втором клиенте.</p>
        </div>
        <div className="orb" aria-hidden="true"><span>R</span></div>
      </section>

      {session?.isAuthenticated ? (
        <section className="panel">
          <div className="panel-head">
            <div><p className="label">Активная сессия</p><h2>Привет, {session.name}</h2></div>
            <button className="ghost" onClick={logout}>Выйти</button>
          </div>
          <div className="cards">
            {dashboard?.items.map((item, index) => (
              <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><small>{item.status}</small></article>
            ))}
          </div>
        </section>
      ) : (
        <section className="panel login-panel">
          <div><p className="label">Демо-вход</p><h2>Представьтесь системе</h2><p>Пароль не нужен — пример демонстрирует общую cookie-сессию.</p></div>
          <form onSubmit={login}>
            <label htmlFor="name">Ваше имя</label>
            <div className="input-row"><input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Например, Алекс" minLength={2} maxLength={40} required /><button>Войти →</button></div>
            {error && <p className="error">{error}</p>}
          </form>
        </section>
      )}

      <footer><span>React client</span><span>SharedAuth / API v1</span></footer>
    </main>
  )
}
