import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../api/productsApi";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <h2 style={{ padding: 40 }}>Cargando producto...</h2>;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "350px",
          borderRadius: "10px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      />

      <h2>{product.title}</h2>

      <p>
        <strong>Categoría:</strong> {product.category}
      </p>

      <p style={{ maxWidth: "600px", margin: "10px auto", color: "#555" }}>
        {product.description}
      </p>

      <p style={{ fontSize: "22px", fontWeight: "bold", color: "#4a00e0" }}>
        ${product.price}
      </p>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.title,
            price: product.price,
            imageUrl: product.image,
          })
        }
        style={{
          marginTop: "15px",
          background: "linear-gradient(90deg, #4a00e0, #8e2de2)",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "999px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Agregar al carrito
      </button>

      <div style={{ marginTop: "20px" }}>
        <Link to="/products">← Volver</Link>
      </div>
    </div>
  );
}
