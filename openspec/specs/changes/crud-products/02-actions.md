# Server Actions - Productos

## Objetivo
Implementar las Server Actions para operaciones CRUD de productos.

## Archivos a Crear
- `features/products/actions/create-product.action.ts`
- `features/products/actions/update-product.action.ts`
- `features/products/actions/get-product-by-id.action.ts`
- `features/products/actions/delete-product.action.ts`

## Archivos a Actualizar
- `features/products/actions/index.ts` (agregar exports)

## Especificaciones

### 1. createProductAction
```typescript
"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Product } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";
import { productSchema, type ProductFormData } from "../validations";
import { slugify } from "@/lib/utils/slugify";
import { revalidatePath } from "next/cache";

export const createProductAction = async (
    data: ProductFormData
): Promise<IGeneralResponse<Product>> => {
    try {
        const validated = productSchema.safeParse(data);

        if (!validated.success) {
            return {
                error: true,
                success: false,
                message: "Datos inválidos",
            };
        }

        const slug = slugify(validated.data.name);

        const product = await prismaDB.product.create({
            data: {
                ...validated.data,
                slug,
            },
        });

        revalidatePath("/products");

        return {
            error: false,
            success: true,
            message: "Producto creado exitosamente",
            data: product,
        };
    } catch (error) {
        consoleLogger("Error al crear producto", error);
        return {
            error: true,
            success: false,
            message: "Error al crear el producto",
        };
    }
};
```

### 2. updateProductAction
- **Parámetros:** `(productId: string, data: ProductFormData)`
- **Retorna:** `Promise<IGeneralResponse<Product>>`
- **Slug:** autogenerado desde `name` con `slugify()`
- **Revalida:** `/products`, `/products/${productId}`, `/products/${productId}/edit`

### 3. getProductByIdAction
- **Parámetros:** `productId: string`
- **Retorna:** `Promise<IGeneralResponse<Product>>`
- **Incluir relación:** `include: { category: true }` para mostrar nombre de categoría
- **Not Found:** retornar error si no existe
- **Price:** serializar Decimal a Number igual que en `get-all-products.action`

### 4. deleteProductAction
- **Parámetros:** `productId: string`
- **Retorna:** `Promise<IGeneralResponse<void>>`
- **Revalida:** `/products`

## Barril (`actions/index.ts`)
```typescript
export { getAllProductsAction } from "./get-all-products.action";
export { createProductAction } from "./create-product.action";
export { updateProductAction } from "./update-product.action";
export { getProductByIdAction } from "./get-product-by-id.action";
export { deleteProductAction } from "./delete-product.action";
```
