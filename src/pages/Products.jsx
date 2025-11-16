import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price,asc");

  //  Cargar productos desde FakeStoreAPI
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {

        //  Mantener solo ropa
        let filtered = data.filter(
          (p) =>
            p.category === "men's clothing" ||
            p.category === "women's clothing"
        );

        //  Validar imagen real
        filtered = filtered.filter((p) => {
          const img = p.image || "";
          return img && img.length > 10;
        });

        //  Validar título válido
        filtered = filtered.filter((p) => {
          const title = p.title?.toLowerCase() || "";
          return title.length > 4 && !title.includes("backpack") && !title.includes("bag");
        });

        setProducts(filtered);
      });
  }, []);

  //  Búsqueda + orden
  const filtered = useMemo(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    const [key, direction] = sort.split(",");
    result.sort((a, b) =>
      direction === "asc" ? a.price - b.price : b.price - a.price
    );

    return result;
  }, [products, search, sort]);

  return (
    <div className="wrapper">
      <div className="page-head">
        <Link to="/" className="back-btn">← Volver a Inicio</Link>
        <h1> Ropa y Moda </h1>
      </div>

      <div className="toolbar">
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

        <div className="meta-chip">{filtered.length} prenda(s)</div>
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <div key={p.id} className="card">

            <div className="media">
              <img
                src={p.image}
                alt={p.title}
                onError={(e) =>
                  e.target.src =
                    "https://via.placeholder.com/500x400?text=Sin+imagen"
                }
              />
            </div>

            <div className="card-body">
              <div className="card-title">{p.title}</div>
              <div className="card-sub">{p.category}</div>
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
                    imageUrl: p.image,
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
