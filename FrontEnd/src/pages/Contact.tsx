import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import PublicLayout from '@/layouts/PublicLayout';

export default function Contact() {
  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chatea con nosotros',
      value: 'WhatsApp Business',
      link: 'https://l.instagram.com/?u=https%3A%2F%2Fwalink.co%2Fc9899c%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnvLjT3wgRkpGjtksDjPO6fvv59-pIpp7fxK8EGXXf9Z4skFKgJEkQVS8gt14_aem_YprxoLGPvFi8iIYTYkeBcg&e=AT2IYqD3FZd_YEdVex-yY4S6Vm4IBFx8oWpdanKrOFKccvGyTz4nLfs9bEfQeXmRKjZDHhkgW9n7iqcNyWGiGLhltRhz7kXfw8X992g_jg',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      description: 'Síguenos en Instagram',
      value: '@vitalizatecr',
      link: 'https://www.instagram.com/vitalizatecr/',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: Facebook,
      title: 'Facebook',
      description: 'Encuéntranos en Facebook',
      value: 'Vitalízate CR',
      link: 'https://www.facebook.com/profile.php?id=61575224334490&ref=pro_upsell_xav_ig_profile_page_web',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Clock,
      title: 'Horario',
      description: 'Lunes a Viernes',
      value: '8:00 AM - 6:00 PM',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@vitalizatecr',
      link: 'https://www.instagram.com/vitalizatecr/',
      color: 'hover:bg-pink-50',
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'Vitalízate CR',
      link: 'https://www.facebook.com/profile.php?id=61575224334490&ref=pro_upsell_xav_ig_profile_page_web',
      color: 'hover:bg-blue-50',
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      handle: 'Chat directo',
      link: 'https://l.instagram.com/?u=https%3A%2F%2Fwalink.co%2Fc9899c%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnvLjT3wgRkpGjtksDjPO6fvv59-pIpp7fxK8EGXXf9Z4skFKgJEkQVS8gt14_aem_YprxoLGPvFi8iIYTYkeBcg&e=AT2IYqD3FZd_YEdVex-yY4S6Vm4IBFx8oWpdanKrOFKccvGyTz4nLfs9bEfQeXmRKjZDHhkgW9n7iqcNyWGiGLhltRhz7kXfw8X992g_jg',
      color: 'hover:bg-green-50',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-mint/20 to-natural py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop')] opacity-5 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-secondary text-textGray">
              Contáctanos
            </Badge>
            <h1 className="font-heading text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Estamos Aquí Para Ti
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              ¿Tienes preguntas sobre nuestros productos o necesitas asesoría personalizada?
              Nuestro equipo está listo para ayudarte.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <Card key={info.title} className="shadow-natural hover:shadow-natural-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{info.description}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-primary font-semibold">{info.value}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-natural">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-natural">
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Tu apellido" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="8888-8888" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto</Label>
                    <Input id="subject" placeholder="¿En qué podemos ayudarte?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-forest" size="lg">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* About */}
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle className="text-2xl">Vitalízate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    <strong className="text-primary">Tienda de suplementos vitamínicos</strong>
                  </p>
                  <p className="text-gray-600">
                    Somos una macrobiótica virtual comprometida con tu bienestar.
                  </p>
                  <p className="text-xl font-semibold text-primary">
                    Más que suplementos, somos poder y energía
                  </p>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle className="text-2xl">Síguenos en Redes Sociales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-4 p-4 rounded-lg border border-gray-200 ${social.color} transition-colors`}
                      >
                        <Icon className="w-6 h-6 text-primary" />
                        <div>
                          <p className="font-semibold text-gray-900">{social.name}</p>
                          <p className="text-sm text-gray-600">{social.handle}</p>
                        </div>
                      </a>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="shadow-natural bg-gradient-primary text-white">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda inmediata?</h3>
                  <p className="mb-4 text-mint">Chatea con nosotros por WhatsApp</p>
                  <Button
                    asChild
                    className="bg-white text-primary hover:bg-mint hover:text-forest"
                  >
                    <a
                      href="https://l.instagram.com/?u=https%3A%2F%2Fwalink.co%2Fc9899c%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnvLjT3wgRkpGjtksDjPO6fvv59-pIpp7fxK8EGXXf9Z4skFKgJEkQVS8gt14_aem_YprxoLGPvFi8iIYTYkeBcg&e=AT2IYqD3FZd_YEdVex-yY4S6Vm4IBFx8oWpdanKrOFKccvGyTz4nLfs9bEfQeXmRKjZDHhkgW9n7iqcNyWGiGLhltRhz7kXfw8X992g_jg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Abrir WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-mint text-forest">Preguntas Frecuentes</Badge>
              <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
                ¿Tienes Dudas?
              </h2>
            </div>
            <div className="space-y-6">
              <Card className="shadow-natural">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    ¿Hacen envíos a todo Costa Rica?
                  </h3>
                  <p className="text-gray-600">
                    Sí, realizamos envíos a todas las provincias de Costa Rica con seguimiento en tiempo real.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-natural">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    ¿Los productos son 100% naturales?
                  </h3>
                  <p className="text-gray-600">
                    Todos nuestros productos son naturales, orgánicos y certificados para garantizar su calidad y efectividad.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-natural">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    ¿Ofrecen asesoría personalizada?
                  </h3>
                  <p className="text-gray-600">
                    Sí, nuestro equipo está disponible para brindarte asesoría personalizada sobre qué productos son mejores para tus necesidades específicas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}