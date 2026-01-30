export interface SalesData {
  month: string;
  sales: number;
  revenue: number;
  orders: number;
}

export interface ProductSales {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  image: string;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  averageOrderValue: number;
  customerRetentionRate: number;
}

export interface CategorySales {
  category: string;
  sales: number;
  revenue: number;
  percentage: number;
}

export interface TraceabilityMetrics {
  totalVerifications: number;
  verificationsByProduct: { productName: string; verifications: number }[];
  verificationTrend: { date: string; verifications: number }[];
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

// Datos simulados para ventas a lo largo del tiempo
export const mockSalesData: SalesData[] = [
  { month: 'Ene', sales: 45000, revenue: 12500000, orders: 156 },
  { month: 'Feb', sales: 52000, revenue: 14800000, orders: 189 },
  { month: 'Mar', sales: 48000, revenue: 13200000, orders: 167 },
  { month: 'Abr', sales: 61000, revenue: 17500000, orders: 223 },
  { month: 'May', sales: 55000, revenue: 15800000, orders: 198 },
  { month: 'Jun', sales: 67000, revenue: 19200000, orders: 245 },
  { month: 'Jul', sales: 72000, revenue: 21000000, orders: 267 },
  { month: 'Ago', sales: 68000, revenue: 19800000, orders: 251 },
  { month: 'Sep', sales: 75000, revenue: 22500000, orders: 289 },
  { month: 'Oct', sales: 82000, revenue: 24800000, orders: 312 },
  { month: 'Nov', sales: 88000, revenue: 26500000, orders: 334 },
  { month: 'Dic', sales: 95000, revenue: 29000000, orders: 367 },
];

// Datos simulados para productos más vendidos
export const mockTopProducts: ProductSales[] = [
  {
    id: 'prod-001',
    name: 'Espirulina Orgánica 500mg',
    category: 'Superalimentos',
    unitsSold: 1245,
    revenue: 18675000,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
  },
  {
    id: 'prod-002',
    name: 'Ashwagandha Premium 500mg',
    category: 'Adaptógenos',
    unitsSold: 987,
    revenue: 14805000,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
  },
  {
    id: 'prod-003',
    name: 'Omega-3 Ultra Pure',
    category: 'Ácidos Grasos',
    unitsSold: 856,
    revenue: 12840000,
    image: '/images/photo1764886097.jpg',
  },
  {
    id: 'prod-004',
    name: 'Colágeno Hidrolizado',
    category: 'Proteínas',
    unitsSold: 734,
    revenue: 11010000,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
  },
  {
    id: 'prod-005',
    name: 'Vitamina D3 + K2',
    category: 'Vitaminas',
    unitsSold: 678,
    revenue: 10170000,
    image: '/images/VitaminD3.jpg',
  },
  {
    id: 'prod-006',
    name: 'Magnesio Quelado',
    category: 'Minerales',
    unitsSold: 623,
    revenue: 9345000,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
  },
  {
    id: 'prod-007',
    name: 'Probióticos 50 Billones',
    category: 'Digestión',
    unitsSold: 589,
    revenue: 8835000,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
  },
  {
    id: 'prod-008',
    name: 'Cúrcuma + Pimienta Negra',
    category: 'Antiinflamatorios',
    unitsSold: 512,
    revenue: 7680000,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400',
  },
  {
    id: 'prod-009',
    name: 'Zinc + Vitamina C',
    category: 'Inmunidad',
    unitsSold: 467,
    revenue: 7005000,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
  },
  {
    id: 'prod-010',
    name: 'Complejo B Premium',
    category: 'Vitaminas',
    unitsSold: 423,
    revenue: 6345000,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
  },
];

// Datos simulados para ventas por categoría
export const mockCategorySales: CategorySales[] = [
  { category: 'Superalimentos', sales: 2345, revenue: 35175000, percentage: 28 },
  { category: 'Vitaminas', sales: 1987, revenue: 29805000, percentage: 24 },
  { category: 'Minerales', sales: 1654, revenue: 24810000, percentage: 20 },
  { category: 'Adaptógenos', sales: 1234, revenue: 18510000, percentage: 15 },
  { category: 'Proteínas', sales: 987, revenue: 14805000, percentage: 12 },
  { category: 'Otros', sales: 123, revenue: 1845000, percentage: 1 },
];

// Datos simulados para métricas de clientes
export const mockCustomerMetrics: CustomerMetrics = {
  totalCustomers: 3456,
  newCustomers: 567,
  returningCustomers: 2889,
  averageOrderValue: 45600,
  customerRetentionRate: 83.6,
};

// Datos simulados para métricas de trazabilidad
export const mockTraceabilityMetrics: TraceabilityMetrics = {
  totalVerifications: 8934,
  verificationsByProduct: [
    { productName: 'Espirulina Orgánica', verifications: 2345 },
    { productName: 'Ashwagandha Premium', verifications: 1876 },
    { productName: 'Omega-3 Ultra Pure', verifications: 1543 },
    { productName: 'Colágeno Hidrolizado', verifications: 1234 },
    { productName: 'Vitamina D3 + K2', verifications: 987 },
    { productName: 'Otros productos', verifications: 949 },
  ],
  verificationTrend: [
    { date: '01 Dic', verifications: 234 },
    { date: '05 Dic', verifications: 289 },
    { date: '10 Dic', verifications: 312 },
    { date: '15 Dic', verifications: 356 },
    { date: '20 Dic', verifications: 398 },
    { date: '25 Dic', verifications: 423 },
    { date: '30 Dic', verifications: 467 },
  ],
};

// Datos simulados para resumen de analíticas
export const mockAnalyticsSummary: AnalyticsSummary = {
  totalRevenue: 226300000,
  totalOrders: 2998,
  averageOrderValue: 75483,
  conversionRate: 3.8,
  revenueGrowth: 18.5,
  ordersGrowth: 15.2,
};

// Función auxiliar para formatear moneda
export const formatCurrency = (amount: number): string => {
  return `₡${amount.toLocaleString('es-CR')}`;
};

// Función auxiliar para calcular cambio porcentual
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Función auxiliar para obtener color basado en valor
export const getGrowthColor = (value: number): string => {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
};