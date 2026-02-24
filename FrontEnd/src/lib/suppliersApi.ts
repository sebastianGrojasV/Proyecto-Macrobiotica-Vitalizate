import { Supplier } from './types';

const API_BASE = (import.meta.env.VITE_API_URL as string) || '';

async function handleResponse(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function getSuppliers(): Promise<Supplier[]> {
  const res = await fetch(`${API_BASE}/api/Proveedor`);
  if (!res.ok) throw new Error(`Error fetching suppliers: ${res.status}`);
  return handleResponse(res);
}

export async function createSupplier(payload: Partial<Supplier>): Promise<Supplier> {
  const res = await fetch(`${API_BASE}/api/Proveedor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error creating supplier: ${res.status}`);
  return handleResponse(res);
}

export async function updateSupplier(id: string, payload: Partial<Supplier>): Promise<Supplier> {
  const res = await fetch(`${API_BASE}/api/Proveedor/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error updating supplier: ${res.status}`);
  return handleResponse(res);
}

export async function deleteSupplierApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/Proveedor/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Error deleting supplier: ${res.status}`);
  return;
}

export default {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplierApi,
};
