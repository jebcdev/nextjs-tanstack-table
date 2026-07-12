/**
 * @fileoverview Hook de TanStack Query para actualizar una categoría.
 * @module features/categories/queries/update-category
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryAction } from "../actions";
import {
    categoryListQueryKey,
    categoryDetailQueryKey,
} from "./category-detail.query";
import { type CategoryFormData } from "../validations";
import { toast } from "sonner";

interface UpdateCategoryParams {
    categoryId: string;
    data: CategoryFormData;
}

export function useUpdateCategoryMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ categoryId, data }: UpdateCategoryParams) =>
            updateCategoryAction(categoryId, data),
        onSuccess: (response, { categoryId }) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            queryClient.invalidateQueries({ queryKey: categoryListQueryKey });
            queryClient.invalidateQueries({
                queryKey: categoryDetailQueryKey(categoryId),
            });
            toast.success("Categoría actualizada exitosamente");
        },
        onError: () => toast.error("Error inesperado"),
    });
}
