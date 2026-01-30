import { useState } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CustomerLayout from '@/layouts/CustomerLayout';
import { getFavoriteProducts } from '@/data/favorites';
import { formatCurrency } from '@/lib/constants';
import { toast } from 'sonner';

export default function CustomerFavorites() {
  const [favorites, setFavorites] = useState(getFavoriteProducts());

  const handleRemoveFavorite = (favoriteId: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
    toast.success('Producto eliminado de favoritos');
  };

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} agregado al carrito`);
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Mis Favoritos
          </h1>
          <p className="text-gray-600">
            Productos que has guardado para más tarde
          </p>
        </div>

        {favorites.length === 0 ? (
          <Card className="shadow-natural">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                No tienes productos favoritos
              </h3>
              <p className="text-gray-600 mb-6">
                Explora nuestro catálogo y guarda tus productos favoritos
              </p>
              <Button asChild className="bg-primary hover:bg-forest">
                <Link to="/catalog">Explorar Productos</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => {
              const product = favorite.product;
              if (!product) return null;

              return (
                <Card
                  key={favorite.id}
                  className="shadow-natural hover:shadow-natural-lg transition-all group"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        onClick={() => handleRemoveFavorite(favorite.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                      <div className="absolute top-2 left-2">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(product.price)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Agregado: {favorite.addedDate}
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product.name)}
                        className="w-full bg-primary hover:bg-forest"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {favorites.length > 0 && (
          <div className="flex justify-center pt-4">
            <Button asChild variant="outline" size="lg">
              <Link to="/catalog">
                Explorar Más Productos
              </Link>
            </Button>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}