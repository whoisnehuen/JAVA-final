import { Link } from 'react-router-dom';

export default function CartPage({ cart, setCart }) {
  const total = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', minHeight: '50vh' }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/">
          <button style={{ padding: '10px 20px', backgroundColor: '#ffbb00', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }}>
            Volver a la tienda
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', minHeight: '50vh' }}>
      <h2 style={{ color: '#ffbb00', textAlign: 'center', marginBottom: '20px' }}>Tu Carrito</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid white', padding: '15px', borderRadius: '8px' }}>
            <div>
              <h3 style={{ margin: '0 0 10px 0' }}>{item.nombre}</h3>
              <p style={{ margin: 0 }}>{item.quantity} x ${item.precio} = <strong>${(item.precio * item.quantity).toFixed(2)}</strong></p>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'right', borderTop: '1px solid white', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '24px' }}>Total: ${total.toFixed(2)}</h3>
        <button 
          onClick={() => alert("Página de pagos en desarrollo")}
          style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', marginTop: '10px' }}
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
}