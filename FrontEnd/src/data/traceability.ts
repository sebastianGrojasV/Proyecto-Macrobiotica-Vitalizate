export interface TraceabilityStage {
  id: string;
  stage: string;
  description: string;
  location: string;
  date: string;
  time: string;
  responsible: string;
  status: 'completed' | 'in_progress' | 'pending';
  certifications?: string[];
  notes?: string;
}

export interface ProductBatch {
  id: string;
  batchNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  qrCode: string;
  manufacturingDate: string;
  expirationDate: string;
  quantity: number;
  origin: string;
  supplier: string;
  certifications: string[];
  stages: TraceabilityStage[];
  isVerified: boolean;
  createdAt: string;
}

export const mockTraceabilityStages: TraceabilityStage[] = [
  {
    id: 'stage-001',
    stage: 'Cultivo y Cosecha',
    description: 'Cultivo orgánico certificado de espirulina en granjas controladas',
    location: 'Granja Orgánica Valle Verde, Cartago, Costa Rica',
    date: '2025-01-05',
    time: '08:00',
    responsible: 'Juan Ramírez - Ingeniero Agrónomo',
    status: 'completed',
    certifications: ['Orgánico USDA', 'Certificación MAG'],
    notes: 'Condiciones óptimas de cultivo, pH 9.5, temperatura 35°C',
  },
  {
    id: 'stage-002',
    stage: 'Procesamiento',
    description: 'Secado y pulverización en instalaciones certificadas',
    location: 'Planta de Procesamiento NutriCR, Heredia',
    date: '2025-01-08',
    time: '10:30',
    responsible: 'María González - Supervisora de Producción',
    status: 'completed',
    certifications: ['BPM', 'HACCP', 'ISO 22000'],
    notes: 'Proceso de secado por aspersión a baja temperatura',
  },
  {
    id: 'stage-003',
    stage: 'Control de Calidad',
    description: 'Análisis microbiológico y nutricional completo',
    location: 'Laboratorio Certificado LabCR, San José',
    date: '2025-01-10',
    time: '14:00',
    responsible: 'Dr. Carlos Mora - Químico Analista',
    status: 'completed',
    certifications: ['ISO 17025', 'Acreditación ECA'],
    notes: 'Todos los parámetros dentro de especificaciones',
  },
  {
    id: 'stage-004',
    stage: 'Envasado',
    description: 'Envasado en cápsulas vegetales en ambiente controlado',
    location: 'Planta de Envasado Vitalízate, Alajuela',
    date: '2025-01-12',
    time: '09:00',
    responsible: 'Ana Solís - Jefa de Envasado',
    status: 'completed',
    certifications: ['BPM', 'Sala Limpia Clase 100,000'],
    notes: 'Envasado en atmósfera modificada para mayor conservación',
  },
  {
    id: 'stage-005',
    stage: 'Almacenamiento',
    description: 'Almacenamiento en bodega con control de temperatura y humedad',
    location: 'Centro de Distribución Vitalízate, San José',
    date: '2025-01-15',
    time: '11:00',
    responsible: 'Roberto Castro - Gerente de Logística',
    status: 'completed',
    certifications: ['BPA', 'Control de Temperatura'],
    notes: 'Temperatura: 18-22°C, Humedad relativa: 40-60%',
  },
  {
    id: 'stage-006',
    stage: 'Distribución',
    description: 'Distribución a puntos de venta y clientes finales',
    location: 'En tránsito',
    date: '2025-01-20',
    time: '08:00',
    responsible: 'Carlos Rodríguez - Repartidor',
    status: 'in_progress',
    notes: 'Transporte refrigerado para mantener calidad del producto',
  },
];

export const mockProductBatches: ProductBatch[] = [
  {
    id: 'batch-001',
    batchNumber: 'ESP-2025-001',
    productId: 'prod-001',
    productName: 'Espirulina Orgánica 500mg',
    productImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
    qrCode: 'VTZ-ESP-2025-001-A1B2C3',
    manufacturingDate: '2025-01-12',
    expirationDate: '2027-01-12',
    quantity: 1000,
    origin: 'Cartago, Costa Rica',
    supplier: 'Granja Orgánica Valle Verde',
    certifications: [
      'Orgánico USDA',
      'Certificación MAG',
      'BPM',
      'HACCP',
      'ISO 22000',
      'Sin Gluten',
      'Vegano',
    ],
    stages: mockTraceabilityStages,
    isVerified: true,
    createdAt: '2025-01-05',
  },
  {
    id: 'batch-002',
    batchNumber: 'ASH-2025-002',
    productId: 'prod-002',
    productName: 'Ashwagandha Premium 500mg',
    productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    qrCode: 'VTZ-ASH-2025-002-D4E5F6',
    manufacturingDate: '2025-01-10',
    expirationDate: '2027-01-10',
    quantity: 800,
    origin: 'India (Importado)',
    supplier: 'Organic Herbs International',
    certifications: [
      'Orgánico USDA',
      'BPM',
      'HACCP',
      'ISO 22000',
      'Certificado Ayurvédico',
    ],
    stages: mockTraceabilityStages.slice(2), // Starts from quality control
    isVerified: true,
    createdAt: '2025-01-10',
  },
];

export const STAGE_STATUS = {
  completed: { label: 'Completado', color: 'bg-green-100 text-green-800' },
  in_progress: { label: 'En Progreso', color: 'bg-blue-100 text-blue-800' },
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
};

export const generateQRCode = (batchNumber: string): string => {
  const prefix = 'VTZ';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${batchNumber}-${timestamp}-${random}`;
};

export const verifyQRCode = (qrCode: string): boolean => {
  // Verificación simple: comprobar si el código QR sigue el formato esperado
  const pattern = /^VTZ-[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+$/;
  return pattern.test(qrCode);
};

export const findBatchByQRCode = (qrCode: string): ProductBatch | undefined => {
  return mockProductBatches.find((batch) => batch.qrCode === qrCode);
};