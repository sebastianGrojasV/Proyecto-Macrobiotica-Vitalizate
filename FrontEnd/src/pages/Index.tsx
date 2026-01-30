import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Truck, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicLayout from '@/layouts/PublicLayout';
import ProductCard from '@/components/custom/ProductCard';
import { mockProducts } from '@/data/products';

export default function Index() {
  const featuredProducts = mockProducts.slice(0, 4);

  const benefits = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Productos orgánicos certificados de la más alta calidad',
    },
    {
      icon: Shield,
      title: 'Garantía de Calidad',
      description: 'Todos nuestros productos están respaldados por estudios científicos',
    },
    {
      icon: Truck,
      title: 'Envío Rápido',
      description: 'Entrega en 24-48 horas en todo Costa Rica',
    },
    {
      icon: Heart,
      title: 'Bienestar Integral',
      description: 'Asesoría personalizada para tu salud',
    },
  ];

  const testimonials = [
    {
      name: 'María González',
      rating: 5,
      comment: 'Excelente calidad de productos. He notado una gran mejora en mi energía y bienestar general.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'Carlos Ramírez',
      rating: 5,
      comment: 'La atención al cliente es excepcional y los productos son de primera calidad. Totalmente recomendado.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      name: 'Ana Martínez',
      rating: 5,
      comment: 'Llevo 3 meses comprando aquí y estoy encantada. Los suplementos son efectivos y naturales.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-mint/20 to-natural py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&h=1080&fit=crop')] opacity-5 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-secondary text-textGray">
                🌿 Macrobiótica Moderna
              </Badge>
              <h1 className="font-heading text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transforma tu vida con{' '}
                <span className="text-primary">productos naturales</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Descubre nuestra selección de suplementos, hierbas y superalimentos
                orgánicos certificados. Tu bienestar integral comienza aquí.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-forest text-white text-lg px-8"
                >
                  <Link to="/catalog">
                    Explorar Productos
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white text-lg px-8"
                >
                  <Link to="/about">Conocer Más</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-primary">5,000+</p>
                  <p className="text-sm text-gray-600">Clientes Satisfechos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-gray-600">Productos Naturales</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">4.9★</p>
                  <p className="text-sm text-gray-600">Calificación</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=600&fit=crop"
                alt="Productos Naturales"
                className="rounded-2xl shadow-natural-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-natural-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Certificado Orgánico</p>
                    <p className="text-sm text-gray-600">100% Natural</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="border-none shadow-natural hover:shadow-natural-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-natural">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-mint text-forest">Productos Destacados</Badge>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              Nuestros Productos Más Populares
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Selección curada de nuestros suplementos y superalimentos más efectivos
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-forest">
              <Link to="/catalog">
                Ver Todos los Productos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary text-textGray">Testimonios</Badge>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="shadow-natural">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">
            ¿Listo para Comenzar tu Transformación?
          </h2>
          <p className="text-xl mb-8 text-mint">
            Únete a miles de personas que ya han mejorado su bienestar
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-mint hover:text-forest text-lg px-8"
          >
            <Link to="/register">
              Crear Cuenta Gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}