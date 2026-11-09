import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ producto, addToCart }) {
  const [added, setAdded] = useState(false);

  // Verificamos si hay stock disponible
  const hayStock = producto.stock > 0;

  const handleAdd = () => {
    if (hayStock) {
      addToCart(producto);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="caja-producto">
      <Link to={`/producto/${producto.id}`}>
        <h2>{producto.nombre}</h2>
        
        {/* Etiqueta visual pequeña para saber qué tipo de producto es */}
        <span style={{ backgroundColor: producto.dtype === 'Digital' ? '#00a8ff' : 'orange', padding: '3px 8px', borderRadius: '5px', fontSize: '12px', color: 'black' }}>
          {producto.dtype === 'Digital' ? 'Digital' : 'Físico'}
        </span>
        
        <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', maxWidth: '200px', marginTop: '10px' }} />
      </Link>
      
      <h3 style={{ margin: '15px 0 5px 0' }}>Precio: ${producto.precio}</h3>
      
      {/* LÓGICA DE CUOTAS */}
      {producto.cuotas > 0 ? (
        <p style={{ color: "#ffbb00", fontWeight: "bold", margin: "5px 0" }}>
          Hasta {producto.cuotas} cuotas SIN interés de ${(producto.precio / producto.cuotas).toFixed(2)}
        </p>
      ) : (
        <p style={{ color: "gray", margin: "5px 0" }}>
          Hasta 24 cuotas CON interés
        </p>
      )}
      
      {/* LÓGICA DE STOCK Y BOTÓN */}
      <div style={{ marginTop: '15px' }}>
        {!hayStock ? (
          <button 
            className="add-to-cart-button" 
            disabled 
            style={{ borderColor: 'red', color: 'red', cursor: 'not-allowed' }}
          >
            Sin Stock
          </button>
        ) : (
          <button 
            className="add-to-cart-button" 
            onClick={handleAdd}
            style={{ backgroundColor: added ? 'green' : 'transparent' }}
          >
            {added ? "¡Agregado!" : "Agregar al carrito"}
          </button>
        )}
      </div>
    </div>
  );
}