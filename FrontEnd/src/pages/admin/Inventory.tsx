import { useEffect, useState } from "react";
import { obtenerCategorias, CategoriaDto } from "@/api/categorias.service";
import { obtenerProductos, ProductoDto, agregarProducto, eliminarProducto, editarProducto } from "@/api/productos.service";
import { Package, Search, Plus, Edit, Trash2, AlertTriangle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminLayout from '@/layouts/AdminLayout';
import { INVENTORY_STATUS, formatCurrency } from '@/lib/constants';

export default function Inventory() {
  const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);

  const [productos, setProductos] = useState<ProductoDto[]>([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);

  const [openNuevo, setOpenNuevo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    image_url: "",
    is_active: true,
    category_id: "",
  });

  const recargarProductos = async () => {
    try {
      setCargandoProductos(true);
      const data = await obtenerProductos();
      setProductos(data);
    } catch (e) {
      console.error("Error recargando productos:", e);
      setProductos([]);
    } finally {
      setCargandoProductos(false);
    }
  };

  const handleGuardarProducto = async () => {
    if (!nuevoProducto.name.trim()) {
      toast.error("Falta el nombre", {
        description: "Por favor ingresa el nombre del producto.",
      });
      return;
    }

    if (!nuevoProducto.description.trim()) {
      toast.error("Falta la descripción", {
        description: "Por favor ingresa la descripción del producto.",
      });
      return;
    }

    if (!nuevoProducto.category_id) {
      toast.error("Falta la categoría", {
        description: "Selecciona una categoría para el producto.",
      });
      return;
    }

    if (nuevoProducto.price <= 0) {
      toast.error("Precio inválido", {
        description: "El precio debe ser mayor a 0.",
      });
      return;
    }

    if (nuevoProducto.stock_quantity < 0) {
      toast.error("Stock inválido", {
        description: "El stock no puede ser negativo.",
      });
      return;
    }

    try {
      setGuardando(true);

      await agregarProducto({
        name: nuevoProducto.name,
        description: nuevoProducto.description,
        price: Number(nuevoProducto.price),
        stock_quantity: Number(nuevoProducto.stock_quantity),
        image_url: nuevoProducto.image_url || null,
        is_active: nuevoProducto.is_active,
        category_id: nuevoProducto.category_id,
      });

      // refrescar lista
      await recargarProductos();

      toast.success("Producto agregado", {
        description: `El producto "${nuevoProducto.name}" se agregó correctamente.`,
      });

      // cerrar modal
      setOpenNuevo(false);

      // limpiar form
      setNuevoProducto({
        name: "",
        description: "",
        price: 0,
        stock_quantity: 0,
        image_url: "",
        is_active: true,
        category_id: "",
      });
    } catch (e) {
      console.error("Error agregando producto:", e);
      toast.error("Error al agregar", {
        description: "No se pudo agregar el producto. Revisa consola / backend.",
      });
    } finally {
      setGuardando(false);
    }
  };

  const abrirEditar = (product: any) => {
    setEditandoId(product.id);
    setNuevoProducto({
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock_quantity: Number(product.stock),
      image_url: product.image ?? "",
      is_active: product.is_active,
      category_id: categorias.find((c) => c.name === product.category)?.id ?? "",
    });
    setOpenNuevo(true);
  };

  const handleEditarProducto = async () => {
    if (!editandoId) return;

    // Validaciones mínimas (igual que agregar)
    if (!nuevoProducto.name.trim()) {
      toast.error("Falta el nombre", { description: "Por favor ingresa el nombre del producto." });
      return;
    }
    if (!nuevoProducto.description.trim()) {
      toast.error("Falta la descripción", { description: "Por favor ingresa la descripción del producto." });
      return;
    }
    if (!nuevoProducto.category_id) {
      toast.error("Falta la categoría", { description: "Selecciona una categoría para el producto." });
      return;
    }
    if (nuevoProducto.price <= 0) {
      toast.error("Precio inválido", { description: "El precio debe ser mayor a 0." });
      return;
    }
    if (nuevoProducto.stock_quantity < 0) {
      toast.error("Stock inválido", { description: "El stock no puede ser negativo." });
      return;
    }

    try {
      setGuardando(true);

      await editarProducto(editandoId, {
        name: nuevoProducto.name,
        description: nuevoProducto.description,
        price: Number(nuevoProducto.price),
        stock_quantity: Number(nuevoProducto.stock_quantity),
        image_url: nuevoProducto.image_url || null,
        is_active: nuevoProducto.is_active,
        category_id: nuevoProducto.category_id,
      });

      await recargarProductos();

      toast.success("Producto actualizado", {
        description: `Se actualizaron los datos de "${nuevoProducto.name}".`,
      });

      setOpenNuevo(false);
      setEditandoId(null);

      // limpiar form
      setNuevoProducto({
        name: "",
        description: "",
        price: 0,
        stock_quantity: 0,
        image_url: "",
        is_active: true,
        category_id: "",
      });
    } catch (e) {
      console.error("Error editando producto:", e);
      toast.error("Error al editar", { description: "No se pudo actualizar el producto." });
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminarProducto = async (id: string, nombre: string) => {
    try {
      await eliminarProducto(id);
      await recargarProductos();

      toast.success("Producto eliminado", {
        description: `Se eliminó "${nombre}" correctamente.`,
      });
    } catch (e) {
      console.error("Error eliminando producto:", e);

      toast.error("Error al eliminar", {
        description: "No se pudo eliminar el producto.",
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setCargandoCategorias(true);
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (e) {
        console.error("Error cargando categorías:", e);
        setCategorias([]);
      } finally {
        setCargandoCategorias(false);
      }
    })();
  }, []);

  useEffect(() => {
    recargarProductos();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'out_of_stock';
    if (stock < 20) return 'low_stock';
    return 'in_stock';
  };

  const productosUI = productos.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    stock: p.stock_quantity,          // <-- adapter
    image: p.image_url ?? "",         // <-- adapter (evita undefined)
    category: (p as any).categoria ?? (p as any).Categoria ?? "", // <-- adapter
    is_active: p.is_active,
  }));

  const filteredProducts = productosUI.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const stockStatus = getStockStatus(product.stock);
    const matchesStatus = statusFilter === 'all' || stockStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalValue = filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockCount = filteredProducts.filter(p => getStockStatus(p.stock) === 'low_stock').length;
  const outOfStockCount = filteredProducts.filter(p => getStockStatus(p.stock) === 'out_of_stock').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900">
              Gestión de Inventario
            </h1>
            <p className="text-gray-600 mt-1">
              Control completo de productos y existencias
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>

            <Dialog open={openNuevo} onOpenChange={setOpenNuevo}>
              <DialogTrigger asChild>
                <Button
                  className="bg-primary hover:bg-forest"
                  onClick={() => {
                    setEditandoId(null);
                    setNuevoProducto({
                      name: "",
                      description: "",
                      price: 0,
                      stock_quantity: 0,
                      image_url: "",
                      is_active: true,
                      category_id: "",
                    });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Producto
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editandoId ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input
                      value={nuevoProducto.name}
                      onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descripción</label>
                    <Input
                      value={nuevoProducto.description}
                      onChange={(e) => setNuevoProducto({ ...nuevoProducto, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Precio</label>
                      <Input
                        type="number"
                        value={nuevoProducto.price}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: Number(e.target.value) })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stock</label>
                      <Input
                        type="number"
                        value={nuevoProducto.stock_quantity}
                        onChange={(e) =>
                          setNuevoProducto({ ...nuevoProducto, stock_quantity: Number(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Imagen (URL)</label>
                    <Input
                      value={nuevoProducto.image_url ?? ""}
                      onChange={(e) => setNuevoProducto({ ...nuevoProducto, image_url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categoría</label>
                    <Select
                      value={nuevoProducto.category_id}
                      onValueChange={(value) => setNuevoProducto({ ...nuevoProducto, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {editandoId && (
                    <div className="flex items-center justify-between border rounded-lg p-3">
                      <div>
                        <p className="text-sm font-medium">Estado del producto</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {nuevoProducto.is_active ? "Activo" : "Inactivo"}
                        </span>

                        <Switch
                          checked={nuevoProducto.is_active}
                          onCheckedChange={(value: boolean) =>
                            setNuevoProducto({ ...nuevoProducto, is_active: value })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpenNuevo(false);
                        setEditandoId(null);
                      }}
                    >
                      Cancelar
                    </Button>

                    <Button
                      className="bg-primary hover:bg-forest"
                      onClick={editandoId ? handleEditarProducto : handleGuardarProducto}
                      disabled={guardando}
                    >
                      {guardando ? "Guardando..." : (editandoId ? "Guardar cambios" : "Guardar")}
                    </Button>

                  </div>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredProducts.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valor Total</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(totalValue)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Stock Bajo</p>
                  <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Agotados</p>
                  <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-natural">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>

                  {cargandoCategorias ? (
                    <SelectItem value="loading" disabled>
                      Cargando...
                    </SelectItem>
                  ) : (
                    categorias.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))
                  )}

                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="in_stock">En Stock</SelectItem>
                  <SelectItem value="low_stock">Stock Bajo</SelectItem>
                  <SelectItem value="out_of_stock">Agotado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle>Lista de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Cantidad Stock</TableHead>
                  <TableHead>Estado Stock</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Estado Producto</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargandoProductos ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                      Cargando productos...
                    </TableCell>
                  </TableRow>
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                      No hay productos para mostrar.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <TableRow
                        key={product.id}
                        className={!product.is_active ? "opacity-50" : ""}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image || "/images/imagePlaceholder.png"}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-600">ID: {product.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{product.stock}</span> unidades
                        </TableCell>
                        <TableCell>
                          <Badge className={INVENTORY_STATUS[stockStatus].color}>
                            {INVENTORY_STATUS[stockStatus].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(product.price)}
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          {formatCurrency(product.price * product.stock)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              product.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-600"
                            }
                          >
                            {product.is_active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => abrirEditar(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará "{product.name}" permanentemente.
                                    No se puede deshacer.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleEliminarProducto(product.id, product.name)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}