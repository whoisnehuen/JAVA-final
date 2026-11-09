export default function Footer() {
  return (
    <footer>
      <div className="footer-contenido">
        <div className="footer-seccion">
          <h3>Sobre Nosotros</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna accessio potest, si aliquod aeternum et infinitum impendere malum nobis opinemur. Quod idem licet transferre in voluptatem.</p>
        </div>
        
        <div className="footer-seccion">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-seccion">
          <h3>Seguime</h3>
          <ul className="social">
            <li><a href="https://github.com/whoisnehuen" target="_blank" rel="noopener noreferrer">Github</a></li>
            <li><a href="#">Tiktok</a></li>
            <li><a href="https://instagram.com/espinaca8_" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>&copy; 2024 Nehuen's. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}