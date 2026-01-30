import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export default function DashboardCard({
  title,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  description,
  className,
}: DashboardCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className={cn('shadow-natural hover:shadow-natural-lg transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          {change !== undefined && (
            <div className={cn('flex items-center space-x-1 text-sm px-2 py-1 rounded-full w-fit', getTrendColor())}>
              {getTrendIcon()}
              <span className="font-medium">
                {change > 0 ? '+' : ''}
                {change}%
              </span>
            </div>
          )}
          {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
}