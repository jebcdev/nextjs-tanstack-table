/**
 * @fileoverview Página para crear una nueva categoría.
 * @module app/categories/new/page
 */

import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { createCategoryAction } from "@/features/categories/actions";
import { CategoryForm } from "@/features/categories/components";
import type { CategoryFormData } from "@/features/categories/validations";

export async function generateMetadata(): Promise<Metadata> {
    const title = await generateAsyncTitle("Nueva Categoría");
    const description = await generateAsyncDescription(
        "Crear una nueva categoría",
    );
    return { title, description };
}

export default function NewCategoryPage() {
    async function handleSubmit(data: CategoryFormData) {
        "use server";
        const result = await createCategoryAction(data);
        if (result.success) {
            redirect("/categories");
        }
        return result;
    }

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <div className="rounded-none border border-border bg-card p-6">
                <h1 className="mb-6 text-lg font-semibold">Nueva Categoría</h1>
                <CategoryForm
                    onSubmit={handleSubmit}
                    submitLabel="Crear categoría"
                    cancelHref="/categories"
                />
            </div>
        </div>
    );
}
