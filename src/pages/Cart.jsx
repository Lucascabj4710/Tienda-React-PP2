import { Link, useNavigate } from "react-router-dom";

export default function Cart({ cart, removeFromCart, setCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((acc, p) => acc + p.price, 0);

  const handlePurchase = () => {
    alert("¡Compra realizada con éxito! ");
    setCart([]);
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Tu carrito está vacío 🛒</h2>
        <Link
          to="/products"
          style={{
            padding: "12px 24px",
            background: "linear-gradient(90deg, #e84a96, #f062a4)",
            color: "white",
            textDecoration: "none",
            borderRadius: "30px",
            fontWeight: "600",
            fontSize: "18px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "auto" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "32px",
          fontWeight: "800",
          letterSpacing: "-0.5px",
        }}
      >
         Tu Carrito
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
        }}
      >
        {/* Productos del Carrito */}
        <div>
          {cart.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                background: "white",
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                transition: "0.2s",
              }}
            >
              <img
                src={
                  p.imageUrl ||
                  "https://via.placeholder.com/90x90?text=Sin+imagen"
                }
                alt={p.name}
                width="90"
                height="90"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  {p.name}
                </h3>

                <p style={{ color: "#666", margin: "6px 0" }}>
                  ${p.price.toLocaleString("es-AR")}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(p.id)}
                style={{
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "0 4px 10px rgba(244,67,54,0.3)",
                }}
              >
                Quitar
              </button>
            </div>
          ))}
        </div>

        {/* Resumen de Compra */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            height: "fit-content",
            position: "sticky",
            top: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "22px",
              marginBottom: "20px",
              fontWeight: "700",
            }}
          >
            Resumen de compra
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
              color: "#555",
            }}
          >
            <span>Subtotal</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              color: "#555",
            }}
          >
            <span>Envío</span>
            <span style={{ color: "#4caf50" }}>Gratis</span>
          </div>

          <hr style={{ margin: "20px 0" }} />

          <h3
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "800",
            }}
          >
            <span>Total</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </h3>

          <button
            onClick={handlePurchase}
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(90deg, #4a00e0, #8e2de2)",
              color: "white",
              border: "none",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 5px 14px rgba(138,43,226,0.4)",
            }}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
