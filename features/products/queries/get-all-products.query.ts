import { useQuery } from "@tanstack/react-query";
import { getAllProductsAction } from "../actions";
import { Product } from "@/lib/generated/prisma/browser";

export const PRODUCTS_QUERY_KEY = "products" as const;

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
