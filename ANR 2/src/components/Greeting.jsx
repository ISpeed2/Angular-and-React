function Greeting({ name, greeting = 'Привет' }) {
  const displayName = name?.trim() || 'незнакомец'

  return <p className="greeting">{greeting}, {displayName}!</p>
}

export default Greeting
