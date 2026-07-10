/**
 * @fileoverview Server Action para obtener todos los productos.
 *   Consulta la BD vía Prisma y serializa el campo Decimal (price)
 *   a Number para evitar problemas de serialización en el cliente.
 * @module features/products/actions/get-all-products
 *
 * @description
 * - Server Action de Next.js
 * - Convierte price de Decimal (Prisma) a Number para el cliente
 * - Retorna IGeneralResponse<Product[]> con tipado seguro
 * - Loggea errores solo en desarrollo con consoleLogger
 */

"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { Product } from "@/lib/generated/prisma/client";
import { consoleLogger } from "@/lib/logger/console-logger";

/**
 * Obtiene todos los productos de la base de datos.
 * Serializa el campo price de Decimal a Number para el cliente.
 *
 * @returns {Promise<IGeneralResponse<Product[]>>}
 *   - success: data con array de productos (price como number)
 *   - error: message descriptivo del error
 *
 * @remarks
 * El cast `as unknown as Product[]` es necesario porque Prisma define
 * price como Decimal, pero lo serializamos a Number. Una alternativa
 * sería definir un tipo SerializedProduct.
 */
export const getAllProductsAction = async (): Promise<
    IGeneralResponse<Product[]>
> => {
    try {
        const products = await prismaDB.product.findMany();
        // Prisma retorna Decimal como objeto, lo serializamos a Number
        const serializedProducts = products.map((p) => ({
            ...p,
            price: Number(p.price),
        }));
        return {
            error: false,
            success: true,
            message: "Productos obtenidos correctamente",
            data: serializedProducts as unknown as Product[],
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
