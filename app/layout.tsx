/**
 * @fileoverview Layout raíz de la aplicación Next.js.
 *   Define la estructura HTML base, fuentes globales, proveedores
 *   (TanStack Query, Sonner Toaster) y el header de navegación.
 * @module app/layout
 *
 * @description
 * - Propósito: Layout global que envuelve todas las páginas
 * - Funcionalidades: Carga de fuentes, metadata global, provider tree
 * - Dependencias: TanStack Query, Sonner, shadcn/ui
 * - Patrones: Composición de providers, Server Component con metadata dinámica
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { Toaster } from "sonner";
import { TanStackQueryProvider } from "@/features/shared/components";
import { MainHeader } from "@/features/shared/components/ui";

// Fuente monoespaciada JetBrains Mono para código y headings
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

// Fuente principal Geist Sans (interfaz)
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

// Fuente Geist Mono (alternativa mono)
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

/**
 * Genera metadata global para SEO.
 * Se ejecuta en el servidor antes de renderizar la página.
 */
export async function generateMetadata(): Promise<Metadata> {
    const title = await generateAsyncTitle();
    const description = await generateAsyncDescription();
    return {
        title,
        description,
    };
}

/**
 * Componente RootLayout — estructura base de todas las páginas.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la página activa
 * @returns {JSX.Element} HTML completo con providers y header
 *
 * @description
 * El orden de providers es importante:
 * 1. Toaster (notificaciones) está fuera del QueryProvider
 * 2. TanStackQueryProvider envuelve header + contenido
 * 3. MainHeader es hijo del provider para poder usar hooks si es necesario
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            // Tema oscuro forzado + clases de fuentes
            className={cn(
                "dark h-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-mono",
                jetbrainsMono.variable,
            )}
        >
            <body className="min-h-full flex flex-col">
                {/* Toaster global de sonner — configurado en modo oscuro */}
                <Toaster
                    duration={3000}
                    position="top-right"
                    richColors
                    closeButton
                    theme="dark"
                />
                <TanStackQueryProvider>
                    <MainHeader />
                    {children}
                </TanStackQueryProvider>
            </body>
        </html>
    );
}
