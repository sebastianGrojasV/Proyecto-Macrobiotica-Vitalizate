import { Package, TrendingUp, Clock, DollarSign, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import DriverLayout from '@/layouts/DriverLayout';
import DashboardCard from '@/components/custom/DashboardCard';
import { mockAssignedOrders, DELIVERY_STATUS } from '@/data/drivers';
import { formatCurrency } from '@/lib/constants';

export default function DriverDashboard() {
  const todayOrders = mockAssignedOrders;
  const pendingOrders = todayOrders.filter((o) => o.status === 'pending');
  const inTransitOrders = todayOrders.filter((o) => o.status === 'in_transit');
  const completedToday = 5;
  const todayEarnings = 156789;

  const stats = [
    {
      title: 'Pendientes',
      value: pendingOrders.length.toString(),
      change: 0,
      trend: 'neutral' as const,
      icon: Package,
    },
    {
      title: 'En Camino',
      value: inTransitOrders.length.toString(),
      change: 0,
      trend: 'neutral' as const,
      icon: TrendingUp,
    },
    {
      title: 'Completadas Hoy',
      value: completedToday.toString(),
      change: 25,
      trend: 'up' as const,
      icon: Clock,
    },
    {
      title: 'Ganancias Hoy',
      value: formatCurrency(todayEarnings),
      change: 15,
      trend: 'up' as const,
      icon: DollarSign,
    },
  ];

  const nextDelivery = pendingOrders[0];

  return (
    <DriverLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Dashboard del Repartidor
          </h1>
          <p className="text-gray-600">
            Bienvenido de nuevo. Aquí está tu resumen del día.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <DashboardCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Next Delivery */}
        {nextDelivery && (
          <Card className="shadow-natural border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Próxima Entrega</span>
                {nextDelivery.priority === 'urgent' && (
                  <Badge className="bg-red-500 text-white">Urgente</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Cliente</p>
                    <p className="font-semibold text-lg">{nextDelivery.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <a
                      href={`tel:${nextDelivery.customerPhone}`}
                      className="font-medium text-primary hover:underline flex items-center space-x-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{nextDelivery.customerPhone}</span>
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="font-medium">{nextDelivery.deliveryAddress}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Pedido</p>
                    <p className="font-semibold">{nextDelivery.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(nextDelivery.total)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hora Estimada</p>
                    <p className="font-medium">{nextDelivery.estimatedDeliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Método de Pago</p>
                    <Badge>
                      {nextDelivery.paymentMethod === 'cash'
                        ? 'Efectivo'
                        : nextDelivery.paymentMethod === 'card'
                        ? 'Tarjeta'
                        : 'SINPE Móvil'}
                    </Badge>
                  </div>
                </div>
              </div>
              {nextDelivery.notes && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">
                    Nota: {nextDelivery.notes}
                  </p>
                </div>
              )}
              <div className="flex space-x-3 mt-6">
                <Button asChild className="flex-1 bg-primary hover:bg-forest">
                  <Link to="/driver/map">Ver en Mapa</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/driver/orders">Ver Todos los Pedidos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Today's Orders */}
        <Card className="shadow-natural">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pedidos de Hoy</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link to="/driver/orders">Ver Todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{order.orderId}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={DELIVERY_STATUS[order.status].color}>
                      {DELIVERY_STATUS[order.status].label}
                    </Badge>
                    <p className="font-bold text-primary">
                      {formatCurrency(order.total)}
                    </p>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/driver/orders`}>Detalles</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DriverLayout>
  );
}