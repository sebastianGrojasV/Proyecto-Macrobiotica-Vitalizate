export interface Return {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: string;
  quantity: number;
  amount: number;
  description: string;
}

export const mockReturns: Return[] = [
  {
    id: 'RET-2025-001',
    orderId: 'ORD-2025-003',
    productName: 'Ashwagandha Premium 500mg',
    productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    reason: 'Producto defectuoso',
    status: 'approved',
    requestDate: '2025-01-15',
    quantity: 1,
    amount: 18545,
    description: 'El producto llegó con el sello de seguridad roto',
  },
  {
    id: 'RET-2025-002',
    orderId: 'ORD-2025-005',
    productName: 'Té Verde Matcha Orgánico',
    productImage: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    reason: 'No es lo que esperaba',
    status: 'pending',
    requestDate: '2025-01-20',
    quantity: 1,
    amount: 21195,
    description: 'El sabor no es el que esperaba según la descripción',
  },
];

export const RETURN_STATUS = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Aprobada', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rechazada', color: 'bg-red-100 text-red-800' },
  completed: { label: 'Completada', color: 'bg-blue-100 text-blue-800' },
};

export const returnReasons = [
  'Producto defectuoso',
  'Producto dañado en el envío',
  'No es lo que esperaba',
  'Recibí el producto equivocado',
  'Cambié de opinión',
  'Encontré un mejor precio',
  'Otro',
];