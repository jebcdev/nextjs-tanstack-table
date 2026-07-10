import type { Metadata } from "next";

import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { ProductsTable } from "@/features/products/components/table";

export async function generateMetadata(): Promise<Metadata> {
    const title = await generateAsyncTitle("Productos");
    const description = await generateAsyncDescription(
        "Productos de la aplicación",
    );
    return {
        title,
        description,
    };
}

export default function ProductsPage() {
    return (
        <>
            <div className="p-4">
            <ProductsTable />
            </div>
        </>
    );
}
