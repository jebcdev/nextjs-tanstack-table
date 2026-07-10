// features/categories/queries/get-all-categories.query.ts
import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesAction } from "../actions";
import { Category } from "@/lib/generated/prisma/browser";

// Definir la clave del query para mejor gestión de caché
export const CATEGORIES_QUERY_KEY = "categories" as const;

// Tipo para la respuesta del query

// Hook personalizado para obtener las categorías
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
        // Opciones recomendadas
        staleTime: 1000 * 60 * 10, // 10 minutos
        gcTime: 1000 * 60 * 10, // 10 minutos (antes cacheTime)
        retry: 2,
        refetchOnWindowFocus: false,
    });
};
