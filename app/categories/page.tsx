import type { Metadata } from "next";

import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { CategoriesTable } from "@/features/categories/components/table";

export async function generateMetadata(): Promise<Metadata> {
    const title = await generateAsyncTitle("Categorías");
    const description = await generateAsyncDescription(
        "Categorías de la aplicación",
    );
    return {
        title,
        description,
    };
}

export default function CategoriesPage() {
    return (
        <>
            <div className="p-4">
            <CategoriesTable />
            </div>
        </>
    );
}
