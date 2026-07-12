/**
 * @fileoverview Hook de TanStack Query para obtener detalle de una categoría.
 * @module features/categories/queries/category-detail
 */

import { useQuery } from "@tanstack/react-query";
import { getCategoryByIdAction } from "../actions";
import { Category } from "@/lib/generated/prisma/browser";

export const categoryListQueryKey = ["categories"] as const;

export const categoryDetailQueryKey = (categoryId: string) =>
    ["categories", "detail", categoryId] as const;

export function useCategoryDetailQuery(categoryId: string) {
    return useQuery<Category>({
        queryKey: categoryDetailQueryKey(categoryId),
        queryFn: async () => {
            const response = await getCategoryByIdAction(categoryId);
            if (!response.success || !response.data) {
                throw new Error(response.message || "Error al obtener la categoría");
            }
            return response.data;
        },
        enabled: !!categoryId,
        retry: 1,
    });
}
