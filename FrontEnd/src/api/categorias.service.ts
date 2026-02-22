import { api } from "./api";

export type CategoriaDto = {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
};

export async function obtenerCategorias(): Promise<CategoriaDto[]> {
  const res = await api.get("/api/Categoria", { validateStatus: () => true });

  // Tu Controller devuelve 204 si no hay registros
  if (res.status === 204) return [];

  if (res.status >= 200 && res.status < 300) return res.data as CategoriaDto[];

  throw new Error(`Error cargando categorías: ${res.status}`);
}

export async function obtenerCategoriaPorId(id: string): Promise<CategoriaDto> {
  const res = await api.get(`/api/Categoria/${id}`);
  return res.data as CategoriaDto;
}