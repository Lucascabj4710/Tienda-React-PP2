import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGllbmRhJTIwZGUlMjByb3BhfGVufDB8fDB8fHww')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Capa oscura para el texto */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 2, padding: "20px" }}>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "900",
            textShadow: "0 4px 15px rgba(0,0,0,0.6)",
            marginBottom: "10px",
          }}
        >
          Bienvenido a Paradiise Store 
        </h1>

        <p
          style={{
            fontSize: "20px",
            maxWidth: "600px",
            margin: "0 auto 25px",
            lineHeight: "1.4",
            textShadow: "0 2px 10px rgba(0,0,0,0.6)",
          }}
        >
          Descubrí la mejor ropa, estilo y moda con la experiencia más simple y
          visual.
        </p>

        <Link
          to="/products"
          style={{
            padding: "12px 30px",
            background: "linear-gradient(90deg, #e84a96, #f062a4)",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: "700",
            color: "white",
            fontSize: "18px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1.0)")}
        >
          Ver Productos
        </Link>
      </div>
    </div>
  );
}
