"use client";

import { useRouter } from "next/navigation";
import { useUpdateCategoryMutation } from "../queries";
import { CategoryForm } from "./category-form";
import type { CategoryFormData } from "../validations";

interface UpdateCategoryFormContainerProps {
    categoryId: string;
    defaultValues: Partial<CategoryFormData>;
}

export function UpdateCategoryFormContainer({
    categoryId,
    defaultValues,
}: UpdateCategoryFormContainerProps) {
    const router = useRouter();
    const mutation = useUpdateCategoryMutation();

    const handleSubmit = async (data: CategoryFormData) => {
        const result = await mutation.mutateAsync({ categoryId, data });
        if (result.success) {
            router.push(`/categories/${categoryId}`);
        }
        return result;
    };

    return (
        <CategoryForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            submitLabel="Guardar cambios"
            cancelHref={`/categories/${categoryId}`}
        />
    );
}
