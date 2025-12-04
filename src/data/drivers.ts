export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: 'motorcycle' | 'car' | 'van';
  vehiclePlate: string;
  status: 'active' | 'inactive' | 'on_delivery';
  rating: number;
  totalDeliveries: number;
  joinDate: string;
}

export interface DeliveryLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface AssignedOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  location: DeliveryLocation;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  assignedDate: string;
  pickupTime?: string;
  deliveryTime?: string;
  estimatedDeliveryTime: string;
  priority: 'normal' | 'urgent';
  paymentMethod: 'cash' | 'card' | 'sinpe';
  notes?: string;
}

export interface DeliveryHistory {
  id: string;
  orderId: string;
  customerName: string;
  deliveryAddress: string;
  total: number;
  deliveryDate: string;
  deliveryTime: string;
  status: 'delivered' | 'failed';
  rating?: number;
  tip?: number;
  notes?: string;
}

export const mockDriver: Driver = {
  id: 'driver-001',
  name: 'Carlos Rodríguez',
  phone: '8765-4321',
  email: 'carlos.rodriguez@vitalizate.cr',
  vehicleType: 'motorcycle',
  vehiclePlate: 'ABC-123',
  status: 'active',
  rating: 4.8,
  totalDeliveries: 342,
  joinDate: '2023-06-15',
};

export const mockAssignedOrders: AssignedOrder[] = [
  {
    id: 'delivery-001',
    orderId: 'ORD-2025-001',
    customerName: 'Juan Pérez',
    customerPhone: '8888-8888',
    deliveryAddress: 'San José, Escazú, San Rafael. Del Centro Comercial Multiplaza, 200 metros oeste, casa #45',
    location: {
      lat: 9.9281,
      lng: -84.0907,
      address: 'Escazú, San José',
    },
    products: [
      { name: 'Espirulina Orgánica 500mg', quantity: 2, price: 15895 },
      { name: 'Cúrcuma con Pimienta Negra', quantity: 1, price: 13245 },
    ],
    total: 47684,
    status: 'pending',
    assignedDate: '2025-01-25',
    estimatedDeliveryTime: '14:30',
    priority: 'urgent',
    paymentMethod: 'sinpe',
    notes: 'Tocar el timbre dos veces',
  },
  {
    id: 'delivery-002',
    orderId: 'ORD-2025-002',
    customerName: 'María González',
    customerPhone: '8777-7777',
    deliveryAddress: 'San José, Curridabat, Granadilla. Frente al Parque de Granadilla, edificio verde, apto 5B',
    location: {
      lat: 9.9167,
      lng: -84.0333,
      address: 'Curridabat, San José',
    },
    products: [
      { name: 'Ashwagandha Premium 500mg', quantity: 1, price: 18545 },
      { name: 'Té Verde Matcha Orgánico', quantity: 1, price: 21195 },
    ],
    total: 42390,
    status: 'pending',
    assignedDate: '2025-01-25',
    estimatedDeliveryTime: '15:00',
    priority: 'normal',
    paymentMethod: 'card',
  },
  {
    id: 'delivery-003',
    orderId: 'ORD-2025-003',
    customerName: 'Pedro Ramírez',
    customerPhone: '8666-6666',
    deliveryAddress: 'Heredia, Heredia Centro. Del Parque Central, 100 metros norte, casa amarilla',
    location: {
      lat: 9.9989,
      lng: -84.1169,
      address: 'Heredia Centro',
    },
    products: [
      { name: 'Omega-3 Vegano DHA+EPA', quantity: 1, price: 23845 },
    ],
    total: 26495,
    status: 'in_transit',
    assignedDate: '2025-01-25',
    pickupTime: '13:00',
    estimatedDeliveryTime: '15:30',
    priority: 'normal',
    paymentMethod: 'cash',
  },
];

export const mockDeliveryHistory: DeliveryHistory[] = [
  {
    id: 'hist-001',
    orderId: 'ORD-2025-100',
    customerName: 'Ana Martínez',
    deliveryAddress: 'San José, Escazú, San Rafael',
    total: 34140,
    deliveryDate: '2025-01-24',
    deliveryTime: '16:45',
    status: 'delivered',
    rating: 5,
    tip: 2650,
  },
  {
    id: 'hist-002',
    orderId: 'ORD-2025-099',
    customerName: 'Luis Hernández',
    deliveryAddress: 'Alajuela, Alajuela Centro',
    total: 29145,
    deliveryDate: '2025-01-24',
    deliveryTime: '14:20',
    status: 'delivered',
    rating: 5,
  },
  {
    id: 'hist-003',
    orderId: 'ORD-2025-098',
    customerName: 'Carmen Solís',
    deliveryAddress: 'Cartago, Cartago Centro',
    total: 42390,
    deliveryDate: '2025-01-24',
    deliveryTime: '11:30',
    status: 'delivered',
    rating: 4,
  },
  {
    id: 'hist-004',
    orderId: 'ORD-2025-097',
    customerName: 'Roberto Castro',
    deliveryAddress: 'San José, Curridabat',
    total: 18545,
    deliveryDate: '2025-01-23',
    deliveryTime: '17:00',
    status: 'delivered',
    rating: 5,
    tip: 1325,
  },
  {
    id: 'hist-005',
    orderId: 'ORD-2025-096',
    customerName: 'Sofía Vargas',
    deliveryAddress: 'Heredia, San Francisco',
    total: 50339,
    deliveryDate: '2025-01-23',
    deliveryTime: '15:15',
    status: 'delivered',
    rating: 5,
  },
];

export const DELIVERY_STATUS = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  picked_up: { label: 'Recogido', color: 'bg-blue-100 text-blue-800' },
  in_transit: { label: 'En Camino', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800' },
  failed: { label: 'Fallido', color: 'bg-red-100 text-red-800' },
};

export const VEHICLE_TYPES = {
  motorcycle: { label: 'Motocicleta', icon: '🏍️' },
  car: { label: 'Automóvil', icon: '🚗' },
  van: { label: 'Furgoneta', icon: '🚐' },
};