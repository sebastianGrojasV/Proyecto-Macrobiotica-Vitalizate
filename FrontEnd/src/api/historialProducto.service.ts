import { api } from "./api";

export type HistorialProductoDto = {
  id: string;
  product_id: string;
  action: string;
  description: string;
  old_values: string | null;
  new_values: string | null;
  created_at: string; // DateTimeOffset llega como string ISO
};

export async function obtenerHistorialProducto(idProducto: string): Promise<HistorialProductoDto[]> {
  const res = await api.get(`/api/HistorialProducto/${idProducto}`, { validateStatus: () => true });

  // Tu controller devuelve 204 si no hay registros
  if (res.status === 204) return [];

  if (res.status >= 200 && res.status < 300) return res.data as HistorialProductoDto[];

  throw new Error(`Error cargando historial: ${res.status}`);
}