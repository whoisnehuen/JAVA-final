import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home({ addToCart }) {
  // Estado para guardar el JSON que responde la API
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('todos');

  // Hacemos el GET a Java al cargar la pantalla
  useEffect(() => {
    fetch('https://tiendaapi-xrv5.onrender.com/productos')
      .then(res => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error conectando con Java:", err);
        setCargando(false);
      });
  }, []); // Los corchetes vacíos aseguran que solo pida los datos una vez

  // Lógica de filtrado
  const productosFiltrados = productos.filter(prod => {
    if (filtro === 'todos') return true;
    return prod.tipo === filtro;
  });

  if (cargando) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando catálogo desde SQL...</h2>;
  }

  return (
    <div>
      {/* Botones de Filtro (Con un poco de color para saber cuál está activo) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '20px 0' }}>
        <button 
          onClick={() => setFiltro('todos')} 
          style={{ backgroundColor: filtro === 'todos' ? '#ffbb00' : 'white', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Todos
        </button>
        <button 
          onClick={() => setFiltro('fisico')} 
          style={{ backgroundColor: filtro === 'fisico' ? '#ffbb00' : 'white', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Físicos
        </button>
        <button 
          onClick={() => setFiltro('digital')} 
          style={{ backgroundColor: filtro === 'digital' ? '#ffbb00' : 'white', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Digitales
        </button>
      </div>

      {/* Si la base de datos está vacía o el filtro no encuentra nada */}
      {productosFiltrados.length === 0 ? (
        <h3 style={{ textAlign: 'center', color: 'gray', marginTop: '40px' }}>
          No hay productos en esta categoría.
        </h3>
      ) : (
        <div id="contenedor">
          {productosFiltrados.map((prod) => (
            <ProductCard key={prod.id} producto={prod} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}