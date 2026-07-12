# Páginas - Next.js App Router

## Objetivo
Implementar las páginas para CRUD de productos.

## Rutas a Crear

### 1. Nuevo Producto
**Ruta:** `app/products/new/page.tsx`
**Tipo:** Server Component
**Acción:** `createProductAction`
**Redirección:** `/products` en éxito
**Fetch adicional:** Obtener lista de categorías para el selector
```typescript
const categories = await prismaDB.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
});
```

### 2. Editar Producto
**Ruta:** `app/products/[productId]/edit/page.tsx`
**Tipo:** Server Component con `params`
**Acción:** `updateProductAction`
**Fetch:** `getProductByIdAction` (para defaultValues) + `prismaDB.category.findMany` (para selector)
**Not Found:** Si no existe el producto
**Redirección:** `/products/[productId]` en éxito

### 3. Detalle Producto
**Ruta:** `app/products/[productId]/page.tsx`
**Tipo:** Server Component con `params`
**Fetch:** `getProductByIdAction` (debe incluir `category` en la respuesta)
**Not Found:** Si no existe el producto

## Estructura de cada página

Seguir el mismo patrón que las páginas de categorías:
- `generateMetadata` para SEO
- Server Component con `handleSubmit` inline usando `"use server"`
- Layout con `container mx-auto max-w-4xl py-10`
- Card wrapper con `rounded-none border border-border bg-card p-6`
- Pasar `cancelHref` a los formularios
