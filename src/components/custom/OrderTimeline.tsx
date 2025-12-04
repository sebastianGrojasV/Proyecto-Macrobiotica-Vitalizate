import { Check, Package, Truck, Home, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  date?: string;
  status: 'completed' | 'current' | 'pending';
}

interface OrderTimelineProps {
  currentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export default function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const getSteps = (): TimelineStep[] => {
    const baseSteps: TimelineStep[] = [
      {
        id: 'pending',
        title: 'Pedido Recibido',
        description: 'Tu pedido ha sido confirmado',
        date: '02 Dic, 10:30 AM',
        status: 'completed',
      },
      {
        id: 'processing',
        title: 'En Preparación',
        description: 'Estamos preparando tu pedido',
        date: currentStatus !== 'pending' ? '02 Dic, 2:15 PM' : undefined,
        status: currentStatus === 'pending' ? 'pending' : 'completed',
      },
      {
        id: 'shipped',
        title: 'En Camino',
        description: 'Tu pedido está en tránsito',
        date: ['shipped', 'delivered'].includes(currentStatus) ? '03 Dic, 9:00 AM' : undefined,
        status: ['shipped', 'delivered'].includes(currentStatus)
          ? 'completed'
          : currentStatus === 'processing'
          ? 'current'
          : 'pending',
      },
      {
        id: 'delivered',
        title: 'Entregado',
        description: 'Tu pedido ha sido entregado',
        date: currentStatus === 'delivered' ? '04 Dic, 11:45 AM' : undefined,
        status:
          currentStatus === 'delivered'
            ? 'completed'
            : currentStatus === 'shipped'
            ? 'current'
            : 'pending',
      },
    ];

    return baseSteps;
  };

  const steps = getSteps();

  const getIcon = (stepId: string, status: string) => {
    const iconClass = 'w-5 h-5';
    
    if (status === 'completed') {
      return <Check className={iconClass} />;
    }

    switch (stepId) {
      case 'pending':
        return <Clock className={iconClass} />;
      case 'processing':
        return <Package className={iconClass} />;
      case 'shipped':
        return <Truck className={iconClass} />;
      case 'delivered':
        return <Home className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  return (
    <div className="relative">
      {steps.map((step, index) => (
        <div key={step.id} className="relative pb-8 last:pb-0">
          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                'absolute left-5 top-10 w-0.5 h-full -ml-px',
                step.status === 'completed' ? 'bg-primary' : 'bg-gray-300'
              )}
            />
          )}

          {/* Step Content */}
          <div className="relative flex items-start space-x-4">
            {/* Icon */}
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                step.status === 'completed' &&
                  'bg-primary border-primary text-white',
                step.status === 'current' &&
                  'bg-white border-primary text-primary animate-pulse',
                step.status === 'pending' && 'bg-white border-gray-300 text-gray-400'
              )}
            >
              {getIcon(step.id, step.status)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center justify-between">
                <h4
                  className={cn(
                    'font-semibold',
                    step.status === 'completed' && 'text-primary',
                    step.status === 'current' && 'text-primary',
                    step.status === 'pending' && 'text-gray-400'
                  )}
                >
                  {step.title}
                </h4>
                {step.date && (
                  <span className="text-sm text-gray-500">{step.date}</span>
                )}
              </div>
              <p
                className={cn(
                  'text-sm mt-1',
                  step.status === 'pending' ? 'text-gray-400' : 'text-gray-600'
                )}
              >
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}