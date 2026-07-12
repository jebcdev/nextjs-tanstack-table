/**
 * @fileoverview Definición de columnas para la tabla de categorías.
 *   Cada columna define header, acceso a datos, renderizado y
 *   ordenamiento. Incluye columna de acciones (Ver, Editar, Eliminar).
 * @module features/categories/components/table/categories-columns
 *
 * @description
 * - Columnas: Acciones, Nombre, Slug, Descripción, Estado, Creado
 * - Header ordenable con indicadores visuales (asc/desc/neutral)
 * - Acciones actualmente son placeholders con toasts informativos
 */

"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/lib/generated/prisma/browser";
import { useDeleteCategoryMutation } from "../../queries";
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
 *
 * @param {Object} props
 * @param {string} props.label - Texto del header
 * @param {Column<Category, unknown>} props.column - Columna de TanStack Table
 */
function SortableHeader({
    label,
    column,
}: {
    label: string;
    column: import("@tanstack/react-table").Column<Category, unknown>;
}) {
    const sorted = column.getIsSorted();

    const handleSort = () => {
        // toggleSorting(true) ordena desc si está asc, o viceversa
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

function ActionsCell({ category }: { category: Category }) {
    const router = useRouter();
    const deleteMutation = useDeleteCategoryMutation();

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() => router.push(`/categories/${category.id}`)}
                className="p-1.5 rounded-md hover:bg-neutral-700 text-blue-400 hover:text-blue-300 transition-colors"
                title="Ver detalle"
            >
                <Eye size={16} weight="bold" />
            </button>
            <button
                type="button"
                onClick={() => router.push(`/categories/${category.id}/edit`)}
                className="p-1.5 rounded-md hover:bg-neutral-700 text-amber-400 hover:text-amber-300 transition-colors"
                title="Editar"
            >
                <PencilSimple size={16} weight="bold" />
            </button>
            <ConfirmDeleteDialog
                title="Eliminar categoría"
                description={`¿Estás seguro de eliminar "${category.name}"? Esta acción no se puede deshacer.`}
                trigger={
                    <button
                        type="button"
                        className="p-1.5 rounded-md hover:bg-neutral-700 text-red-400 hover:text-red-300 transition-colors"
                        title="Eliminar"
                    >
                        <Trash size={16} weight="bold" />
                    </button>
                }
                onConfirm={() => deleteMutation.mutateAsync(category.id)}
            />
        </div>
    );
}

export const categoriesColumns: ColumnDef<Category>[] = [
    {
        id: "actions",
        header: "Acciones",
        enableSorting: false,
        cell: ({ row }) => <ActionsCell category={row.original} />,
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
        accessorKey: "isActive",
        header: ({ column }) => <SortableHeader label="Estado" column={column} />,
        cell: ({ row }) => (
            <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    row.original.isActive
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                }`}
            >
                {row.original.isActive ? "Activo" : "Inactivo"}
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