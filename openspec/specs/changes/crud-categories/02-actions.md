## Objetivo
Implementar las Server Actions para operaciones CRUD de categorías.

## Archivos a Crear
- `features/categories/actions/create-category.action.ts`
- `features/categories/actions/update-category.action.ts`
- `features/categories/actions/get-category-by-id.action.ts`
- `features/categories/actions/delete-category.action.ts`

## Patrón Base (TODAS siguen este patrón)

### 1. createCategoryAction
```typescript
"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Category } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";
import { categorySchema, type CategoryFormData } from "../validations";
import { revalidatePath } from "next/cache";

export const createCategoryAction = async (
    data: CategoryFormData
): Promise<IGeneralResponse<Category>> => {
    try {
        const validated = categorySchema.safeParse(data);
        
        if (!validated.success) {
            return {
                error: true,
                success: false,
                message: "Datos inválidos",
                data: null,
            };
        }

        const category = await prismaDB.category.create({
            data: validated.data,
        });

        revalidatePath("/categories");

        return {
            error: false,
            success: true,
            message: "Categoría creada exitosamente",
            data: category,
        };
    } catch (error) {
        consoleLogger("Error al crear categoría", error);
        return {
            error: true,
            success: false,
            message: "Error al crear la categoría",
            data: null,
        };
    }
};
2. updateCategoryAction
Parámetros: { categoryId: string, data: CategoryFormData }
Revalida: /categories, /categories/${categoryId}, /categories/${categoryId}/edit

3. getCategoryByIdAction
Parámetros: categoryId: string
Retorna: IGeneralResponse<Category>

4. deleteCategoryAction
Parámetros: categoryId: string
Validación extra: Verificar que no tenga productos asociados
Retorna: IGeneralResponse<void>

Actualizar Barril
Actualizar features/categories/actions/index.ts:


export * from "./create-category.action";
export * from "./update-category.action";
export * from "./get-category-by-id.action";
export * from "./delete-category.action";