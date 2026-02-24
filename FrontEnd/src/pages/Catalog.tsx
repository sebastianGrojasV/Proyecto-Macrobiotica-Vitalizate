import { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import PublicLayout from '@/layouts/PublicLayout';
import ProductCard from '@/components/custom/ProductCard';
import { mockProducts } from '@/data/products';
import { formatCurrency } from '@/lib/constants';
import { obtenerCategorias, CategoriaDto } from '@/api/categorias.service';

export default function Catalog() {
  const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setCargandoCategorias(true);
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (e) {
        console.error('Error cargando categorías:', e);
        setCategorias([]);
      } finally {
        setCargandoCategorias(false);
      }
    })();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 35000]); // Actualizado para colones
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = mockProducts.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Categorías</h3>
        <div className="space-y-3">

          {cargandoCategorias ? (
            <p className="text-sm text-gray-500">Cargando categorías...</p>
          ) : categorias.length === 0 ? (
            <p className="text-sm text-gray-500">No hay categorías disponibles.</p>
          ) : (
            categorias.map((c) => (
              <div key={c.id} className="flex items-center space-x-2">
                <Checkbox
                  id={c.name}
                  checked={selectedCategories.includes(c.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, c.name]);
                    } else {
                      setSelectedCategories(selectedCategories.filter((x) => x !== c.name));
                    }
                  }}
                />
                <Label htmlFor={c.name} className="text-sm cursor-pointer">
                  {c.name}
                </Label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Rango de Precio</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={35000}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatCurrency(priceRange[0])}</span>
            <span>{formatCurrency(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 35000]);
        }}
      >
        Limpiar Filtros
      </Button>
    </div >
  );

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-gray-900 mb-2">
            Catálogo de Productos
          </h1>
          <p className="text-gray-600">
            Explora nuestra selección completa de productos naturales y suplementos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-natural p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-xl">Filtros</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-natural p-4">
              <div className="flex items-center space-x-4">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-gray-600">
                  {sortedProducts.length} productos encontrados
                </p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Más Popular</SelectItem>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Calificación</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron productos con los filtros seleccionados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}