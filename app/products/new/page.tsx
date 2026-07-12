import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { prismaDB } from "@/lib/db/prismaDB";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { createProductAction } from "@/features/products/actions";
import { ProductForm } from "@/features/products/components";
import type { ProductFormData } from "@/features/products/validations";

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

    async function handleSubmit(data: ProductFormData) {
        "use server";
        const result = await createProductAction(data);
        if (result.success) {
            redirect("/products");
        }
        return result;
    }

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <div className="rounded-none border border-border bg-card p-6">
                <h1 className="mb-6 text-lg font-semibold">Nuevo Producto</h1>
                <ProductForm
                    categories={categories}
                    onSubmit={handleSubmit}
                    submitLabel="Crear producto"
                    cancelHref="/products"
                />
            </div>
        </div>
    );
}
