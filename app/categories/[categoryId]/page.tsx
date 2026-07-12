/**
 * @fileoverview Página de detalle de una categoría.
 * @module app/categories/[categoryId]/page
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { getCategoryByIdAction } from "@/features/categories/actions";
import { CategoryDetail } from "@/features/categories/components";

interface CategoryDetailPageProps {
    params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({
    params,
}: CategoryDetailPageProps): Promise<Metadata> {
    const { categoryId } = await params;
    const title = await generateAsyncTitle("Detalle de Categoría");
    const description = await generateAsyncDescription(
        `Detalle de la categoría ${categoryId}`,
    );
    return { title, description };
}

export default async function CategoryDetailPage({
    params,
}: CategoryDetailPageProps) {
    const { categoryId } = await params;

    const response = await getCategoryByIdAction(categoryId);

    if (!response.success || !response.data) {
        notFound();
    }

    const category = response.data;

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <div className="rounded-none border border-border bg-card p-6">
                <CategoryDetail
                    category={category}
                    editHref={`/categories/${categoryId}/edit`}
                />
            </div>
        </div>
    );
}
