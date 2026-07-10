/**
 * @fileoverview Página de Categorías.
 *   Renderiza la tabla de categorías con metadata dinámica para SEO.
 * @module app/categories/page
 *
 * @description
 * - Server Component que genera metadata y renderiza CategoriesTable
 * - La tabla (Client Component) maneja toda la lógica de datos
 * - Sigue el patrón de composición Server + Client Components
 */

import type { Metadata } from "next";

import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { CategoriesTable } from "@/features/categories/components/table";

/**
 * Genera metadata específica para la página de categorías.
 * Se ejecuta en el servidor antes del renderizado.
 */
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

/**
 * Página de categorías — componente servidor que renderiza la tabla.
 * CategoriesTable es un Client Component que maneja fetching, estado y UI.
 */
export default function CategoriesPage() {
    return (
        <>
            <div className="p-4">
            <CategoriesTable />
            </div>
        </>
    );
}
