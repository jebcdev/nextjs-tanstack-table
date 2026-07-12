/**
 * @fileoverview Definición de columnas para la tabla de productos.
 *   Columnas: Acciones, Nombre, Slug, Descripción, Precio, Creado.
 *   Incluye header ordenable y formato de precio en COP.
 * @module features/products/components/table/products-columns
 *
 * @description
 * - Estructura similar a categories-columns pero con columna de precio
 * - Precio formateado en pesos colombianos (es-CO)
 * - Sin columna de estado (Product no tiene isActive)
 */

"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/generated/prisma/browser";
import { useDeleteProductMutation } from "../../queries";
import { ConfirmDeleteDialog } from "@/features/shared/components/ui/confirm-delete-dialog";
import {
    Eye,
    PencilSimple,
    Trash,
    ArrowsDownUp,
    ArrowUp,
    ArrowDown,
} from "@phosphor-icons/react";

/**
 * Componente de header ordenable para columnas de la tabla.
 * Muestra icono de orden ascendente, descendente o neutral.
 */
function SortableHeader({
    label,
    column,
}: {
    label: string;
    column: import("@tanstack/react-table").Column<Product, unknown>;
}) {
    const sorted = column.getIsSorted();

    const handleSort = () => {
        column.toggleSorting(sorted === "asc");
    };

    return (
        <button
            type="button"
            onClick={handleSort}
            className="flex items-center gap-1.5 font-semibold text-neutral-300 hover:text-white transition-colors"
        >
            {label}
            {sorted === "asc" && <ArrowUp size={14} weight="bold" />}
            {sorted === "desc" && <ArrowDown size={14} weight="bold" />}
            {!sorted && (
                <ArrowsDownUp size={14} className="opacity-40" weight="bold" />
            )}
        </button>
    );
}

function ActionsCell({ product }: { product: Product }) {
    const router = useRouter();
    const deleteMutation = useDeleteProductMutation();

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() => router.push(`/products/${product.id}`)}
                className="p-1.5 rounded-md hover:bg-neutral-700 text-blue-400 hover:text-blue-300 transition-colors"
                title="Ver detalle"
            >
                <Eye size={16} weight="bold" />
            </button>
            <button
                type="button"
                onClick={() => router.push(`/products/${product.id}/edit`)}
                className="p-1.5 rounded-md hover:bg-neutral-700 text-amber-400 hover:text-amber-300 transition-colors"
                title="Editar"
            >
                <PencilSimple size={16} weight="bold" />
            </button>
            <ConfirmDeleteDialog
                title="Eliminar producto"
                description={`¿Estás seguro de eliminar "${product.name}"? Esta acción no se puede deshacer.`}
                trigger={
                    <button
                        type="button"
                        className="p-1.5 rounded-md hover:bg-neutral-700 text-red-400 hover:text-red-300 transition-colors"
                        title="Eliminar"
                    >
                        <Trash size={16} weight="bold" />
                    </button>
                }
                onConfirm={() => deleteMutation.mutateAsync(product.id)}
            />
        </div>
    );
}

export const productsColumns: ColumnDef<Product>[] = [
    {
        id: "actions",
        header: "Acciones",
        enableSorting: false,
        cell: ({ row }) => <ActionsCell product={row.original} />,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <SortableHeader label="Nombre" column={column} />,
        cell: ({ row }) => (
            <span className="font-medium text-neutral-100">
                {row.original.name}
            </span>
        ),
    },
    {
        accessorKey: "slug",
        header: ({ column }) => <SortableHeader label="Slug" column={column} />,
        cell: ({ row }) => (
            <code className="text-xs text-neutral-400">{row.original.slug}</code>
        ),
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <SortableHeader label="Descripción" column={column} />
        ),
        cell: ({ row }) => (
            <span className="text-neutral-400">
                {row.original.description ?? "—"}
            </span>
        ),
    },
    {
        // Precio formateado en COP con 2 decimales
        accessorKey: "price",
        header: ({ column }) => <SortableHeader label="Precio" column={column} />,
        cell: ({ row }) => (
            <span className="font-mono text-neutral-100">
                ${Number(row.original.price).toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <SortableHeader label="Creado" column={column} />
        ),
        cell: ({ row }) =>
            new Date(row.original.createdAt).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
    },
];
