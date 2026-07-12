import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductAction } from "../actions";
import { productListQueryKey } from "./product-detail.query";
import { type ProductFormData } from "../validations";
import { toast } from "sonner";

export function useCreateProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ProductFormData) => createProductAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            queryClient.invalidateQueries({ queryKey: productListQueryKey });
            toast.success("Producto creado exitosamente");
        },
        onError: () => toast.error("Error inesperado"),
    });
}
