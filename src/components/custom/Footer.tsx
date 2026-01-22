import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <span className="font-heading text-2xl font-bold">Vitalízate</span>
            </div>
            <p className="text-sm text-gray-300">
              Tu aliado en macrobiótica moderna. Productos naturales de la más alta calidad para tu bienestar integral en Costa Rica.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-mint hover:bg-white/10"
                asChild
              >
                <a
                  href="https://l.instagram.com/?u=https%3A%2F%2Fwalink.co%2Fc9899c%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnvLjT3wgRkpGjtksDjPO6fvv59-pIpp7fxK8EGXXf9Z4skFKgJEkQVS8gt14_aem_YprxoLGPvFi8iIYTYkeBcg&e=AT2IYqD3FZd_YEdVex-yY4S6Vm4IBFx8oWpdanKrOFKccvGyTz4nLfs9bEfQeXmRKjZDHhkgW9n7iqcNyWGiGLhltRhz7kXfw8X992g_jg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-mint hover:bg-white/10"
                asChild
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61575224334490&ref=pro_upsell_xav_ig_profile_page_web"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-mint hover:bg-white/10"
                asChild
              >
                <a
                  href="https://www.instagram.com/vitalizatecr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Catálogo de Productos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Rastrear Pedido
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Blog de Salud
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Atención al Cliente</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/customer/orders" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link to="/customer/returns" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Envíos
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-300 hover:text-mint transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Barrio San Jose, Alajuela, Costa Rica. Del Mega Super 100m al oeste</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+506 2222-3333</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contacto@vitalizate.cr</span>
              </li>
            </ul>
            <div>
              <h4 className="font-semibold text-sm mb-2">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Tu email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="bg-mint text-forest hover:bg-mint/90">
                  Suscribir
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-300">
          <p className="bg-[#00000000] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] font-normal text-center opacity-100 text-[#D1D5DB]" >&copy; 2025 Vitalízate Costa Rica. Todos los derechos reservados.</p>
          <p className="mt-2">Diseñado con 💚 para tu bienestar natural</p>
        </div>
      </div>
    </footer>
  );
}
