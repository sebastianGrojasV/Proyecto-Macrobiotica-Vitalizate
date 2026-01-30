import { useState } from 'react';
import { MapPin, Navigation, Phone, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DriverLayout from '@/layouts/DriverLayout';
import { mockAssignedOrders } from '@/data/drivers';
import { formatCurrency } from '@/lib/constants';

export default function DriverMap() {
  const [selectedOrder, setSelectedOrder] = useState(mockAssignedOrders[0]);
  const activeOrders = mockAssignedOrders.filter(
    (o) => o.status === 'pending' || o.status === 'in_transit'
  );

  const openInGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const openInWaze = (lat: number, lng: number) => {
    window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
  };

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Mapa de Rutas
          </h1>
          <p className="text-gray-600">
            Visualiza y navega a tus entregas pendientes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="shadow-natural h-full">
              <CardContent className="p-0">
                <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                  {/* Map placeholder with markers */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapPin className="w-16 h-16 text-primary mx-auto" />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          Mapa Interactivo
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Visualización de rutas de entrega
                        </p>
                        <div className="space-y-2">
                          {activeOrders.map((order, idx) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-center space-x-2 text-sm"
                            >
                              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                {idx + 1}
                              </div>
                              <span className="text-gray-700">
                                {order.location.address}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map markers simulation */}
                  {activeOrders.map((order, idx) => (
                    <div
                      key={order.id}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${20 + idx * 25}%`,
                        top: `${30 + idx * 15}%`,
                      }}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white hover:scale-110 transition-transform">
                          {idx + 1}
                        </div>
                        {selectedOrder?.id === order.id && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                            <p className="font-semibold text-sm">
                              {order.customerName}
                            </p>
                            <p className="text-xs text-gray-600">
                              {order.location.address}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery List */}
          <div className="space-y-4">
            <Card className="shadow-natural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5" />
                  <span>Entregas Activas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeOrders.map((order, idx) => (
                  <div
                    key={order.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedOrder?.id === order.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {order.deliveryAddress}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge
                            className={
                              order.status === 'in_transit'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {order.status === 'in_transit'
                              ? 'En Camino'
                              : 'Pendiente'}
                          </Badge>
                          <p className="text-sm font-semibold text-primary">
                            {formatCurrency(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Selected Order Details */}
            {selectedOrder && (
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle>Detalles de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Cliente</p>
                    <p className="font-semibold">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <a
                      href={`tel:${selectedOrder.customerPhone}`}
                      className="font-medium text-primary hover:underline flex items-center space-x-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{selectedOrder.customerPhone}</span>
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="font-medium text-sm">
                      {selectedOrder.deliveryAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Productos</p>
                    {selectedOrder.products.map((product, idx) => (
                      <p key={idx} className="text-sm">
                        • {product.name} x{product.quantity}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency(selectedOrder.total)}
                    </p>
                  </div>
                  <div className="space-y-2 pt-4 border-t">
                    <Button
                      onClick={() =>
                        openInGoogleMaps(selectedOrder.deliveryAddress)
                      }
                      className="w-full bg-primary hover:bg-forest"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Abrir en Google Maps
                    </Button>
                    <Button
                      onClick={() =>
                        openInWaze(
                          selectedOrder.location.lat,
                          selectedOrder.location.lng
                        )
                      }
                      variant="outline"
                      className="w-full"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Abrir en Waze
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DriverLayout>
  );
}