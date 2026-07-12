import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { prismaDB } from "@/lib/db/prismaDB";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import {
    getProductByIdAction,
    updateProductAction,
} from "@/features/products/actions";
import { ProductForm } from "@/features/products/components";
import type { ProductFormData } from "@/features/products/validations";

interface EditProductPageProps {
    params: Promise<{ productId: string }>;
}

export async function generateMetadata({
    params,
}: EditProductPageProps): Promise<Metadata> {
    const { productId } = await params;
    const title = await generateAsyncTitle("Editar Producto");
    const description = await generateAsyncDescription(
        `Editando producto ${productId}`,
    );
    return { title, description };
}

export default async function EditProductPage({
    params,
}: EditProductPageProps) {
    const { productId } = await params;

    const response = await getProductByIdAction(productId);

    if (!response.success || !response.data) {
        notFound();
    }

    const product = response.data;
    const categories = await prismaDB.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
    });

    async function handleSubmit(data: ProductFormData) {
        "use server";
        const result = await updateProductAction(productId, data);
        if (result.success) {
            redirect(`/products/${productId}`);
        }
        return result;
    }

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <div className="rounded-none border border-border bg-card p-6">
                <h1 className="mb-6 text-lg font-semibold">Editar Producto</h1>
                <ProductForm
                    defaultValues={{
                        name: product.name,
                        description: product.description,
                        price: Number(product.price),
                        categoryId: product.categoryId,
                    }}
                    categories={categories}
                    onSubmit={handleSubmit}
                    submitLabel="Guardar cambios"
                    cancelHref={`/products/${productId}`}
                />
            </div>
        </div>
    );
}
