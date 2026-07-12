import type { Metadata } from "next";
import { prismaDB } from "@/lib/db/prismaDB";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { ProductsHeader, CreateProductFormContainer } from "@/features/products/components";

export async function generateMetadata(): Promise<Metadata> {
    const title = await generateAsyncTitle("Nuevo Producto");
    const description = await generateAsyncDescription(
        "Crear un nuevo producto",
    );
    return { title, description };
}

export default async function NewProductPage() {
    const categories = await prismaDB.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
    });

    return (
        <div className="container mx-auto max-w-4xl py-10 space-y-6">
            <ProductsHeader title="Nuevo Producto" showBack />
            <div className="rounded-none border border-border bg-card p-6">
                <CreateProductFormContainer categories={categories} />
            </div>
        </div>
    );
}
