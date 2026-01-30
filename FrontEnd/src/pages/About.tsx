import { Leaf, Heart, Shield, Users, Target, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicLayout from '@/layouts/PublicLayout';

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: 'Naturaleza',
      description: 'Productos 100% naturales y orgánicos certificados',
    },
    {
      icon: Heart,
      title: 'Bienestar',
      description: 'Tu salud y bienestar son nuestra prioridad',
    },
    {
      icon: Shield,
      title: 'Calidad',
      description: 'Garantía de calidad en cada producto',
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Construyendo una comunidad saludable',
    },
  ];

  const mission = [
    {
      icon: Target,
      title: 'Nuestra Misión',
      description: 'Proporcionar suplementos vitamínicos de la más alta calidad para mejorar la salud y el bienestar de nuestros clientes en Costa Rica.',
    },
    {
      icon: Zap,
      title: 'Nuestra Visión',
      description: 'Ser la macrobiótica virtual líder en Costa Rica, reconocida por ofrecer más que suplementos: poder y energía para transformar vidas.',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-mint/20 to-natural py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&h=1080&fit=crop')] opacity-5 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-secondary text-textGray">
              Sobre Nosotros
            </Badge>
            <h1 className="font-heading text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Vitalízate
            </h1>
            <p className="text-2xl text-primary font-semibold mb-4">
              Más que suplementos, somos poder y energía
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Somos una macrobiótica virtual especializada en suplementos vitamínicos de la más alta calidad.
              Nuestro compromiso es brindarte productos naturales que transformen tu vida y potencien tu bienestar integral.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mission.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="shadow-natural hover:shadow-natural-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-natural">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-mint text-forest">Nuestros Valores</Badge>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              Lo Que Nos Define
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Valores fundamentales que guían cada decisión y acción en Vitalízate
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="border-none shadow-natural hover:shadow-natural-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
                ¿Por Qué Elegir Vitalízate?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Macrobiótica Virtual</h3>
                    <p className="text-gray-600">Acceso fácil y conveniente a productos naturales desde cualquier lugar de Costa Rica</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Suplementos de Calidad</h3>
                    <p className="text-gray-600">Productos cuidadosamente seleccionados y certificados para garantizar su efectividad</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Poder y Energía</h3>
                    <p className="text-gray-600">Más que suplementos, ofrecemos soluciones integrales para tu vitalidad y bienestar</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Atención Personalizada</h3>
                    <p className="text-gray-600">Asesoría y soporte para ayudarte a elegir los productos adecuados para tus necesidades</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
                    <p className="text-gray-600">Envíos a todo Costa Rica con seguimiento en tiempo real</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Compromiso con la Salud</h3>
                    <p className="text-gray-600">Dedicados a promover un estilo de vida saludable y natural en Costa Rica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Únete a la Comunidad Vitalízate
          </h2>
          <p className="text-xl mb-8 text-mint max-w-2xl mx-auto">
            Descubre el poder de la naturaleza y transforma tu vida con nuestros productos naturales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/catalog"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary hover:bg-mint hover:text-forest rounded-lg font-semibold transition-colors"
            >
              Ver Productos
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-lg font-semibold transition-colors"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}