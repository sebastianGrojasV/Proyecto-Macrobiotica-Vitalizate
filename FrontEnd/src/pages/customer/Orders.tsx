import { Link } from 'react-router-dom';
import { Package, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerLayout from '@/layouts/CustomerLayout';
import { mockOrders } from '@/data/orders';
import { ORDER_STATUS, formatCurrency } from '@/lib/constants';

export default function CustomerOrders() {
  const allOrders = mockOrders;
  const activeOrders = allOrders.filter((o) => ['pending', 'processing', 'shipped'].includes(o.status));
  const completedOrders = allOrders.filter((o) => o.status === 'delivered');

  const OrderCard = ({ order }: { order: typeof mockOrders[0] }) => (
    <Card className="shadow-natural hover:shadow-natural-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-900">{order.id}</p>
              <p className="text-sm text-gray-600">Fecha: {order.date}</p>
            </div>
          </div>
          <Badge className={ORDER_STATUS[order.status].color}>
            {ORDER_STATUS[order.status].label}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.productName}</p>
                <p className="text-sm text-gray-600">
                  Cantidad: {item.quantity} × {formatCurrency(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(order.total)}</p>
          </div>
          <div className="flex space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link to={`/tracking/${order.id}`}>
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalles
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Factura
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Mis Pedidos
          </h1>
          <p className="text-gray-600">
            Revisa el estado y detalles de todos tus pedidos
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              Todos ({allOrders.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Activos ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completados ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {allOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {activeOrders.length > 0 ? (
                activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <Card className="shadow-natural">
                  <CardContent className="p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      No hay pedidos activos
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Todos tus pedidos han sido completados
                    </p>
                    <Button asChild className="bg-primary hover:bg-forest">
                      <Link to="/catalog">Explorar Productos</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
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
      </div>
    </CustomerLayout>
  );
}