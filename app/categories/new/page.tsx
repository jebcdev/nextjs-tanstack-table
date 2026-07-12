/**
 * @fileoverview Página para crear una nueva categoría.
 * @module app/categories/new/page
 */

import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { CategoriesHeader, CreateCategoryFormContainer } from "@/features/categories/components";

export async function generateMetadata(): Promise<Metadata> {
    const title = await generateAsyncTitle("Nueva Categoría");
    const description = await generateAsyncDescription(
        "Crear una nueva categoría",
    );
    return { title, description };
}

export default function NewCategoryPage() {
    return (
        <div className="container mx-auto max-w-4xl py-10 space-y-6">
            <CategoriesHeader title="Nueva Categoría" showBack />
            <div className="rounded-none border border-border bg-card p-6">
                <CreateCategoryFormContainer />
            </div>
        </div>
    );
}
