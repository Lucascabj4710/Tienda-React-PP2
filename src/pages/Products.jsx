import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [material, setMaterial] = useState("");
  const [sort, setSort] = useState("price,asc");

  // 🔥 Cargar productos desde API
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        let clothing = data.filter(
          (p) =>
            p.category?.name === "Clothes" ||
            p.category?.name === "Shoes" ||
            p.category?.name === "Others"
        );

        // filtros eliminando basura
        clothing = clothing.filter((p) => {
          const title = p.title?.toLowerCase() || "";
          const isFake =
            title.includes("mohammad") ||
            title.includes("_") ||
            title.length < 4 ||
            p.images?.[0]?.includes("placehold") ||
            p.images?.[0]?.includes("600") ||
            !p.images?.[0] ||
            p.price === 0;

          return !isFake;
        });

        clothing = clothing.filter(
          (p) => p.images && p.images[0] && p.images[0].length > 10
        );

        setProducts(clothing);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // filtros + orden
  const filtered = useMemo(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (material !== "") {
      result = result.filter((p) =>
        p.description?.toLowerCase().includes(material.toLowerCase())
      );
    }

    const [key, direction] = sort.split(",");
    result.sort((a, b) =>
      direction === "asc" ? a.price - b.price : b.price - a.price
    );

    return result;
  }, [products, search, material, sort]);

  return (
    <div className="wrapper">
      <div className="page-head">
        <Link to="/" className="back-btn">
          <i className="fa-solid fa-arrow-left"></i> Volver a Inicio
        </Link>
        <h1>✨ Ropa y Moda ✨</h1>
      </div>

      <div className="toolbar">
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar prenda..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="price,asc">Precio ↑</option>
            <option value="price,desc">Precio ↓</option>
          </select>
        </div>

        <div className="meta-chip">{filtered.length} prenda(s)</div>
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <div key={p.id} className="card">
            <div className="media">
              <img
                src={p.images?.[0]}
                alt={p.title}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/600x400?text=Sin+imagen")
                }
              />
            </div>

            <div className="card-body">
              <div className="card-title">{p.title}</div>
              <div className="card-sub">{p.category?.name}</div>
              <div className="card-price">${p.price}</div>
            </div>

            <div className="card-actions">
              <Link to={`/products/${p.id}`} className="btn-view">
                Ver prenda
              </Link>

              <button
                className="btn-add"
                onClick={() =>
                  addToCart({
                    id: p.id,
                    name: p.title,
                    price: p.price,
                    imageUrl: p.images?.[0],
                  })
                }
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
