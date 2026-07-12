"use client";

import { useRouter } from "next/navigation";
import { useUpdateProductMutation } from "../queries";
import { ProductForm } from "./product-form";
import type { ProductFormData } from "../validations";

interface UpdateProductFormContainerProps {
    productId: string;
    defaultValues: Partial<ProductFormData>;
    categories: Array<{ id: string; name: string }>;
}

export function UpdateProductFormContainer({
    productId,
    defaultValues,
    categories,
}: UpdateProductFormContainerProps) {
    const router = useRouter();
    const mutation = useUpdateProductMutation();

    const handleSubmit = async (data: ProductFormData) => {
        const result = await mutation.mutateAsync({ productId, data });
        if (result.success) {
            router.push(`/products/${productId}`);
        }
        return result;
    };

    return (
        <ProductForm
            defaultValues={defaultValues}
            categories={categories}
            onSubmit={handleSubmit}
            submitLabel="Guardar cambios"
            cancelHref={`/products/${productId}`}
        />
    );
}
