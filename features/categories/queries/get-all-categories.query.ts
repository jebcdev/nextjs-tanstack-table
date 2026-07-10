/**
 * @fileoverview Hook de TanStack Query para obtener categorías.
 *   Envuelve la Server Action getAllCategoriesAction con
 *   configuración de caché y manejo de errores.
 * @module features/categories/queries/get-all-categories
 *
 * @description
 * - Usa useQuery de TanStack Query v5
 * - Cache por 10 minutos (staleTime + gcTime)
 * - 2 reintentos en caso de error
 * - Sin refetch al enfocar ventana
 */

import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesAction } from "../actions";
import { Category } from "@/lib/generated/prisma/browser";

/** Clave única para el query de categorías — permite invalidación manual */
export const CATEGORIES_QUERY_KEY = "categories" as const;

/**
 * Hook para obtener todas las categorías con TanStack Query.
 *
 * @returns {UseQueryResult<Category[], Error>} Resultado del query con data tipada
 *
 * @example
 * const { data, isLoading, isError, error } = useCategoriesQuery();
 */
export const useCategoriesQuery = () => {
    return useQuery<Category[]>({
        queryKey: [CATEGORIES_QUERY_KEY],
        queryFn: async () => {
            const result = await getAllCategoriesAction();
            if (result.error) {
                throw new Error(result.message);
            }
            return result.data;
        },
        // Los datos de categorías cambian con poca frecuencia
        staleTime: 1000 * 60 * 10, // 10 minutos
        gcTime: 1000 * 60 * 10, // 10 minutos (garbage collection)
        retry: 2,
        refetchOnWindowFocus: false,
    });
};
