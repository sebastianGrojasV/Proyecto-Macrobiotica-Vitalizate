//#region Imports
import { useEffect, useState } from "react";
import { obtenerCategorias, CategoriaDto } from "@/api/categorias.service";
import { obtenerProductos, ProductoDto, agregarProducto, eliminarProducto, editarProducto } from "@/api/productos.service";
import { obtenerHistorialProducto, HistorialProductoDto } from "@/api/historialProducto.service";
import { History } from "lucide-react";
import { Package, Search, Plus, Edit, Trash2, AlertTriangle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
//#endregion

//#region Parseo JSON
type JsonRecord = Record<string, any>;

const safeParseJson = (value: string | null | undefined): any => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value; // si no es JSON válido, devolvemos el string original
  }
};

const formatValue = (v: any) => {
  if (v === null || v === undefined) return "—";
  if (typeof v === "string") return v.trim() === "" ? "—" : v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  // objetos/arrays:
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
};

// Une llaves de old/new y crea filas de diff
const buildDiffRows = (oldObj: any, newObj: any) => {
  // si cualquiera no es objeto (por ejemplo string), tratamos como “raw”
  const oldIsObject = oldObj && typeof oldObj === "object" && !Array.isArray(oldObj);
  const newIsObject = newObj && typeof newObj === "object" && !Array.isArray(newObj);

  if (!oldIsObject && !newIsObject) {
    // no hay estructura por campos, se muestra como raw
    return null as null | Array<{ key: string; oldV: any; newV: any; changed: boolean }>;
  }

  const keys = new Set<string>([
    ...Object.keys((oldIsObject ? oldObj : {}) as JsonRecord),
    ...Object.keys((newIsObject ? newObj : {}) as JsonRecord),
  ]);

  const rows = Array.from(keys)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => {
      const oldV = oldIsObject ? oldObj[key] : undefined;
      const newV = newIsObject ? newObj[key] : undefined;

      // comparación “simple”:
      const changed =
        JSON.stringify(oldV) !== JSON.stringify(newV);

      return { key, oldV, newV, changed };
    });

  return rows;
};

const FIELD_LABELS: Record<string, string> = {
  name: "Nombre",
  description: "Descripción",
  price: "Precio",
  stock_quantity: "Stock",
  image_url: "Imagen (URL)",
  is_active: "Estado",
  category_id: "Categoría",
  Categoria: "Categoría",
  categoria: "Categoría",
};

const prettyFieldName = (key: string) => {
  // 1) si está en el diccionario, usarlo
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];

  // 2) fallback: convertir snake_case / camelCase a "Title Case"
  //    stock_quantity -> Stock quantity
  //    createdAt -> Created At
  const withSpaces = key
    .replace(/_/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2");

  // Title Case sencillo
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};
//#endregion

export default function Inventory() {
  const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);

  const [productos, setProductos] = useState<ProductoDto[]>([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);

  const [openNuevo, setOpenNuevo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [stockOriginalEdicion, setStockOriginalEdicion] = useState<number | null>(null);

  const [openHistorial, setOpenHistorial] = useState(false);
  const [productoHistorial, setProductoHistorial] = useState<any | null>(null); // usamos el adapter product UI
  const [cargandoHistorial, setCargandoHistorial] = useState(false);
  const [historialProducto, setHistorialProducto] = useState<HistorialProductoDto[]>([]);

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
    setStockOriginalEdicion(product.stock);
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

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'out_of_stock';
    if (stock < 20) return 'low_stock';
    return 'in_stock';
  };

  const stockSeverity = (status: string) => {
    if (status === "out_of_stock") return 2;
    if (status === "low_stock") return 1;
    return 0; // in_stock
  };

  //#region Stock Alert
  type StockAlert = null | { type: "low"; qty: number } | { type: "out" };

  const showStockToast = (nombre: string, alert: StockAlert) => {
    if (!alert) return;

    const isOut = alert.type === "out";
    const title = isOut ? "Producto agotado" : "Stock bajo";
    const desc = isOut
      ? `El producto "${nombre}" se agotó (0 unidades).`
      : `El producto "${nombre}" está bajo en stock (${alert.qty} unidades).`;

    toast.custom(
      () => (
        <div
          className={[
            "w-full max-w-sm rounded-lg border p-4 shadow-lg",
            "flex gap-3 items-start",
            isOut
              ? "border-red-300 bg-red-50 text-red-900"
              : "border-yellow-300 bg-yellow-50 text-yellow-900",
          ].join(" ")}
        >
          <div
            className={[
              "mt-0.5 rounded-full p-2",
              isOut ? "bg-red-100" : "bg-yellow-100",
            ].join(" ")}
          >
            <AlertTriangle className={["h-5 w-5", isOut ? "text-red-700" : "text-yellow-700"].join(" ")} />
          </div>

          <div className="flex-1">
            <p className="font-semibold leading-5">{title}</p>
            <p className="text-sm opacity-90 mt-1 whitespace-pre-wrap">{desc}</p>
          </div>
        </div>
      ),
      {
        duration: 8000
      }
    );
  };
  //#endregion


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

      // Detectamos si hay alerta (pero la mostramos DESPUÉS, para que quede de última y destaque)
      let stockAlert: StockAlert = null;

      if (stockOriginalEdicion !== null) {
        const oldStatus = getStockStatus(stockOriginalEdicion);
        const newStatus = getStockStatus(Number(nuevoProducto.stock_quantity));

        const oldRank = stockSeverity(oldStatus);
        const newRank = stockSeverity(newStatus);

        // Solo si empeoró el estado (in_stock->low/out o low->out)
        if (newRank > oldRank) {
          if (newStatus === "out_of_stock") {
            stockAlert = { type: "out" };
          } else if (newStatus === "low_stock") {
            stockAlert = { type: "low", qty: Number(nuevoProducto.stock_quantity) };
          }
        }
      }

      await recargarProductos();

      toast.message("Producto actualizado", {
        description: `Se actualizaron los datos de "${nuevoProducto.name}".`,
        duration: 5000,
      });

      if (stockAlert) {
        setTimeout(() => {
          showStockToast(nuevoProducto.name, stockAlert);
        }, 120);
      }

      setOpenNuevo(false);
      setEditandoId(null);
      setStockOriginalEdicion(null);

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

  const abrirHistorial = async (product: any) => {
    try {
      setProductoHistorial(product);
      setOpenHistorial(true);
      setCargandoHistorial(true);

      const data = await obtenerHistorialProducto(product.id);
      setHistorialProducto(data);
    } catch (e) {
      console.error("Error cargando historial:", e);
      setHistorialProducto([]);
      toast.error("Error cargando historial", {
        description: "No se pudo cargar el historial del producto.",
      });
    } finally {
      setCargandoHistorial(false);
    }
  };

  const cerrarHistorial = () => {
    setOpenHistorial(false);
    setProductoHistorial(null);
    setHistorialProducto([]);
    setCargandoHistorial(false);
  };

  // Nombre de categoría para el Historial
  const normalizeGuid = (v: string) => v.trim().replace(/[{}]/g, "").toLowerCase();

  const getCategoryNameById = (id: string | null | undefined) => {
    if (!id) return "—";

    const needle = normalizeGuid(String(id));

    const cat = categorias.find((c) => normalizeGuid(c.id) === needle);
    return cat ? cat.name : id; // fallback al id si no lo encuentra
  };

  const formatValueByKey = (key: string, value: any) => {
    if (value === null || value === undefined) return "—";

    // ✅ category_id => mostrar nombre
    if (key === "category_id") {
      return getCategoryNameById(String(value));
    }

    // ✅ is_active => mostrar Activo/Inactivo
    if (key === "is_active") {
      return Boolean(value) ? "Activo" : "Inactivo";
    }

    // fallback a tu formatValue actual
    return formatValue(value);
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');


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

    const matchesActive =
      activeFilter === 'all' ||
      (activeFilter === 'active' && product.is_active) ||
      (activeFilter === 'inactive' && !product.is_active);

    return matchesSearch && matchesCategory && matchesStatus && matchesActive;
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
                    setStockOriginalEdicion(null);
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

                    <Textarea
                      value={nuevoProducto.description}
                      onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, description: e.target.value })
                      }
                      className="min-h-32 max-h-60 resize-y overflow-y-auto whitespace-pre-wrap"
                    />

                    <p className="text-xs text-gray-500">
                      Tip: puedes usar Enter para saltos de línea y pegar listas.
                    </p>
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
                        setStockOriginalEdicion(null);
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                  <SelectValue placeholder="EstadoStock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los stock</SelectItem>
                  <SelectItem value="in_stock">En Stock</SelectItem>
                  <SelectItem value="low_stock">Stock Bajo</SelectItem>
                  <SelectItem value="out_of_stock">Agotado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={activeFilter} onValueChange={(v) => setActiveFilter(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="EstadoProducto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
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
                      >
                        <TableCell className={!product.is_active ? "opacity-50" : ""}>
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
                        <TableCell className={!product.is_active ? "opacity-50" : ""}>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className={!product.is_active ? "opacity-50" : ""}>
                          <span className="font-semibold">{product.stock}</span> unidades
                        </TableCell>
                        <TableCell className={!product.is_active ? "opacity-50" : ""}>
                          <Badge className={INVENTORY_STATUS[stockStatus].color}>
                            {INVENTORY_STATUS[stockStatus].label}
                          </Badge>
                        </TableCell>
                        <TableCell className={!product.is_active ? "opacity-50" : ""}>
                          <span className="font-semibold">{formatCurrency(product.price)}</span>
                        </TableCell>
                        <TableCell className={!product.is_active ? "opacity-50" : ""}>
                          <span className="font-semibold text-primary">{formatCurrency(product.price * product.stock)}</span>
                        </TableCell>
                        <TableCell className={!product.is_active ? "opacity-50" : ""}>
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
                            <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50" onClick={() => abrirHistorial(product)}>
                              <History className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900 hover:bg-gray-200/60" onClick={() => abrirEditar(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={!product.is_active}
                                  className={
                                    product.is_active
                                      ? "text-red-500 hover:text-red-700 hover:bg-red-50"
                                      : "text-gray-400 cursor-not-allowed"
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará (inactivará) el producto "{product.name}".
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

      {/* Para el Historial */}
      <Dialog
        open={openHistorial}
        onOpenChange={(v) => {
          if (!v) cerrarHistorial();
          else setOpenHistorial(true);
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Historial del Producto
            </DialogTitle>
          </DialogHeader>

          {!productoHistorial ? (
            <div className="text-gray-500">No hay producto seleccionado.</div>
          ) : (
            <div className="space-y-4">
              {/* Detalle actual */}
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle>Detalle actual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <img
                      src={productoHistorial.image || "/images/imagePlaceholder.png"}
                      alt={productoHistorial.name}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xl font-bold text-gray-900">{productoHistorial.name}</p>
                          <p className="text-sm text-gray-600">ID: {productoHistorial.id}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{productoHistorial.category}</Badge>
                          <Badge
                            className={
                              productoHistorial.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-600"
                            }
                          >
                            {productoHistorial.is_active ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="border rounded-lg p-4 md:col-span-3">
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Descripción
                          </p>
                          <div className="max-h-40 overflow-y-auto pr-2">
                            <p className="text-base text-gray-900 whitespace-pre-wrap">
                              {productoHistorial.description}
                            </p>
                          </div>
                        </div>


                        <div className="border rounded-lg p-3">
                          <p className="text-xs text-gray-500">Precio</p>
                          <p className="text-md font-semibold text-gray-900 mt-1">
                            {formatCurrency(productoHistorial.price)}
                          </p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <p className="text-xs text-gray-500">Stock</p>
                          <p className="text-md font-semibold text-gray-900 mt-1">
                            {productoHistorial.stock} unidades
                          </p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <p className="text-xs text-gray-500">Cambios Registrados</p>
                          <p className="text-md font-bold text-primary mt-1">
                            {historialProducto.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabla historial */}
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle>Historial de cambios</CardTitle>
                </CardHeader>

                <CardContent>
                  {cargandoHistorial ? (
                    <div className="text-center text-gray-500 py-8">Cargando historial...</div>
                  ) : historialProducto.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      No hay cambios registrados para este producto.
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {historialProducto.map((h) => {
                        const oldParsed = safeParseJson(h.old_values);
                        const newParsed = safeParseJson(h.new_values);

                        const diffRows = buildDiffRows(oldParsed, newParsed);

                        const changedCount =
                          diffRows?.filter((r) => r.changed).length ?? 0;

                        const isRaw = diffRows === null;

                        return (
                          <AccordionItem key={h.id} value={h.id} className="border rounded-lg mb-3 px-3">
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex w-full items-center justify-between gap-4 py-2">
                                <div className="text-left">
                                  <div className="flex items-center gap-4 flex-wrap">
                                    {isRaw ? (
                                      <Badge className="bg-gray-200 text-gray-700">RAW</Badge>
                                    ) : (
                                      <Badge className="bg-primary/10 text-primary">
                                        {changedCount} datos cambiados
                                      </Badge>
                                    )}

                                    <Badge variant="outline">{h.action}</Badge>

                                    <span className="text-sm text-gray-600">
                                      {new Date(h.created_at).toLocaleString()}
                                    </span>

                                  </div>

                                  <p className="text-md font-semibold mt-2 ms-1">
                                    {h.description}
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>

                            <AccordionContent className="pb-4">
                              {/* Si no hay JSON por campos, mostramos raw */}
                              {isRaw ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-gray-500 mb-2">Antes</p>
                                    <pre className="text-xs whitespace-pre-wrap break-words max-h-64 overflow-y-auto pr-2">
                                      {formatValue(oldParsed)}
                                    </pre>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-gray-500 mb-2">Después</p>
                                    <pre className="text-xs whitespace-pre-wrap break-words max-h-64 overflow-y-auto pr-2">
                                      {formatValue(newParsed)}
                                    </pre>
                                  </div>
                                </div>
                              ) : (
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-48">Atributo</TableHead>
                                      <TableHead>Antes</TableHead>
                                      <TableHead>Después</TableHead>
                                    </TableRow>
                                  </TableHeader>

                                  <TableBody>
                                    {diffRows!
                                      .filter((r) => r.changed) // 👈 mostramos solo los cambios
                                      .map((r) => (
                                        <TableRow key={r.key}>
                                          <TableCell className="font-medium">
                                            {prettyFieldName(r.key)}
                                          </TableCell>

                                          <TableCell>
                                            <pre className="whitespace-pre-wrap break-words max-h-40 overflow-y-auto pr-2">
                                              {formatValueByKey(r.key, r.oldV)}
                                            </pre>
                                          </TableCell>

                                          <TableCell>
                                            <pre className="whitespace-pre-wrap break-words max-h-40 overflow-y-auto pr-2">
                                              {formatValueByKey(r.key, r.newV)}
                                            </pre>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}