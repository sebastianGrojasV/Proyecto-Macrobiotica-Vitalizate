import { Order } from '@/lib/types';
import { convertUSDtoCRC } from '@/lib/utils-cr';

export const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    userId: 'user-1',
    date: '01/12/2025',
    status: 'delivered',
    total: convertUSDtoCRC(89.97), // ≈₡47,684
    items: [
      {
        productId: '1',
        productName: 'Espirulina Orgánica',
        quantity: 2,
        price: convertUSDtoCRC(29.99),
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&h=100&fit=crop',
      },
      {
        productId: '2',
        productName: 'Cúrcuma con Pimienta Negra',
        quantity: 1,
        price: convertUSDtoCRC(24.99),
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      id: 'addr-1',
      name: 'Juan Pérez Rodríguez',
      street: 'Avenida Central, Calle 5',
      city: 'San José',
      state: 'San José',
      zipCode: '10101',
      phone: '+506 8888-9999',
      isDefault: true,
    },
    trackingNumber: 'VTZ-2025-001-TRK',
    qrCode: 'QR-VTZ-001',
  },
  {
    id: 'ORD-2025-002',
    userId: 'user-1',
    date: '28/11/2025',
    status: 'shipped',
    total: convertUSDtoCRC(114.97), // ≈₡60,934
    items: [
      {
        productId: '3',
        productName: 'Ashwagandha Premium',
        quantity: 1,
        price: convertUSDtoCRC(34.99),
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop',
      },
      {
        productId: '4',
        productName: 'Té Verde Matcha Ceremonial',
        quantity: 2,
        price: convertUSDtoCRC(39.99),
        image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      id: 'addr-1',
      name: 'Juan Pérez Rodríguez',
      street: 'Avenida Central, Calle 5',
      city: 'San José',
      state: 'San José',
      zipCode: '10101',
      phone: '+506 8888-9999',
      isDefault: true,
    },
    trackingNumber: 'VTZ-2025-002-TRK',
    qrCode: 'QR-VTZ-002',
  },
  {
    id: 'ORD-2025-003',
    userId: 'user-1',
    date: '25/11/2025',
    status: 'processing',
    total: convertUSDtoCRC(94.98), // ≈₡50,339
    items: [
      {
        productId: '5',
        productName: 'Omega-3 Vegano',
        quantity: 1,
        price: convertUSDtoCRC(44.99),
        image: '/images/Vitamins.jpg',
      },
      {
        productId: '6',
        productName: 'Probióticos Multi-Cepa',
        quantity: 1,
        price: convertUSDtoCRC(49.99),
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      id: 'addr-2',
      name: 'Juan Pérez Rodríguez',
      street: 'Del Parque Central, 200m norte',
      city: 'Heredia',
      state: 'Heredia',
      zipCode: '40101',
      phone: '+506 7777-8888',
      isDefault: false,
    },
    trackingNumber: 'VTZ-2025-003-TRK',
    qrCode: 'QR-VTZ-003',
  },
];