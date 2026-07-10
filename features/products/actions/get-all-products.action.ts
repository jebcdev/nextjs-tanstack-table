"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Product } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";

export const getAllProductsAction = async (): Promise<
    IGeneralResponse<Product[]>
> => {
    try {
        const products = await prismaDB.product.findMany();
        return {
            error: false,
            success: true,
            message: "Productos obtenidos correctamente",
            data: products,
        };
    } catch (error) {
        consoleLogger("Error al obtener los productos de la base de datos en la acción getAllProductsAction", error);
        return {
            error: true,
            success: false,
            message: "Error al obtener los productos",
        };
    }
};
