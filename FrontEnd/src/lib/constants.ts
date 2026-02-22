
// Estados de pedidos
export const ORDER_STATUS = {
  pending: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800',
  },
  processing: {
    label: 'Procesando',
    color: 'bg-blue-100 text-blue-800',
  },
  shipped: {
    label: 'En Camino',
    color: 'bg-purple-100 text-purple-800',
  },
  delivered: {
    label: 'Entregado',
    color: 'bg-green-100 text-green-800',
  },
  cancelled: {
    label: 'Cancelado',
    color: 'bg-red-100 text-red-800',
  },
};

// Configuración regional de Costa Rica
export const LOCALE_CONFIG = {
  currency: 'CRC',
  currencySymbol: '₡',
  locale: 'es-CR',
  timezone: 'America/Costa_Rica',
  dateFormat: 'DD/MM/YYYY',
  phonePrefix: '+506',
};

// Provincias de Costa Rica
export const PROVINCES = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
];

// Cantones principales por provincia
export const CANTONS: Record<string, string[]> = {
  'San José': ['San José', 'Escazú', 'Desamparados', 'Puriscal', 'Tarrazú', 'Aserrí', 'Mora', 'Goicoechea', 'Santa Ana', 'Alajuelita', 'Vázquez de Coronado', 'Acosta', 'Tibás', 'Moravia', 'Montes de Oca', 'Turrubares', 'Dota', 'Curridabat', 'Pérez Zeledón', 'León Cortés'],
  'Alajuela': ['Alajuela', 'San Ramón', 'Grecia', 'San Mateo', 'Atenas', 'Naranjo', 'Palmares', 'Poás', 'Orotina', 'San Carlos', 'Zarcero', 'Sarchí', 'Upala', 'Los Chiles', 'Guatuso', 'Río Cuarto'],
  'Cartago': ['Cartago', 'Paraíso', 'La Unión', 'Jiménez', 'Turrialba', 'Alvarado', 'Oreamuno', 'El Guarco'],
  'Heredia': ['Heredia', 'Barva', 'Santo Domingo', 'Santa Bárbara', 'San Rafael', 'San Isidro', 'Belén', 'Flores', 'San Pablo', 'Sarapiquí'],
  'Guanacaste': ['Liberia', 'Nicoya', 'Santa Cruz', 'Bagaces', 'Carrillo', 'Cañas', 'Abangares', 'Tilarán', 'Nandayure', 'La Cruz', 'Hojancha'],
  'Puntarenas': ['Puntarenas', 'Esparza', 'Buenos Aires', 'Montes de Oro', 'Osa', 'Quepos', 'Golfito', 'Coto Brus', 'Parrita', 'Corredores', 'Garabito'],
  'Limón': ['Limón', 'Pococí', 'Siquirres', 'Talamanca', 'Matina', 'Guácimo'],
};

// Síntomas para recomendaciones
export const SYMPTOMS = [
  'Fatiga',
  'Estrés',
  'Ansiedad',
  'Insomnio',
  'Dolor articular',
  'Digestión',
  'Inmunidad',
  'Memoria',
  'Energía',
  'Piel',
];

// Métodos de pago
export const PAYMENT_METHODS = [
  { id: 'card', name: 'Tarjeta de Crédito/Débito', icon: 'CreditCard' },
  { id: 'sinpe', name: 'SINPE Móvil', icon: 'Smartphone' },
  { id: 'transfer', name: 'Transferencia Bancaria', icon: 'Building' },
  { id: 'cash', name: 'Efectivo contra entrega', icon: 'Banknote' },
];

// Bancos de Costa Rica
export const BANKS = [
  'Banco Nacional de Costa Rica',
  'Banco de Costa Rica',
  'Banco Popular y de Desarrollo Comunal',
  'Banco Crédito Agrícola de Cartago',
  'BAC San José',
  'Scotiabank',
  'Banco Davivienda',
  'Banco Promerica',
  'Banco Improsa',
  'Banco Cathay',
];

// Estados de inventario
export const INVENTORY_STATUS = {
  in_stock: { label: 'En Stock', color: 'bg-green-100 text-green-800' },
  low_stock: { label: 'Stock Bajo', color: 'bg-yellow-100 text-yellow-800' },
  out_of_stock: { label: 'Agotado', color: 'bg-red-100 text-red-800' },
  discontinued: { label: 'Descontinuado', color: 'bg-gray-100 text-gray-800' },
};

// Estados de compra
export const PURCHASE_STATUS = {
  draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-800' },
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Aprobada', color: 'bg-blue-100 text-blue-800' },
  ordered: { label: 'Ordenada', color: 'bg-purple-100 text-purple-800' },
  received: { label: 'Recibida', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelada', color: 'bg-red-100 text-red-800' },
};

// Estados de factura
export const INVOICE_STATUS = {
  draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-800' },
  sent: { label: 'Enviada', color: 'bg-blue-100 text-blue-800' },
  paid: { label: 'Pagada', color: 'bg-green-100 text-green-800' },
  overdue: { label: 'Vencida', color: 'bg-red-100 text-red-800' },
  cancelled: { label: 'Anulada', color: 'bg-gray-100 text-gray-800' },
};

// Roles de usuario
export const USER_ROLES = {
  admin: 'Administrador',
  accountant: 'Contador',
  warehouse: 'Bodeguero',
  delivery: 'Repartidor',
  customer: 'Cliente',
};

// Niveles de aprobación
export const APPROVAL_LEVELS = {
  level1: { name: 'Supervisor', amount: 100000 }, // ₡100,000
  level2: { name: 'Gerente', amount: 500000 }, // ₡500,000
  level3: { name: 'Director', amount: 1000000 }, // ₡1,000,000
  level4: { name: 'CEO', amount: Infinity },
};

// Formato de moneda
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Formato de fecha
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-CR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
};

// Formato de teléfono costarricense
export const formatPhone = (phone: string): string => {
  // Formato: +506 XXXX-XXXX
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 8) {
    return `+506 ${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
  return phone;
};