import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import { getProductByIdAction } from "@/features/products/actions";
import { ProductDetail } from "@/features/products/components";

interface ProductDetailPageProps {
    params: Promise<{ productId: string }>;
}

export async function generateMetadata({
    params,
}: ProductDetailPageProps): Promise<Metadata> {
    const { productId } = await params;
    const title = await generateAsyncTitle("Detalle de Producto");
    const description = await generateAsyncDescription(
        `Detalle del producto ${productId}`,
    );
    return { title, description };
}

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    const { productId } = await params;

    const response = await getProductByIdAction(productId);

    if (!response.success || !response.data) {
        notFound();
    }

    const product = response.data;

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <div className="rounded-none border border-border bg-card p-6">
                <ProductDetail
                    product={product}
                    editHref={`/products/${productId}/edit`}
                />
            </div>
        </div>
    );
}
