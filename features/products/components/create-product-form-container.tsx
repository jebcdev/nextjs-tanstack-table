"use client";

import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "../queries";
import { ProductForm } from "./product-form";
import type { ProductFormData } from "../validations";

interface CreateProductFormContainerProps {
    categories: Array<{ id: string; name: string }>;
}

export function CreateProductFormContainer({
    categories,
}: CreateProductFormContainerProps) {
    const router = useRouter();
    const mutation = useCreateProductMutation();

    const handleSubmit = async (data: ProductFormData) => {
        const result = await mutation.mutateAsync(data);
        if (result.success) {
            router.push("/products");
        }
        return result;
    };

    return (
        <ProductForm
            categories={categories}
            onSubmit={handleSubmit}
            submitLabel="Crear producto"
            cancelHref="/products"
        />
    );
}
