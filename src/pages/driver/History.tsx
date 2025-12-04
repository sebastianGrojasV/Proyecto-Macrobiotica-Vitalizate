import { useState } from 'react';
import { History, Star, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import DriverLayout from '@/layouts/DriverLayout';
import { mockDeliveryHistory } from '@/data/drivers';
import { formatCurrency } from '@/lib/constants';

export default function DriverHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredHistory = mockDeliveryHistory.filter((delivery) => {
    const matchesSearch =
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || delivery.deliveryDate === dateFilter;
    return matchesSearch && matchesDate;
  });

  const totalDeliveries = mockDeliveryHistory.length;
  const totalEarnings = mockDeliveryHistory.reduce(
    (sum, delivery) => sum + delivery.total + (delivery.tip || 0),
    0
  );
  const averageRating =
    mockDeliveryHistory.reduce((sum, delivery) => sum + (delivery.rating || 0), 0) /
    mockDeliveryHistory.filter((d) => d.rating).length;
  const totalTips = mockDeliveryHistory.reduce(
    (sum, delivery) => sum + (delivery.tip || 0),
    0
  );

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Historial de Entregas
          </h1>
          <p className="text-gray-600">
            Revisa todas tus entregas completadas
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Entregas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalDeliveries}
                  </p>
                </div>
                <History className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ganancias Totales</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(totalEarnings)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Calificación Promedio</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {averageRating.toFixed(1)} ⭐
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Propinas Totales</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(totalTips)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Buscar por cliente o pedido
                </label>
                <Input
                  placeholder="Nombre del cliente o número de pedido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Filtrar por fecha
                </label>
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((delivery) => (
            <Card
              key={delivery.id}
              className="shadow-natural hover:shadow-natural-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <History className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-900">
                        {delivery.orderId}
                      </p>
                      <p className="text-sm text-gray-600">
                        {delivery.customerName}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      delivery.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {delivery.status === 'delivered' ? 'Entregado' : 'Fallido'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dirección</p>
                    <p className="text-sm font-medium">{delivery.deliveryAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Fecha y Hora</p>
                    <p className="text-sm font-medium">
                      {delivery.deliveryDate} • {delivery.deliveryTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total</p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(delivery.total)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    {delivery.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">
                          {delivery.rating}/5
                        </span>
                      </div>
                    )}
                    {delivery.tip && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Propina: {formatCurrency(delivery.tip)}
                        </span>
                      </div>
                    )}
                  </div>
                  {delivery.notes && (
                    <p className="text-sm text-gray-600 italic">
                      Nota: {delivery.notes}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <Card className="shadow-natural">
            <CardContent className="p-12 text-center">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                No se encontraron entregas
              </h3>
              <p className="text-gray-600">
                Intenta ajustar los filtros de búsqueda
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DriverLayout>
  );
}