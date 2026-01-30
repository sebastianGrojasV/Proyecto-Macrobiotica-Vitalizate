import { Package, MapPin, RotateCcw, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import CustomerLayout from '@/layouts/CustomerLayout';
import DashboardCard from '@/components/custom/DashboardCard';
import { mockOrders } from '@/data/orders';
import { formatCurrency } from '@/lib/constants';

export default function CustomerDashboard() {
  const recentOrders = mockOrders.slice(0, 3);

  const stats = [
    {
      title: 'Pedidos Totales',
      value: '12',
      change: 20,
      trend: 'up' as const,
      icon: Package,
    },
    {
      title: 'En Tránsito',
      value: '2',
      change: 0,
      trend: 'neutral' as const,
      icon: TrendingUp,
    },
    {
      title: 'Favoritos',
      value: '8',
      change: 15,
      trend: 'up' as const,
      icon: Heart,
    },
  ];

  return (
    <CustomerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Mi Cuenta
          </h1>
          <p className="text-gray-600">
            Bienvenido de nuevo, Juan. Aquí está el resumen de tu cuenta.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Recent Orders */}
        <Card className="shadow-natural">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pedidos Recientes</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link to="/customer/orders">Ver Todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      className={
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {order.status === 'delivered'
                        ? 'Entregado'
                        : order.status === 'shipped'
                        ? 'En Camino'
                        : 'Procesando'}
                    </Badge>
                    <p className="font-bold text-primary">{formatCurrency(order.total)}</p>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/tracking/${order.id}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-natural hover:shadow-natural-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Mis Pedidos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Revisa el estado de tus pedidos
              </p>
              <Button asChild className="w-full bg-primary hover:bg-forest">
                <Link to="/customer/orders">Ver Pedidos</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-natural hover:shadow-natural-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-mint/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-forest" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Direcciones</h3>
              <p className="text-sm text-gray-600 mb-4">
                Gestiona tus direcciones de envío
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/customer/addresses">Administrar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-natural hover:shadow-natural-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Devoluciones</h3>
              <p className="text-sm text-gray-600 mb-4">
                Solicita devoluciones fácilmente
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/customer/returns">Ver Devoluciones</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}