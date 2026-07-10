"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Category } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";

export const getAllCategoriesAction = async (): Promise<
    IGeneralResponse<Category[]>
> => {
    try {
        const categories = await prismaDB.category.findMany();
        return {
            error: false,
            success: true,
            message: "Categorías obtenidas correctamente",
            data: categories,
        };
    } catch (error) {
        consoleLogger("Error al obtener las categorías de la base de datos en la acción getAllCategoriesAction", error);
        return {
            error: true,
            success: false,
            message: "Error al obtener las categorías",
        };
    }
};
