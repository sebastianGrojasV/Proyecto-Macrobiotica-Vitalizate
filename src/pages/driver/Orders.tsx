import { useState } from 'react';
import { Package, Phone, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import DriverLayout from '@/layouts/DriverLayout';
import { mockAssignedOrders, DELIVERY_STATUS, type AssignedOrder } from '@/data/drivers';
import { formatCurrency } from '@/lib/constants';
import { toast } from 'sonner';

export default function DriverOrders() {
  const [orders, setOrders] = useState<AssignedOrder[]>(mockAssignedOrders);
  const [selectedOrder, setSelectedOrder] = useState<AssignedOrder | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'pickup' | 'deliver' | 'fail'>('deliver');
  const [notes, setNotes] = useState('');

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const inTransitOrders = orders.filter((o) => o.status === 'in_transit');
  const completedOrders = orders.filter((o) => o.status === 'delivered');

  const handleOpenDialog = (order: AssignedOrder, action: 'pickup' | 'deliver' | 'fail') => {
    setSelectedOrder(order);
    setActionType(action);
    setIsDialogOpen(true);
    setNotes('');
  };

  const handleConfirmAction = () => {
    if (!selectedOrder) return;

    const currentTime = new Date().toLocaleTimeString('es-CR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    let newStatus: AssignedOrder['status'];
    let message: string;

    switch (actionType) {
      case 'pickup':
        newStatus = 'in_transit';
        message = 'Pedido recogido correctamente';
        break;
      case 'deliver':
        newStatus = 'delivered';
        message = 'Pedido entregado exitosamente';
        break;
      case 'fail':
        newStatus = 'failed';
        message = 'Entrega marcada como fallida';
        break;
    }

    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              status: newStatus,
              pickupTime: actionType === 'pickup' ? currentTime : order.pickupTime,
              deliveryTime: actionType === 'deliver' ? currentTime : order.deliveryTime,
              notes: notes || order.notes,
            }
          : order
      )
    );

    toast.success(message);
    setIsDialogOpen(false);
  };

  const OrderCard = ({ order }: { order: AssignedOrder }) => (
    <Card className="shadow-natural hover:shadow-natural-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-900">{order.orderId}</p>
              <p className="text-sm text-gray-600">
                Asignado: {order.assignedDate}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={DELIVERY_STATUS[order.status].color}>
              {DELIVERY_STATUS[order.status].label}
            </Badge>
            {order.priority === 'urgent' && (
              <Badge className="bg-red-500 text-white">Urgente</Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.customerName}
                </p>
                <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <a
                href={`tel:${order.customerPhone}`}
                className="text-sm text-primary hover:underline"
              >
                {order.customerPhone}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-600">
                Hora estimada: {order.estimatedDeliveryTime}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Productos:</p>
              {order.products.map((product, idx) => (
                <p key={idx} className="text-sm text-gray-900">
                  • {product.name} x{product.quantity}
                </p>
              ))}
            </div>
            <div>
              <p className="text-sm text-gray-600">Total:</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(order.total)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Método de Pago:</p>
              <Badge>
                {order.paymentMethod === 'cash'
                  ? 'Efectivo'
                  : order.paymentMethod === 'card'
                  ? 'Tarjeta'
                  : 'SINPE Móvil'}
              </Badge>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">
              Nota: {order.notes}
            </p>
          </div>
        )}

        <div className="flex space-x-2">
          {order.status === 'pending' && (
            <>
              <Button
                onClick={() => handleOpenDialog(order, 'pickup')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Package className="w-4 h-4 mr-2" />
                Recoger Pedido
              </Button>
              <Button
                onClick={() => handleOpenDialog(order, 'fail')}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Marcar Fallido
              </Button>
            </>
          )}
          {order.status === 'in_transit' && (
            <>
              <Button
                onClick={() => handleOpenDialog(order, 'deliver')}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Marcar Entregado
              </Button>
              <Button
                onClick={() => handleOpenDialog(order, 'fail')}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Marcar Fallido
              </Button>
            </>
          )}
          {order.status === 'delivered' && (
            <div className="flex-1 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm font-medium text-green-800">
                ✓ Entregado a las {order.deliveryTime}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Pedidos Asignados
          </h1>
          <p className="text-gray-600">
            Gestiona todos tus pedidos de entrega
          </p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              Pendientes ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="in_transit">
              En Camino ({inTransitOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completados ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in_transit" className="mt-6">
            <div className="space-y-4">
              {inTransitOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === 'pickup' && 'Confirmar Recogida'}
                {actionType === 'deliver' && 'Confirmar Entrega'}
                {actionType === 'fail' && 'Marcar como Fallido'}
              </DialogTitle>
              <DialogDescription>
                {actionType === 'pickup' &&
                  '¿Has recogido el pedido y estás listo para iniciar la entrega?'}
                {actionType === 'deliver' &&
                  '¿Has entregado el pedido exitosamente al cliente?'}
                {actionType === 'fail' &&
                  '¿Por qué no se pudo completar la entrega?'}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="py-4">
                <p className="font-semibold mb-2">{selectedOrder.orderId}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Cliente: {selectedOrder.customerName}
                </p>
                {actionType === 'fail' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Motivo (opcional)
                    </label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe el motivo de la entrega fallida..."
                      rows={3}
                    />
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmAction}
                className={
                  actionType === 'fail'
                    ? 'bg-red-600 hover:bg-red-700'
                    : actionType === 'pickup'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-green-600 hover:bg-green-700'
                }
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DriverLayout>
  );
}