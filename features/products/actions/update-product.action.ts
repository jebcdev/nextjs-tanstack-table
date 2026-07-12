"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Product } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";
import { productSchema, type ProductFormData } from "../validations";
import { slugify } from "@/lib/utils/slugify";
import { revalidatePath } from "next/cache";

export const updateProductAction = async (
    productId: string,
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

        const product = await prismaDB.product.update({
            where: { id: productId },
            data: {
                ...validated.data,
                slug,
            },
        });

        revalidatePath("/products");
        revalidatePath(`/products/${productId}`);
        revalidatePath(`/products/${productId}/edit`);

        return {
            error: false,
            success: true,
            message: "Producto actualizado exitosamente",
            data: product,
        };
    } catch (error) {
        consoleLogger("Error al actualizar producto", error);
        return {
            error: true,
            success: false,
            message: "Error al actualizar el producto",
        };
    }
};
