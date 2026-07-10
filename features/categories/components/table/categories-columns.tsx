// features/categories/components/categories-columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/lib/generated/prisma/browser";
import { toast } from "sonner";
import {
    Eye,
    PencilSimple,
    Trash,
    ArrowsDownUp,
    ArrowUp,
    ArrowDown,
} from "@phosphor-icons/react";

// Helper para armar el description del toast con la data de la fila clickeada
const buildDescription = (category: Category) =>
    `Nombre: ${category.name} · Slug: ${category.slug} · Activo: ${
        category.isActive ? "Sí" : "No"
    }`;

const handleView = (category: Category) => {
    toast.info(`Detalle de "${category.name}"`, {
        duration: 4000,
        description: buildDescription(category),
        action: {
            label: "Entendido",
            onClick: () => toast.dismiss(),
        },
    });
};

const handleEdit = (category: Category) => {
    toast.info(`Editar "${category.name}"`, {
        duration: 4000,
        description: buildDescription(category),
        action: {
            label: "Entendido",
            onClick: () => toast.dismiss(),
        },
    });
};

const handleDelete = (category: Category) => {
    toast.info(`Eliminar "${category.name}"`, {
        duration: 4000,
        description: buildDescription(category),
        action: {
            label: "Entendido",
            onClick: () => toast.dismiss(),
        },
    });
};

// Header reutilizable con indicador de orden (asc/desc/sin orden)
function SortableHeader({
    label,
    column,
}: {
    label: string;
    column: import("@tanstack/react-table").Column<Category, unknown>;
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

export const categoriesColumns: ColumnDef<Category>[] = [
    {
        id: "actions",
        header: "Acciones",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => handleView(row.original)}
                    className="p-1.5 rounded-md hover:bg-neutral-700 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Ver detalle"
                >
                    <Eye size={16} weight="bold" />
                </button>
                <button
                    type="button"
                    onClick={() => handleEdit(row.original)}
                    className="p-1.5 rounded-md hover:bg-neutral-700 text-amber-400 hover:text-amber-300 transition-colors"
                    title="Editar"
                >
                    <PencilSimple size={16} weight="bold" />
                </button>
                <button
                    type="button"
                    onClick={() => handleDelete(row.original)}
                    className="p-1.5 rounded-md hover:bg-neutral-700 text-red-400 hover:text-red-300 transition-colors"
                    title="Eliminar"
                >
                    <Trash size={16} weight="bold" />
                </button>
            </div>
        ),
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