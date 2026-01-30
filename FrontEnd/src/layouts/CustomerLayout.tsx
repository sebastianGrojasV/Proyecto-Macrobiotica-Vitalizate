import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import ChatAssistant from '@/components/custom/ChatAssistant';
import { User, Package, MapPin, RotateCcw, Settings, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Mi Cuenta', href: '/customer/dashboard', icon: User },
  { name: 'Mis Pedidos', href: '/customer/orders', icon: Package },
  { name: 'Direcciones', href: '/customer/addresses', icon: MapPin },
  { name: 'Devoluciones', href: '/customer/returns', icon: RotateCcw },
  { name: 'Favoritos', href: '/customer/favorites', icon: Heart },
  { name: 'Perfil', href: '/customer/profile', icon: Settings },
];

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-natural">
      <Header cartItemsCount={3} />
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
                  <h3 className="font-semibold text-gray-900">Juan Pérez</h3>
                  <p className="text-sm text-gray-500">Cliente Premium</p>
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
      <Footer />
      <ChatAssistant />
    </div>
  );
}