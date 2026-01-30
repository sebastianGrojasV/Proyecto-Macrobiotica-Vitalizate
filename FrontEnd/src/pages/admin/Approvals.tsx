import { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { formatCurrency } from '@/lib/constants';

interface ApprovalRequest {
  id: string;
  type: 'purchase' | 'expense' | 'invoice';
  title: string;
  requestedBy: string;
  date: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  currentApprover: string;
  approvalLevel: number;
  description: string;
}

export default function Approvals() {
  const mockApprovals: ApprovalRequest[] = [
    {
      id: '1',
      type: 'purchase',
      title: 'Orden de Compra OC-202512-0003',
      requestedBy: 'Ana Martínez',
      date: '01/12/2025',
      amount: 3200000,
      status: 'pending',
      currentApprover: 'Director',
      approvalLevel: 3,
      description: 'Compra de suplementos a BioSupplements Internacional CR',
    },
    {
      id: '2',
      type: 'expense',
      title: 'Gasto de Marketing - Campaña Digital',
      requestedBy: 'Carlos Ramírez',
      date: '28/11/2025',
      amount: 850000,
      status: 'pending',
      currentApprover: 'Gerente',
      approvalLevel: 2,
      description: 'Inversión en publicidad digital para temporada navideña',
    },
    {
      id: '3',
      type: 'purchase',
      title: 'Orden de Compra OC-202512-0002',
      requestedBy: 'Roberto Silva',
      date: '25/11/2025',
      amount: 1800000,
      status: 'approved',
      currentApprover: 'Gerente',
      approvalLevel: 2,
      description: 'Compra de tés y hierbas a Herbal Solutions',
    },
    {
      id: '4',
      type: 'invoice',
      title: 'Factura FAC-202512-0003',
      requestedBy: 'Laura Torres',
      date: '20/11/2025',
      amount: 200000,
      status: 'approved',
      currentApprover: 'Supervisor',
      approvalLevel: 1,
      description: 'Factura para cliente corporativo',
    },
    {
      id: '5',
      type: 'expense',
      title: 'Gasto de Capacitación - Personal',
      requestedBy: 'María González',
      date: '15/11/2025',
      amount: 450000,
      status: 'rejected',
      currentApprover: 'Gerente',
      approvalLevel: 2,
      description: 'Curso de atención al cliente',
    },
  ];

  const pendingApprovals = mockApprovals.filter(a => a.status === 'pending');
  const approvedRequests = mockApprovals.filter(a => a.status === 'approved');
  const rejectedRequests = mockApprovals.filter(a => a.status === 'rejected');

  const getTypeLabel = (type: string) => {
    const labels = {
      purchase: 'Orden de Compra',
      expense: 'Gasto',
      invoice: 'Factura',
    };
    return labels[type as keyof typeof labels];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      purchase: 'bg-blue-100 text-blue-800',
      expense: 'bg-purple-100 text-purple-800',
      invoice: 'bg-green-100 text-green-800',
    };
    return colors[type as keyof typeof colors];
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { label: 'Aprobado', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { label: 'Rechazado', color: 'bg-red-100 text-red-800', icon: XCircle },
    };
    return badges[status as keyof typeof badges];
  };

  const ApprovalTable = ({ approvals }: { approvals: ApprovalRequest[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Solicitud</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Solicitante</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Nivel</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {approvals.map((approval) => {
          const statusBadge = getStatusBadge(approval.status);
          const StatusIcon = statusBadge.icon;
          return (
            <TableRow key={approval.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">{approval.title}</p>
                  <p className="text-xs text-gray-600 line-clamp-1">{approval.description}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getTypeColor(approval.type)}>
                  {getTypeLabel(approval.type)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8 bg-primary/10">
                    <AvatarFallback className="text-xs text-primary">
                      {approval.requestedBy.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{approval.requestedBy}</span>
                </div>
              </TableCell>
              <TableCell>{approval.date}</TableCell>
              <TableCell className="font-semibold text-primary">
                {formatCurrency(approval.amount)}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  Nivel {approval.approvalLevel} - {approval.currentApprover}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={statusBadge.color}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusBadge.label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {approval.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4 mr-1" />
                        Rechazar
                      </Button>
                    </>
                  )}
                  {approval.status !== 'pending' && (
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
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
              Sistema de Aprobaciones
            </h1>
            <p className="text-gray-600 mt-1">
              Workflow de aprobación de solicitudes
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Solicitudes</p>
                  <p className="text-2xl font-bold text-gray-900">{mockApprovals.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingApprovals.length}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatCurrency(pendingApprovals.reduce((sum, a) => sum + a.amount, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Aprobadas</p>
                  <p className="text-2xl font-bold text-green-600">{approvedRequests.length}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatCurrency(approvedRequests.reduce((sum, a) => sum + a.amount, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rechazadas</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedRequests.length}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatCurrency(rejectedRequests.reduce((sum, a) => sum + a.amount, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Approval Levels Info */}
        <Card className="shadow-natural bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Niveles de Aprobación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">Nivel 1 - Supervisor</p>
                <p className="text-sm text-gray-600 mt-1">Hasta {formatCurrency(100000)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">Nivel 2 - Gerente</p>
                <p className="text-sm text-gray-600 mt-1">Hasta {formatCurrency(500000)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">Nivel 3 - Director</p>
                <p className="text-sm text-gray-600 mt-1">Hasta {formatCurrency(1000000)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900">Nivel 4 - CEO</p>
                <p className="text-sm text-gray-600 mt-1">Sin límite</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approvals Table */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle>Solicitudes de Aprobación</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">
                  Pendientes ({pendingApprovals.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Aprobadas ({approvedRequests.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rechazadas ({rejectedRequests.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="mt-6">
                <ApprovalTable approvals={pendingApprovals} />
              </TabsContent>
              <TabsContent value="approved" className="mt-6">
                <ApprovalTable approvals={approvedRequests} />
              </TabsContent>
              <TabsContent value="rejected" className="mt-6">
                <ApprovalTable approvals={rejectedRequests} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}