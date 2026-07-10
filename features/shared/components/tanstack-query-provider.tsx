/**
 * @fileoverview Provider de TanStack Query para toda la aplicación.
 *   Configura el QueryClient con opciones globales y activa
 *   React Query Devtools en desarrollo.
 * @module features/shared/components/tanstack-query-provider
 *
 * @description
 * - Crea QueryClient con refetchOnWindowFocus: false y retry: false
 * - Cada query específica puede sobrescribir estas opciones
 * - ReactQueryDevtools se renderiza solo en desarrollo
 */

"use client";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // No recargar datos al cambiar de pestaña
            refetchOnWindowFocus: false,
            // No reintentar por defecto (cada query define su propio retry)
            retry: false,
        },
    },
});

/**
 * Proveedor global de TanStack Query.
 * Envuelve la aplicación para que todos los hooks useQuery funcionen.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Provider con Devtools
 */
export default function TanStackQueryProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Devtools visibles con Ctrl+Shift+K en desarrollo */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
