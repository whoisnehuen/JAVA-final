import { Link } from 'react-router-dom';

export default function Header({ cartCount }) {
  const noDisponible = () => alert("Página en desarrollo");

  return (
    <header>
      <h1>TiendaGamer</h1>
      <br />
      
      {/* El botón ahora redirige a /carrito en lugar de abrir un modal */}
      <Link to="/carrito">
        <button className="btn-carrito">
          <i className="fa-solid fa-cart-shopping fa-beat-fade"></i> Carrito (<span>{cartCount}</span>)
        </button>
      </Link>
      
      <Link to="/bodega">
        <button className="btn-bodega">
          <i className="fa-solid fa-circle-user fa-float"></i> Bodega
        </button>
      </Link>
      
      <br />
      <ul>
        <li><Link to="/"><i className="fa-solid fa-house"></i> Inicio</Link></li>
        <li><a href="#" onClick={noDisponible}><i className="fa-solid fa-bars"></i> Categorias</a></li>
        <li><a href="#" id="ofertas" onClick={noDisponible}><i className="fa-solid fa-exclamation fa-shake"></i> Ofertas</a></li>
      </ul>
    </header>
  );
}