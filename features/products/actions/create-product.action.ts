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
