"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Product } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";

export const getProductByIdAction = async (
    productId: string
): Promise<IGeneralResponse<Product>> => {
    try {
        const product = await prismaDB.product.findUnique({
            where: { id: productId },
            include: { category: true },
        });

        if (!product) {
            return {
                error: true,
                success: false,
                message: "Producto no encontrado",
            };
        }

        const serialized = {
            ...product,
            price: Number(product.price),
        } as unknown as Product;

        return {
            error: false,
            success: true,
            message: "Producto obtenido exitosamente",
            data: serialized,
        };
    } catch (error) {
        consoleLogger("Error al obtener producto por ID", error);
        return {
            error: true,
            success: false,
            message: "Error al obtener el producto",
        };
    }
};
