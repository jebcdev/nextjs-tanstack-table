# Componentes UI - Productos

## Objetivo
Implementar componentes reutilizables para formularios y visualización de productos.

## Archivos a Crear
- `features/products/components/product-form.tsx`
- `features/products/components/product-detail.tsx`

## Archivos a Actualizar
- `features/products/components/index.ts` (agregar exports)

## 1. ProductForm

**Props:**
```typescript
interface ProductFormProps {
    defaultValues?: Partial<ProductFormData>;
    categories: Array<{ id: string; name: string }>;
    onSubmit: (data: ProductFormData) => void;
    isPending?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    cancelHref?: string;
    className?: string;
}
```

**Campos:**

| Campo       | Tipo         | Widget              | Requerido |
|-------------|--------------|----------------------|-----------|
| name        | string       | Input                | Sí        |
| description | string?      | Textarea             | No        |
| price       | number       | Input (type=number)  | Sí        |
| categoryId  | string       | Select (categorías)  | Sí        |

**Tecnologías:**
- `react-hook-form` + `zodResolver`
- `shadcn/ui`: Button, Input, Label, Textarea, Select
- Tailwind para estilos

**Comportamiento:**
- Validación en tiempo real (`mode: "onBlur"`)
- Mostrar errores debajo de cada campo con `SingleFormError`
- Deshabilitar botón durante submit
- El Select de categorías recibe `categories` como prop (lista plana para evitar fetching interno)
- Precio: step="0.01", min="0", placeholder="0.00"

## 2. ProductDetail

**Props:**
```typescript
interface ProductDetailProps {
    product: Product; // debe incluir category: { name: string }
    editHref?: string;
}
```

**Visualización:**
- Nombre (título)
- Slug (monospace)
- Precio formateado en COP (`es-CO`)
- Categoría (etiqueta/badge con nombre)
- Descripción (si existe)
- Metadatos (fechas de creación/actualización)
- Botón de editar (opcional, si `editHref` está presente)

## Barril (`components/index.ts`)
```typescript
export { productsColumns } from "./table/products-columns";
export { ProductsTable } from "./table/products-table";
export { ProductForm } from "./product-form";
export { ProductDetail } from "./product-detail";
```
