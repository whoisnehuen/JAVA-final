import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminBodega from './pages/AdminBodega';
import CartPage from './pages/CartPage';
import './index.css';

export default function App() {
  // El carrito sigue siendo global
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === producto.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...producto, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <Header cartCount={cartCount} />
      <Routes>
        {/* Ya no pasamos la lista estática, cada componente hace su fetch */}
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/producto/:id" element={<ProductDetail addToCart={addToCart} />} />
        
        {/* AdminBodega ya tiene sus propios fetch internos */}
        <Route path="/bodega" element={<AdminBodega />} />
        
        <Route path="/carrito" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
      <Footer />
    </Router>
  );
}