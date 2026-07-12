import { useQuery } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions";
import { Product } from "@/lib/generated/prisma/browser";

export const productListQueryKey = ["products"] as const;

export const productDetailQueryKey = (productId: string) =>
    ["products", "detail", productId] as const;

export function useProductDetailQuery(productId: string) {
    return useQuery<Product>({
        queryKey: productDetailQueryKey(productId),
        queryFn: async () => {
            const response = await getProductByIdAction(productId);
            if (!response.success || !response.data) {
                throw new Error(response.message || "Error al obtener el producto");
            }
            return response.data;
        },
        enabled: !!productId,
        retry: 1,
    });
}
