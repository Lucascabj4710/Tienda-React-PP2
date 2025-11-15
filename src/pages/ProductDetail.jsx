import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Traer producto por ID desde API
  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          id: data.id,
          name: data.title,
          price: data.price,
          imageUrl: data.images?.[0],
          description: data.description,
          material: data.category?.name,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <h2 style={{ padding: 40 }}>Cargando producto...</h2>;

  if (!product)
    return (
      <div style={{ padding: 40 }}>
        <h2>Producto no encontrado 😢</h2>
        <Link to="/products">Volver a productos</Link>
      </div>
    );

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "400px",
          borderRadius: "10px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      />

      <h2>{product.name}</h2>

      <p>
        <strong>Categoría:</strong> {product.material}
      </p>

      <p style={{ maxWidth: "600px", margin: "10px auto", color: "#555" }}>
        {product.description}
      </p>

      <p style={{ fontSize: "22px", fontWeight: "bold", color: "#4a00e0" }}>
        ${product.price.toLocaleString("es-AR")}
      </p>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
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
