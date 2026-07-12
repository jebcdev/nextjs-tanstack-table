/**
 * @fileoverview Server Action para eliminar una categoría.
 * @module features/categories/actions/delete-category
 */

"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { consoleLogger } from "@/lib/logger/console-logger";
import { revalidatePath } from "next/cache";

export const deleteCategoryAction = async (
    categoryId: string
): Promise<IGeneralResponse<void>> => {
    try {
        const productCount = await prismaDB.product.count({
            where: { categoryId },
        });

        if (productCount > 0) {
            return {
                error: true,
                success: false,
                message: `No se puede eliminar la categoría porque tiene ${productCount} producto(s) asociado(s)`,
            };
        }

        const deletedCategory = await prismaDB.category.delete({
            where: { id: categoryId },
        });

        revalidatePath("/categories");

        return {
            error: false,
            success: true,
            message: "Categoría eliminada exitosamente",
            data: void deletedCategory,
        };
    } catch (error) {
        consoleLogger("Error al eliminar categoría", error);
        return {
            error: true,
            success: false,
            message: "Error al eliminar la categoría",
        };
    }
};
