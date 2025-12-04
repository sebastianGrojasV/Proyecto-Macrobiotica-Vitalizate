# Instrucciones de Uso de la Plantilla Shadcn-UI

## Pila Tecnológica

Este proyecto está construido con:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

Todos los componentes de shadcn/ui han sido descargados en `@/components/ui`.

## Estructura de Archivos

- `index.html` - Punto de entrada HTML
- `vite.config.ts` - Archivo de configuración de Vite
- `tailwind.config.js` - Archivo de configuración de Tailwind CSS
- `package.json` - Dependencias y scripts de NPM
- `src/app.tsx` - Componente raíz del proyecto
- `src/main.tsx` - Punto de entrada del proyecto
- `src/index.css` - Configuración CSS existente
- `src/pages/Index.tsx` - Lógica de la página principal

## Componentes

- Todos los componentes de shadcn/ui están pre-descargados y disponibles en `@/components/ui`

## Estilos

- Agrega estilos globales a `src/index.css` o crea nuevos archivos CSS según sea necesario
- Usa clases de Tailwind para estilizar componentes

## Desarrollo

- Importa componentes desde `@/components/ui` en tus componentes de React
- Personaliza la interfaz modificando la configuración de Tailwind

## Nota

- El alias de ruta `@/` apunta al directorio `src/`
- En tu código TypeScript, no re-exportes tipos que ya estás importando

# Comandos

**Instalar Dependencias**

```shell
pnpm i
```

**Agregar Dependencias**

```shell
pnpm add nombre_de_nueva_dependencia
```

**Iniciar Vista Previa**

```shell
pnpm run dev
```

**Para Construir**

```shell
pnpm run build
```
