import { ShoppingCart, Home, Store, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ cartCount }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="logo-highlight">Paradiise</span> Store
        </Link>
      </div>

      {/* Enlaces principales */}
      <div className="nav-center">
        <Link
          to="/"
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <Home size={18} /> Inicio
        </Link>
        <Link
          to="/products"
          className={`nav-item ${location.pathname === '/products' ? 'active' : ''}`}
        >
          <Store size={18} /> Productos
        </Link>
        <Link
          to="/account"
          className={`nav-item ${location.pathname === '/account' ? 'active' : ''}`}
        >
          <User size={18} /> Cuenta
        </Link>
      </div>

      {/* Carrito */}
      <div className="nav-right">
        <Link to="/cart" className="cart-btn">
          <ShoppingCart size={22} />
          <span>Carrito</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
