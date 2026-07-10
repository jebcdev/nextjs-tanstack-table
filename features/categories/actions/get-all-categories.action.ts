/**
 * @fileoverview Server Action para obtener todas las categorías.
 *   Consulta la base de datos vía Prisma y retorna una respuesta
 *   estandarizada con el tipo IGeneralResponse.
 * @module features/categories/actions/get-all-categories
 *
 * @description
 * - Server Action de Next.js (se ejecuta solo en servidor)
 * - Usa Prisma ORM para consultar la tabla categories
 * - Retorna IGeneralResponse<Category[]> para tipado seguro
 * - Loggea errores con consoleLogger solo en desarrollo
 */

"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Category } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";

/**
 * Obtiene todas las categorías de la base de datos.
 *
 * @returns {Promise<IGeneralResponse<Category[]>>}
 *   - success: data con array de categorías
 *   - error: message descriptivo del error
 *
 * @example
 * const result = await getAllCategoriesAction();
 * if (result.success) {
 *   const categories = result.data;
 * }
 */
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
