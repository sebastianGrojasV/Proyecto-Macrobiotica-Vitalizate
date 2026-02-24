import { User } from './types';

const API_BASE = (import.meta.env.VITE_API_URL as string) || '';

async function handleResponse(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/api/Usuario`);
  if (!res.ok) throw new Error(`Error fetching users: ${res.status}`);
  return handleResponse(res);
}

export async function createUser(payload: Partial<User> & { password?: string }): Promise<User> {
  const res = await fetch(`${API_BASE}/api/Usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error creating user: ${res.status}`);
  return handleResponse(res);
}

export async function deleteUserApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/Usuario/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Error deleting user: ${res.status}`);
  return;
}

export async function updateUser(id: string, payload: Partial<User>): Promise<User> {
  const res = await fetch(`${API_BASE}/api/Usuario/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error updating user: ${res.status}`);
  return handleResponse(res);
}

export default {
  getUsers,
  createUser,
  deleteUserApi,
  updateUser,
};
