# Componentes UI - Categorías

## Objetivo
Implementar componentes reutilizables para formularios y visualización.

## Archivos a Crear
- `features/categories/components/category-form.tsx`
- `features/categories/components/category-detail.tsx`

## 1. CategoryForm
**Props:**
```typescript
interface CategoryFormProps {
    defaultValues?: Partial<CategoryFormData>;
    onSubmit: (data: CategoryFormData) => void;
    isPending?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    onCancel?: () => void;
    className?: string;
}
Campos:

// ---------------------------------------------------------------------------
model Category {
  id          String    @id @default(uuid()) @map("id")
  name        String    @map("name")
  slug        String    @unique @map("slug")
  description String?   @map("description")
  isActive    Boolean   @default(true) @map("is_active")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  products    Product[]

  @@unique([name])
  @@map("categories")
}

Tecnologías:

react-hook-form + zodResolver

shadcn/ui: Button, Input, Label, Checkbox, Textarea

Tailwind para estilos

Comportamiento:

Validación en tiempo real (mode: "onBlur")

Mostrar errores debajo de cada campo

Deshabilitar botón durante submit

Animación de error con animate-pulse

2. CategoryDetail
Props:

typescript
interface CategoryDetailProps {
    category: Category;
    onEdit?: () => void;
}
Visualización:

Nombre (título)

Estado (Badge: Activa/Inactiva)

Descripción (si existe)

Metadata (fechas de creación/actualización)

Botón de editar (opcional)

Patrón de Exportación
Ambos componentes exportados como named exports.