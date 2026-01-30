import { useState } from 'react';
import { FileText, Plus, Download, Eye, Send, X } from 'lucide-react';
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
import { INVOICE_STATUS, formatCurrency } from '@/lib/constants';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  dueDate: string;
  status: keyof typeof INVOICE_STATUS;
  subtotal: number;
  tax: number;
  total: number;
  items: number;
}

export default function Invoicing() {
  const mockInvoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'FAC-202512-0001',
      customer: 'Juan Pérez Rodríguez',
      date: '01/12/2025',
      dueDate: '15/12/2025',
      status: 'paid',
      subtotal: 88495,
      tax: 11504,
      total: 100000,
      items: 3,
    },
    {
      id: '2',
      invoiceNumber: 'FAC-202512-0002',
      customer: 'María González Vargas',
      date: '28/11/2025',
      dueDate: '12/12/2025',
      status: 'sent',
      subtotal: 132743,
      tax: 17257,
      total: 150000,
      items: 4,
    },
    {
      id: '3',
      invoiceNumber: 'FAC-202512-0003',
      customer: 'Carlos Ramírez Solís',
      date: '25/11/2025',
      dueDate: '09/12/2025',
      status: 'overdue',
      subtotal: 176991,
      tax: 23009,
      total: 200000,
      items: 5,
    },
    {
      id: '4',
      invoiceNumber: 'FAC-202512-0004',
      customer: 'Ana Martínez Rojas',
      date: '20/11/2025',
      dueDate: '04/12/2025',
      status: 'paid',
      subtotal: 221239,
      tax: 28761,
      total: 250000,
      items: 6,
    },
    {
      id: '5',
      invoiceNumber: 'FAC-202512-0005',
      customer: 'Roberto Silva Mora',
      date: '15/11/2025',
      dueDate: '29/11/2025',
      status: 'draft',
      subtotal: 88495,
      tax: 11504,
      total: 100000,
      items: 2,
    },
  ];

  const allInvoices = mockInvoices;
  const draftInvoices = mockInvoices.filter(i => i.status === 'draft');
  const sentInvoices = mockInvoices.filter(i => i.status === 'sent');
  const paidInvoices = mockInvoices.filter(i => i.status === 'paid');
  const overdueInvoices = mockInvoices.filter(i => i.status === 'overdue');

  const totalDraft = draftInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalSent = sentInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalPaid = paidInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalOverdue = overdueInvoices.reduce((sum, i) => sum + i.total, 0);

  const InvoiceTable = ({ invoices }: { invoices: Invoice[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número de Factura</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Vencimiento</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
            <TableCell>{invoice.customer}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.dueDate}</TableCell>
            <TableCell>{invoice.items} productos</TableCell>
            <TableCell>
              <Badge className={INVOICE_STATUS[invoice.status].color}>
                {INVOICE_STATUS[invoice.status].label}
              </Badge>
            </TableCell>
            <TableCell className="font-semibold text-primary">
              {formatCurrency(invoice.total)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
                {invoice.status === 'draft' && (
                  <Button variant="ghost" size="icon" className="text-blue-600">
                    <Send className="w-4 h-4" />
                  </Button>
                )}
                {invoice.status === 'sent' && (
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <X className="w-4 h-4" />
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
              Facturación
            </h1>
            <p className="text-gray-600 mt-1">
              Gestión de facturas y cobros
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-primary hover:bg-forest">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Factura
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Borradores</p>
                  <p className="text-2xl font-bold text-gray-600">{draftInvoices.length}</p>
                  <p className="text-xs text-gray-600 mt-1">{formatCurrency(totalDraft)}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Enviadas</p>
                  <p className="text-2xl font-bold text-blue-600">{sentInvoices.length}</p>
                  <p className="text-xs text-gray-600 mt-1">{formatCurrency(totalSent)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pagadas</p>
                  <p className="text-2xl font-bold text-green-600">{paidInvoices.length}</p>
                  <p className="text-xs text-gray-600 mt-1">{formatCurrency(totalPaid)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vencidas</p>
                  <p className="text-2xl font-bold text-red-600">{overdueInvoices.length}</p>
                  <p className="text-xs text-gray-600 mt-1">{formatCurrency(totalOverdue)}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle>Lista de Facturas</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Todas ({allInvoices.length})</TabsTrigger>
                <TabsTrigger value="draft">Borradores ({draftInvoices.length})</TabsTrigger>
                <TabsTrigger value="sent">Enviadas ({sentInvoices.length})</TabsTrigger>
                <TabsTrigger value="paid">Pagadas ({paidInvoices.length})</TabsTrigger>
                <TabsTrigger value="overdue">Vencidas ({overdueInvoices.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <InvoiceTable invoices={allInvoices} />
              </TabsContent>
              <TabsContent value="draft" className="mt-6">
                <InvoiceTable invoices={draftInvoices} />
              </TabsContent>
              <TabsContent value="sent" className="mt-6">
                <InvoiceTable invoices={sentInvoices} />
              </TabsContent>
              <TabsContent value="paid" className="mt-6">
                <InvoiceTable invoices={paidInvoices} />
              </TabsContent>
              <TabsContent value="overdue" className="mt-6">
                <InvoiceTable invoices={overdueInvoices} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}