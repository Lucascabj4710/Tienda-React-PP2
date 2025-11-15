// src/api/productsApi.js

const API_BASE = "https://api.escuelajs.co/api/v1";

export async function fetchProducts({ offset = 0, limit = 20 } = {}) {
  const url = `${API_BASE}/products?offset=${offset}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error al cargar productos: " + res.status);
  }
  const data = await res.json();
  return data;
}

export async function fetchProductById(id) {
  const url = `${API_BASE}/products/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Producto no encontrado: " + res.status);
  }
  const data = await res.json();
  return data;
}
