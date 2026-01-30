import { useState } from 'react';
import { Search, Package, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/PublicLayout';
import OrderTimeline from '@/components/custom/OrderTimeline';
import { mockOrders } from '@/data/orders';

export default function TrackingPublic() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState<typeof mockOrders[0] | null>(null);

  const handleSearch = () => {
    const foundOrder = mockOrders.find(
      (o) => o.id === trackingNumber || o.trackingNumber === trackingNumber
    );
    setOrder(foundOrder || null);
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              Rastrear Pedido
            </h1>
            <p className="text-gray-600 text-lg">
              Ingresa tu número de pedido o código de rastreo para ver el estado
            </p>
          </div>

          {/* Search */}
          <Card className="shadow-natural-lg mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tracking">Número de Pedido o Tracking</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="tracking"
                      placeholder="Ej: ORD-2025-001 o VTZ-2025-001-TRK"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button
                      onClick={handleSearch}
                      className="bg-primary hover:bg-forest"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <QrCode className="w-4 h-4" />
                  <span>También puedes escanear el código QR de tu paquete</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {order && (
            <div className="space-y-6">
              {/* Order Info */}
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle>Información del Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Número de Pedido</p>
                      <p className="font-semibold text-lg">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Código de Rastreo</p>
                      <p className="font-semibold text-lg">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Fecha de Pedido</p>
                      <p className="font-semibold">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="font-semibold text-primary text-lg">
                        ${order.total.toFixed(2)} CRC
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle>Estado del Envío</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderTimeline currentStatus={order.status} />
                </CardContent>
              </Card>

              {/* Products */}
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle>Productos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center space-x-4 p-4 border rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle>Dirección de Envío</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-semibold">{order.shippingAddress.name}</p>
                    <p className="text-gray-600">{order.shippingAddress.street}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {trackingNumber && !order && (
            <Card className="shadow-natural">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  No se encontró el pedido
                </h3>
                <p className="text-gray-600">
                  Verifica que el número de pedido o tracking sea correcto
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}