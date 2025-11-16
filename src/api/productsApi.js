// src/api/productsApi.js

const API_BASE = "https://fakestoreapi.com";

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Error cargando productos");

  const data = await res.json();
  return data;
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");

  return await res.json();
}
