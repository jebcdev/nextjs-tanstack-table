import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAction } from "../actions";
import { productListQueryKey } from "./product-detail.query";
import { toast } from "sonner";

export function useDeleteProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => deleteProductAction(productId),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            queryClient.invalidateQueries({ queryKey: productListQueryKey });
            toast.success("Producto eliminado exitosamente");
        },
        onError: () => toast.error("Error inesperado"),
    });
}
