/**
 * @fileoverview Server Action para crear una categoría.
 * @module features/categories/actions/create-category
 */

"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Category } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";
import { categorySchema, type CategoryFormData } from "../validations";
import { slugify } from "@/lib/utils/slugify";
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
            };
        }

        const slug = slugify(validated.data.name);

        const category = await prismaDB.category.create({
            data: {
                ...validated.data,
                slug,
            },
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
        };
    }
};
