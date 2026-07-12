/**
 * @fileoverview Página de Productos.
 *   Renderiza la tabla de productos con metadata dinámica para SEO.
 * @module app/products/page
 *
 * @description
 * - Server Component que genera metadata y renderiza ProductsTable
 * - Análogo a categories/page.tsx pero con productos
 * - Sigue el patrón de composición Server + Client Components
 */

import type { Metadata } from "next";

import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { ProductsHeader } from "@/features/products/components";
import { ProductsTable } from "@/features/products/components/table";

/**
 * Genera metadata específica para la página de productos.
 * Se ejecuta en el servidor antes del renderizado.
 */
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

/**
 * Página de productos — componente servidor que renderiza la tabla.
 * ProductsTable es un Client Component que maneja fetching, estado y UI.
 */
export default function ProductsPage() {
    return (
        <div className="p-4 space-y-4">
            <ProductsHeader title="Productos" showNew />
            <ProductsTable />
        </div>
    );
}
