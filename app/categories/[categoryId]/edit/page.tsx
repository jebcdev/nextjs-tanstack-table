/**
 * @fileoverview Página para editar una categoría existente.
 * @module app/categories/[categoryId]/edit/page
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { getCategoryByIdAction } from "@/features/categories/actions";
import { CategoriesHeader, UpdateCategoryFormContainer } from "@/features/categories/components";

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

    return (
        <div className="container mx-auto max-w-4xl py-10 space-y-6">
            <CategoriesHeader title="Editar Categoría" showBack />
            <div className="rounded-none border border-border bg-card p-6">
                <UpdateCategoryFormContainer
                    categoryId={categoryId}
                    defaultValues={{
                        name: category.name,
                        description: category.description,
                        isActive: category.isActive,
                    }}
                />
            </div>
        </div>
    );
}
