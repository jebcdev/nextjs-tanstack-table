import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAction } from "../actions";
import {
    productListQueryKey,
    productDetailQueryKey,
} from "./product-detail.query";
import { type ProductFormData } from "../validations";
import { toast } from "sonner";

interface UpdateProductParams {
    productId: string;
    data: ProductFormData;
}

export function useUpdateProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, data }: UpdateProductParams) =>
            updateProductAction(productId, data),
        onSuccess: (response, { productId }) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            queryClient.invalidateQueries({ queryKey: productListQueryKey });
            queryClient.invalidateQueries({
                queryKey: productDetailQueryKey(productId),
            });
            toast.success("Producto actualizado exitosamente");
        },
        onError: () => toast.error("Error inesperado"),
    });
}
