import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prismaDB } from "@/lib/db/prismaDB";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { getProductByIdAction } from "@/features/products/actions";
import { ProductsHeader, UpdateProductFormContainer } from "@/features/products/components";
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

    const defaultValues: Partial<ProductFormData> = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        categoryId: product.categoryId,
    };

    return (
        <div className="container mx-auto max-w-4xl py-10 space-y-6">
            <ProductsHeader title="Editar Producto" showBack />
            <div className="rounded-none border border-border bg-card p-6">
                <UpdateProductFormContainer
                    productId={productId}
                    defaultValues={defaultValues}
                    categories={categories}
                />
            </div>
        </div>
    );
}
