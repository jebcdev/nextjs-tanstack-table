"use client";

import { useRouter } from "next/navigation";
import { useCreateCategoryMutation } from "../queries";
import { CategoryForm } from "./category-form";
import type { CategoryFormData } from "../validations";

export function CreateCategoryFormContainer() {
    const router = useRouter();
    const mutation = useCreateCategoryMutation();

    const handleSubmit = async (data: CategoryFormData) => {
        const result = await mutation.mutateAsync(data);
        if (result.success) {
            router.push("/categories");
        }
        return result;
    };

    return (
        <CategoryForm
            onSubmit={handleSubmit}
            submitLabel="Crear categoría"
            cancelHref="/categories"
        />
    );
}
