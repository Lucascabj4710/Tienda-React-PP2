import { Link, useNavigate } from "react-router-dom";

export default function Cart({ cart, removeFromCart, setCart }) {
  const total = cart.reduce((acc, p) => acc + p.price, 0);
  const navigate = useNavigate();

  // 🔥 SIMULAR COMPRA
  const handlePurchase = () => {
    alert("¡Compra realizada con éxito! 🛍️✨");
    setCart([]);
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/products">Ver productos</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🛍️ Tu Carrito
      </h2>

      {cart.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            padding: "12px 18px",
            marginBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src={
                p.imageUrl ||
                "https://via.placeholder.com/80x80?text=Sin+imagen"
              }
              alt={p.name}
              width="80"
              height="80"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />

            <div>
              <h4 style={{ margin: 0 }}>{p.name}</h4>
              <p style={{ color: "#666", margin: "4px 0" }}>
                ${p.price.toLocaleString("es-AR")}
              </p>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(p.id)}
            style={{
              background: "linear-gradient(90deg, #e84a96, #f062a4)",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Quitar
          </button>
        </div>
      ))}

      <h3 style={{ textAlign: "right", marginTop: "30px" }}>
        Total: ${total.toLocaleString("es-AR")}
      </h3>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          onClick={handlePurchase}
          style={{
            background: "linear-gradient(90deg, #4a00e0, #8e2de2)",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
