function Avatar({ name, size = 48 }) {
  const displayName = name?.trim() || '?'

  return (
    <div
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      title={displayName}
      aria-label={`Аватар пользователя ${displayName}`}
    >
      {displayName[0].toUpperCase()}
    </div>
  )
}

export default Avatar
