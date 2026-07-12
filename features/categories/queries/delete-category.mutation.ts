/**
 * @fileoverview Hook de TanStack Query para eliminar una categoría.
 * @module features/categories/queries/delete-category
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryAction } from "../actions";
import { categoryListQueryKey } from "./category-detail.query";
import { toast } from "sonner";

export function useDeleteCategoryMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryId: string) => deleteCategoryAction(categoryId),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            queryClient.invalidateQueries({ queryKey: categoryListQueryKey });
            toast.success("Categoría eliminada exitosamente");
        },
        onError: () => toast.error("Error inesperado"),
    });
}
