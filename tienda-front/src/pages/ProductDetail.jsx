import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  
  // Este estado YA NO simula la base de datos.
  // Solo guarda el JSON del producto que Java nos envía a través de la API.
  const [producto, setProducto] = useState(null); 
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Acá pedimos el producto a tu backend en Java
    fetch(`https://tiendaapi-xrv5.onrender.com/productos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then(data => {
        setProducto(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error trayendo datos de Java:", err);
        setCargando(false);
      });
  }, [id]);

  if (cargando) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando desde la base de datos...</h2>;
  if (!producto) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Producto no encontrado</h2>;

  const hayStock = producto.stock > 0;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
      <h1>{producto.nombre}</h1>
      <img src={producto.imagen} alt={producto.nombre} style={{ width: '300px', borderRadius: '10px' }} />
      
      <h3 style={{ fontSize: '28px', margin: '15px 0' }}>Precio: ${producto.precio}</h3>
      <p style={{ fontWeight: 'bold', color: hayStock ? 'lightgreen' : 'red', fontSize: '18px' }}>
        {hayStock ? `Stock disponible: ${producto.stock}` : "Agotado"}
      </p>

      {/* NUEVO BLOQUE DE DESCRIPCIÓN */}
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '8px', margin: '20px 0', textAlign: 'left', border: '1px solid #444' }}>
        <h4 style={{ color: '#ffbb00', marginTop: 0 }}>Descripción del producto</h4>
        <p style={{ lineHeight: '1.6', fontSize: '15px', color: '#ddd' }}>{producto.info}</p>
      </div>
      
      {/* BLOQUE FÍSICO (Se ve igual que antes) */}
      {producto.tipo === 'fisico' && (
        <div style={{ border: '1px solid orange', padding: '15px', margin: '15px 0', textAlign: 'left' }}>
          <h4 style={{ color: 'orange', marginTop: 0 }}>Especificaciones Físicas</h4>
          <p><strong>Marca:</strong> {producto.marca}</p>
          <p><strong>Color:</strong> {producto.color}</p>
          <p><strong>Logística:</strong> {producto.envio ? "🚚 Envío a domicilio habilitado" : "🏠 Solo retiro presencial"}</p>
        </div>
      )}

      {/* BLOQUE DIGITAL (Se ve igual que antes, con la licencia de tiempo) */}
      {producto.tipo === 'digital' && (
        <div style={{ border: '1px solid #00a8ff', padding: '15px', margin: '15px 0', textAlign: 'left' }}>
          <h4 style={{ color: '#00a8ff', marginTop: 0 }}>Detalles del Software</h4>
          <p><strong>Plataforma:</strong> {producto.plataforma}</p>
          <p><strong>Desarrollador:</strong> {producto.desarrollador}</p>
          <p><strong>Duración de la licencia:</strong> {producto.licencia}</p>
        </div>
      )}

      {/* BOTÓN CONDICIONADO POR STOCK */}
      <div style={{ marginTop: '30px' }}>
        {!hayStock ? (
          <button className="add-to-cart-button" disabled style={{ borderColor: 'red', color: 'red', cursor: 'not-allowed' }}>
            Sin Stock
          </button>
        ) : (
          <button className="add-to-cart-button" onClick={() => addToCart(producto)}>
            Agregar al carrito
          </button>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <Link to="/" style={{ color: '#ffbb00', textDecoration: 'none' }}>← Volver a la tienda</Link>
      </div>
    </div>
  );
}