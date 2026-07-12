# Validaciones Zod - Categorías

## Objetivo
Definir los esquemas de validación para operaciones CRUD de categorías.

## Archivo a Crear
- `features/categories/validations/category.schema.ts`

## Esquema Principal
```typescript
import { z } from "zod";

export const categorySchema = z.object({
    name: z.string()
        .min(1, "El nombre es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre no puede exceder 50 caracteres"),
    
    description: z.string()
        .max(200, "La descripción no puede exceder 200 caracteres")
        .optional()
        .nullable(),
    
    isActive: z.boolean()
        .default(true),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const categoryIdSchema = z.object({
    categoryId: z.string().min(1, "ID de categoría requerido"),
});

export type CategoryIdParams = z.infer<typeof categoryIdSchema>;

Exportación
Actualizar features/categories/validations/index.ts para exportar:


export * from "./category.schema";