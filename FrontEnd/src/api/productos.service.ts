import { api } from "./api";

export type ProductoDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url?: string | null;
  is_active: boolean;
  Categoria: string; // viene en ProductoResponse
};

// Métodos GET
export async function obtenerProductos(): Promise<ProductoDto[]> {
  const res = await api.get("/api/Producto", { validateStatus: () => true });

  // Tu controller devuelve 204 si no hay registros
  if (res.status === 204) return [];

  if (res.status >= 200 && res.status < 300) return res.data as ProductoDto[];

  throw new Error(`Error cargando productos: ${res.status}`);
}

export async function obtenerProductoPorId(id: string): Promise<ProductoDto> {
  const res = await api.get(`/api/Producto/${id}`);
  return res.data as ProductoDto;
}

// Método POST
export type ProductoRequest = {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url?: string | null;
  is_active: boolean;
  category_id: string;
};

export async function agregarProducto(producto: ProductoRequest) {
  const res = await api.post("/api/Producto", producto);
  return res.data; // tu backend devuelve CreatedAtAction con Id
}

// Método DELETE
export async function eliminarProducto(id: string): Promise<void> {
  await api.delete(`/api/Producto/${id}`);
}

// Método PUT
export async function editarProducto(id: string, producto: ProductoRequest): Promise<void> {
  await api.put(`/api/Producto/${id}`, producto);
}