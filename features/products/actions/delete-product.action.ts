"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { IGeneralResponse } from "@/features/shared/types";
import { consoleLogger } from "@/lib/logger/console-logger";
import { revalidatePath } from "next/cache";

export const deleteProductAction = async (
    productId: string
): Promise<IGeneralResponse<void>> => {
    try {
        await prismaDB.product.delete({
            where: { id: productId },
        });

        revalidatePath("/products");

        return {
            error: false,
            success: true,
            message: "Producto eliminado exitosamente",
        };
    } catch (error) {
        consoleLogger("Error al eliminar producto", error);
        return {
            error: true,
            success: false,
            message: "Error al eliminar el producto",
        };
    }
};
