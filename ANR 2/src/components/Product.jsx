function Product({ title, price, discount = 0 }) {
  const finalPrice = price * (1 - discount / 100)
  const formatPrice = (value) => new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }).format(value)

  return (
    <article className="product">
      <h3>{title}</h3>
      <div className="product__prices">
        <strong>{formatPrice(finalPrice)}</strong>
        {discount > 0 && <s>{formatPrice(price)}</s>}
      </div>
      {discount > 0 && <span className="discount">Скидка: {discount}%</span>}
    </article>
  )
}

export default Product
