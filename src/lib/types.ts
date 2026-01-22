export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  benefits: string[];
  ingredients: string[];
  symptoms?: string[];
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
  trackingNumber?: string;
  qrCode?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'accountant' | 'delivery';
  avatar?: string;
  cedula?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  productsSupplied: string[];
  status: 'active' | 'inactive';
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  date: string;
  expectedDelivery: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'received';
  items: PurchaseOrderItem[];
  total: number;
  approvedBy?: string;
  notes?: string;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  location: string;
  lastRestocked: string;
  expiryDate?: string;
  batchNumber?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
}

export interface Invoice {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  subtotal: number;
  tax: number;
  total: number;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Approval {
  id: string;
  type: 'purchase_order' | 'note' | 'order' | 'invoice';
  referenceId: string;
  requestedBy: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  approvers: ApprovalStep[];
  currentStep: number;
  notes?: string;
}

export interface ApprovalStep {
  level: number;
  approverId: string;
  approverName: string;
  status: 'pending' | 'approved' | 'rejected';
  date?: string;
  comments?: string;
}

export interface DashboardMetric {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  timestamp: string;
  recommendations?: Product[];
}