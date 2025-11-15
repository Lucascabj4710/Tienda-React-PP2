import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";   // ← 🔥 AGREGADO

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Router>
        <Navbar cartCount={cart.length} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route 
            path="/products" 
            element={<Products addToCart={addToCart} />} 
          />

          <Route
            path="/products/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                setCart={setCart}   // ← NECESARIO
              />
            }
          />
        </Routes>
      </Router>

      {/* 🔥 FOOTER GLOBAL */}
      <Footer />
    </>
  );
}
