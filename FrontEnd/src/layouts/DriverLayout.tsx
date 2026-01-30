import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, MapPin, History, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { mockDriver, VEHICLE_TYPES } from '@/data/drivers';

interface DriverLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/driver/dashboard', icon: LayoutDashboard },
  { name: 'Pedidos Asignados', href: '/driver/orders', icon: Package },
  { name: 'Mapa de Rutas', href: '/driver/map', icon: MapPin },
  { name: 'Historial', href: '/driver/history', icon: History },
];

export default function DriverLayout({ children }: DriverLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-natural">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/driver/dashboard" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-heading font-bold text-xl text-gray-900">
                    Vitalízate
                  </h1>
                  <p className="text-xs text-gray-500">Portal Repartidor</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{mockDriver.name}</p>
                <p className="text-sm text-gray-500">
                  {VEHICLE_TYPES[mockDriver.vehicleType].icon}{' '}
                  {mockDriver.vehiclePlate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => (window.location.href = '/')}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-natural p-4 sticky top-24">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{mockDriver.name}</h3>
                  <p className="text-sm text-gray-500">
                    ⭐ {mockDriver.rating} • {mockDriver.totalDeliveries} entregas
                  </p>
                </div>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-mint/30'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}