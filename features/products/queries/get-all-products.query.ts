/**
 * @fileoverview Hook de TanStack Query para obtener productos.
 *   Envuelve la Server Action getAllProductsAction con
 *   configuración de caché y manejo de errores.
 * @module features/products/queries/get-all-products
 *
 * @description
 * - Usa useQuery de TanStack Query v5
 * - Cache por 10 minutos (staleTime + gcTime)
 * - 2 reintentos en caso de error
 * - Sin refetch al enfocar ventana
 */

import { useQuery } from "@tanstack/react-query";
import { getAllProductsAction } from "../actions";
import { Product } from "@/lib/generated/prisma/browser";

/** Clave única para el query de productos — permite invalidación manual */
export const PRODUCTS_QUERY_KEY = "products" as const;

/**
 * Hook para obtener todos los productos con TanStack Query.
 *
 * @returns {UseQueryResult<Product[], Error>} Resultado del query
 *
 * @example
 * const { data, isLoading, isError, error } = useProductsQuery();
 */
export const useProductsQuery = () => {
    return useQuery<Product[]>({
        queryKey: [PRODUCTS_QUERY_KEY],
        queryFn: async () => {
            const result = await getAllProductsAction();
            if (result.error) {
                throw new Error(result.message);
            }
            return result.data;
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        retry: 2,
        refetchOnWindowFocus: false,
    });
};
