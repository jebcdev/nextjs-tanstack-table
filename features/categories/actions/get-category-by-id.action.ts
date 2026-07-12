/**
 * @fileoverview Server Action para obtener una categoría por ID.
 * @module features/categories/actions/get-category-by-id
 */

"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Category } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";

export const getCategoryByIdAction = async (
    categoryId: string
): Promise<IGeneralResponse<Category>> => {
    try {
        const category = await prismaDB.category.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            return {
                error: true,
                success: false,
                message: "Categoría no encontrada",
            };
        }

        return {
            error: false,
            success: true,
            message: "Categoría obtenida exitosamente",
            data: category,
        };
    } catch (error) {
        consoleLogger("Error al obtener categoría por ID", error);
        return {
            error: true,
            success: false,
            message: "Error al obtener la categoría",
        };
    }
};
