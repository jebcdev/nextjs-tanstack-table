"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/generated/prisma/client";
import { toast } from "sonner";
import {
    Eye,
    PencilSimple,
    Trash,
    ArrowsDownUp,
    ArrowUp,
    ArrowDown,
} from "@phosphor-icons/react";

const buildDescription = (product: Product) =>
    `Nombre: ${product.name} · Slug: ${product.slug} · Precio: $${Number(product.price).toFixed(2)}`;

const handleView = (product: Product) => {
    toast.info(`Detalle de "${product.name}"`, {
        duration: 4000,
        description: buildDescription(product),
        action: {
            label: "Entendido",
            onClick: () => toast.dismiss(),
        },
    });
};

const handleEdit = (product: Product) => {
    toast.info(`Editar "${product.name}"`, {
        duration: 4000,
        description: buildDescription(product),
        action: {
            label: "Entendido",
            onClick: () => toast.dismiss(),
        },
    });
};

const handleDelete = (product: Product) => {
    toast.info(`Eliminar "${product.name}"`, {
        duration: 4000,
        description: buildDescription(product),
        action: {
            label: "Entendido",
            onClick: () => toast.dismiss(),
        },
    });
};

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

export const productsColumns: ColumnDef<Product>[] = [
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
