import { useState } from 'react';
import { RotateCcw, Plus, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CustomerLayout from '@/layouts/CustomerLayout';
import { mockReturns, returnReasons, RETURN_STATUS, type Return } from '@/data/returns';
import { mockOrders } from '@/data/orders';
import { formatCurrency } from '@/lib/constants';
import { toast } from 'sonner';

export default function CustomerReturns() {
  const [returns, setReturns] = useState<Return[]>(mockReturns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    orderId: '',
    productId: '',
    reason: '',
    description: '',
  });

  const handleSubmitReturn = () => {
    if (!formData.orderId || !formData.productId || !formData.reason) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const order = mockOrders.find((o) => o.id === formData.orderId);
    const product = order?.items.find((item) => item.productId === formData.productId);

    if (!order || !product) {
      toast.error('Producto no encontrado');
      return;
    }

    const newReturn: Return = {
      id: `RET-${Date.now()}`,
      orderId: formData.orderId,
      productName: product.productName,
      productImage: product.image,
      reason: formData.reason,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      quantity: 1,
      amount: product.price,
      description: formData.description,
    };

    setReturns([newReturn, ...returns]);
    toast.success('Solicitud de devolución enviada correctamente');
    setIsDialogOpen(false);
    setFormData({
      orderId: '',
      productId: '',
      reason: '',
      description: '',
    });
  };

  const deliveredOrders = mockOrders.filter((o) => o.status === 'delivered');
  const selectedOrder = mockOrders.find((o) => o.id === formData.orderId);

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
              Devoluciones
            </h1>
            <p className="text-gray-600">
              Gestiona tus solicitudes de devolución
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-forest">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Devolución
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Solicitar Devolución</DialogTitle>
                <DialogDescription>
                  Completa el formulario para solicitar una devolución
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Pedido *</Label>
                  <Select
                    value={formData.orderId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, orderId: value, productId: '' })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar pedido" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveredOrders.map((order) => (
                        <SelectItem key={order.id} value={order.id}>
                          {order.id} - {order.date} ({formatCurrency(order.total)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.orderId && (
                  <div className="space-y-2">
                    <Label htmlFor="productId">Producto *</Label>
                    <Select
                      value={formData.productId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, productId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedOrder?.items.map((item) => (
                          <SelectItem key={item.productId} value={item.productId}>
                            {item.productName} ({formatCurrency(item.price)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo de Devolución *</Label>
                  <Select
                    value={formData.reason}
                    onValueChange={(value) =>
                      setFormData({ ...formData, reason: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {returnReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción (Opcional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe el problema con más detalle..."
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmitReturn}
                  className="bg-primary hover:bg-forest"
                >
                  Enviar Solicitud
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {returns.length === 0 ? (
          <Card className="shadow-natural">
            <CardContent className="p-12 text-center">
              <RotateCcw className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                No tienes devoluciones
              </h3>
              <p className="text-gray-600 mb-6">
                Aquí aparecerán tus solicitudes de devolución
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary hover:bg-forest"
              >
                <Plus className="w-4 h-4 mr-2" />
                Solicitar Devolución
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {returns.map((returnItem) => (
              <Card
                key={returnItem.id}
                className="shadow-natural hover:shadow-natural-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <RotateCcw className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-900">
                          {returnItem.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          Pedido: {returnItem.orderId}
                        </p>
                        <p className="text-sm text-gray-600">
                          Fecha: {returnItem.requestDate}
                        </p>
                      </div>
                    </div>
                    <Badge className={RETURN_STATUS[returnItem.status].color}>
                      {RETURN_STATUS[returnItem.status].label}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-4">
                    <img
                      src={returnItem.productImage}
                      alt={returnItem.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {returnItem.productName}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Cantidad: {returnItem.quantity}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {formatCurrency(returnItem.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-900">Motivo:</span>{' '}
                      <span className="text-gray-600">{returnItem.reason}</span>
                    </div>
                    {returnItem.description && (
                      <div>
                        <span className="font-medium text-gray-900">
                          Descripción:
                        </span>{' '}
                        <span className="text-gray-600">
                          {returnItem.description}
                        </span>
                      </div>
                    )}
                  </div>

                  {returnItem.status === 'pending' && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Tu solicitud está siendo revisada. Te notificaremos cuando
                        tengamos una respuesta.
                      </p>
                    </div>
                  )}

                  {returnItem.status === 'approved' && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        Tu devolución ha sido aprobada. Pronto recibirás
                        instrucciones para el envío del producto.
                      </p>
                    </div>
                  )}

                  {returnItem.status === 'rejected' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        Tu solicitud de devolución ha sido rechazada. Contacta a
                        soporte para más información.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}