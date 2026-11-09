export default function CartModal({ cart, setCart, close }) {
  const total = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  return (
    <div id="modal" style={{ display: 'block' }}>
      <div id="contenidoModal">
        <span className="close" onClick={close}>&times;</span>
        <h2>Tu Carrito</h2>
        <div id="productos">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <p>{item.nombre} -- {item.quantity} x ${item.precio} = ${item.precio * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
        </div>
        <p id="carritoTotal">Total: ${total.toFixed(2)}</p>
        <button onClick={() => alert("Página en desarrollo")}>Ir a pagar</button>
      </div>
    </div>
  );
}