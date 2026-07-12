/**
 * @fileoverview Hook de TanStack Query para crear una categoría.
 * @module features/categories/queries/create-category
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryAction } from "../actions";
import { categoryListQueryKey } from "./category-detail.query";
import { type CategoryFormData } from "../validations";
import { toast } from "sonner";

export function useCreateCategoryMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CategoryFormData) => createCategoryAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            queryClient.invalidateQueries({ queryKey: categoryListQueryKey });
            toast.success("Categoría creada exitosamente");
        },
        onError: () => toast.error("Error inesperado"),
    });
}
