/**
 * @fileoverview Server Action para actualizar una categoría.
 * @module features/categories/actions/update-category
 */

"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Category } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";
import { categorySchema, type CategoryFormData } from "../validations";
import { slugify } from "@/lib/utils/slugify";
import { revalidatePath } from "next/cache";

export const updateCategoryAction = async (
    categoryId: string,
    data: CategoryFormData
): Promise<IGeneralResponse<Category>> => {
    try {
        const validated = categorySchema.safeParse(data);

        if (!validated.success) {
            return {
                error: true,
                success: false,
                message: "Datos inválidos",
            };
        }

        const slug = slugify(validated.data.name);

        const category = await prismaDB.category.update({
            where: { id: categoryId },
            data: {
                ...validated.data,
                slug,
            },
        });

        revalidatePath("/categories");
        revalidatePath(`/categories/${categoryId}`);
        revalidatePath(`/categories/${categoryId}/edit`);

        return {
            error: false,
            success: true,
            message: "Categoría actualizada exitosamente",
            data: category,
        };
    } catch (error) {
        consoleLogger("Error al actualizar categoría", error);
        return {
            error: true,
            success: false,
            message: "Error al actualizar la categoría",
        };
    }
};
