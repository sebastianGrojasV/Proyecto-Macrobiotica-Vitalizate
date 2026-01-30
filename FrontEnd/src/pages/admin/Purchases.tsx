import { useState } from 'react';
import { ShoppingCart, Plus, Eye, Check, X, Clock, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/layouts/AdminLayout';
import { PURCHASE_STATUS, formatCurrency, formatDate } from '@/lib/constants';

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  date: string;
  status: keyof typeof PURCHASE_STATUS;
  total: number;
  items: number;
  expectedDelivery: string;
}

export default function Purchases() {
  const mockPurchases: PurchaseOrder[] = [
    {
      id: '1',
      orderNumber: 'OC-202512-0001',
      supplier: 'NaturalLife Distribuidora CR',
      date: '01/12/2025',
      status: 'received',
      total: 2500000,
      items: 5,
      expectedDelivery: '05/12/2025',
    },
    {
      id: '2',
      orderNumber: 'OC-202512-0002',
      supplier: 'Herbal Solutions Costa Rica',
      date: '28/11/2025',
      status: 'ordered',
      total: 1800000,
      items: 3,
      expectedDelivery: '08/12/2025',
    },
    {
      id: '3',
      orderNumber: 'OC-202512-0003',
      supplier: 'BioSupplements Internacional CR',
      date: '25/11/2025',
      status: 'approved',
      total: 3200000,
      items: 7,
      expectedDelivery: '10/12/2025',
    },
    {
      id: '4',
      orderNumber: 'OC-202512-0004',
      supplier: 'Superfoods Importadora',
      date: '20/11/2025',
      status: 'pending',
      total: 1500000,
      items: 4,
      expectedDelivery: '15/12/2025',
    },
    {
      id: '5',
      orderNumber: 'OC-202512-0005',
      supplier: 'Organic Imports Costa Rica',
      date: '15/11/2025',
      status: 'draft',
      total: 950000,
      items: 2,
      expectedDelivery: '20/12/2025',
    },
  ];

  const allPurchases = mockPurchases;
  const pendingPurchases = mockPurchases.filter(p => ['draft', 'pending', 'approved'].includes(p.status));
  const activePurchases = mockPurchases.filter(p => p.status === 'ordered');
  const completedPurchases = mockPurchases.filter(p => p.status === 'received');

  const totalPending = pendingPurchases.reduce((sum, p) => sum + p.total, 0);
  const totalActive = activePurchases.reduce((sum, p) => sum + p.total, 0);
  const totalCompleted = completedPurchases.reduce((sum, p) => sum + p.total, 0);

  const PurchaseTable = ({ purchases }: { purchases: PurchaseOrder[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número de Orden</TableHead>
          <TableHead>Proveedor</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Entrega Estimada</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase) => (
          <TableRow key={purchase.id}>
            <TableCell className="font-medium">{purchase.orderNumber}</TableCell>
            <TableCell>{purchase.supplier}</TableCell>
            <TableCell>{purchase.date}</TableCell>
            <TableCell>{purchase.items} productos</TableCell>
            <TableCell>
              <Badge className={PURCHASE_STATUS[purchase.status].color}>
                {PURCHASE_STATUS[purchase.status].label}
              </Badge>
            </TableCell>
            <TableCell>{purchase.expectedDelivery}</TableCell>
            <TableCell className="font-semibold text-primary">
              {formatCurrency(purchase.total)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
                {purchase.status === 'pending' && (
                  <Button variant="ghost" size="icon" className="text-green-600">
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                {purchase.status === 'ordered' && (
                  <Button variant="ghost" size="icon" className="text-blue-600">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900">
              Órdenes de Compra
            </h1>
            <p className="text-gray-600 mt-1">
              Gestión de compras a proveedores
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-primary hover:bg-forest">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Orden de Compra
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Órdenes</p>
                  <p className="text-2xl font-bold text-gray-900">{allPurchases.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingPurchases.length}</p>
                  <p className="text-xs text-gray-600 mt-1">{formatCurrency(totalPending)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En Proceso</p>
                  <p className="text-2xl font-bold text-blue-600">{activePurchases.length}</p>
                  <p className="text-xs text-gray-600 mt-1">{formatCurrency(totalActive)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completadas</p>
                  <p className="text-2xl font-bold text-green-600">{completedPurchases.length}</p>
                  <p className="text-xs text-gray-600 mt-1">{formatCurrency(totalCompleted)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchases Table */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle>Lista de Órdenes de Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Todas ({allPurchases.length})</TabsTrigger>
                <TabsTrigger value="pending">Pendientes ({pendingPurchases.length})</TabsTrigger>
                <TabsTrigger value="active">En Proceso ({activePurchases.length})</TabsTrigger>
                <TabsTrigger value="completed">Completadas ({completedPurchases.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <PurchaseTable purchases={allPurchases} />
              </TabsContent>
              <TabsContent value="pending" className="mt-6">
                <PurchaseTable purchases={pendingPurchases} />
              </TabsContent>
              <TabsContent value="active" className="mt-6">
                <PurchaseTable purchases={activePurchases} />
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <PurchaseTable purchases={completedPurchases} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}