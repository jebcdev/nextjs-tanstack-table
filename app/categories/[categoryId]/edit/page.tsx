/**
 * @fileoverview Página para editar una categoría existente.
 * @module app/categories/[categoryId]/edit/page
 */

import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { getCategoryByIdAction, updateCategoryAction } from "@/features/categories/actions";
import { CategoryForm } from "@/features/categories/components";
import type { CategoryFormData } from "@/features/categories/validations";

interface EditCategoryPageProps {
    params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({
    params,
}: EditCategoryPageProps): Promise<Metadata> {
    const { categoryId } = await params;
    const title = await generateAsyncTitle("Editar Categoría");
    const description = await generateAsyncDescription(
        `Editando categoría ${categoryId}`,
    );
    return { title, description };
}

export default async function EditCategoryPage({
    params,
}: EditCategoryPageProps) {
    const { categoryId } = await params;

    const response = await getCategoryByIdAction(categoryId);

    if (!response.success || !response.data) {
        notFound();
    }

    const category = response.data;

    async function handleSubmit(data: CategoryFormData) {
        "use server";
        const result = await updateCategoryAction(categoryId, data);
        if (result.success) {
            redirect(`/categories/${categoryId}`);
        }
        return result;
    }

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <div className="rounded-none border border-border bg-card p-6">
                <h1 className="mb-6 text-lg font-semibold">Editar Categoría</h1>
                <CategoryForm
                    defaultValues={{
                        name: category.name,
                        description: category.description,
                        isActive: category.isActive,
                    }}
                    onSubmit={handleSubmit}
                    submitLabel="Guardar cambios"
                    cancelHref={`/categories/${categoryId}`}
                />
            </div>
        </div>
    );
}
