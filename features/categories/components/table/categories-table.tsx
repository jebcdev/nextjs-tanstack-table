// features/categories/components/categories-table.tsx
"use client";

import { useEffect, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    SortingState,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { 
    MagnifyingGlass, 
    X, 
    CaretLeft, 
    CaretRight,
    CaretDoubleLeft,
    CaretDoubleRight 
} from "@phosphor-icons/react";
import { useCategoriesQuery } from "../../queries/get-all-categories.query";
import { categoriesColumns } from "./categories-columns";
import { Category } from "@/lib/generated/prisma/browser";

const EMPTY_CATEGORIES: Category[] = [];

// Filtro global custom: busca en TODOS los campos relevantes
const globalFilterFn = (
    row: { original: Category },
    _columnId: string,
    filterValue: string,
) => {
    const search = filterValue.toLowerCase();
    const c = row.original;
    const haystack = [
        c.name,
        c.slug,
        c.description ?? "",
        c.isActive ? "activo" : "inactivo",
        new Date(c.createdAt).toLocaleDateString("es-CO"),
    ]
        .join(" ")
        .toLowerCase();

    return haystack.includes(search);
};

export function CategoriesTable() {
    const { data, isLoading, isError, error } = useCategoriesQuery();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [searchInput, setSearchInput] = useState("");
    const [globalFilter, setGlobalFilter] = useState("");

    // Debounce: separa lo que el usuario escribe de lo que realmente
    // dispara el recálculo de filas en la tabla.
    useEffect(() => {
        const timeout = setTimeout(() => {
            setGlobalFilter(searchInput);
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    const table = useReactTable({
        data: data ?? EMPTY_CATEGORIES,
        columns: categoriesColumns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // Configuración de paginación
        initialState: {
            pagination: {
                pageSize: 10, // Registros por página
            },
        },
    });

    if (isError) {
        return (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                Error al cargar categorías: {error.message}
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {/* Barra de búsqueda */}
            <div className="relative max-w-sm">
                <MagnifyingGlass
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Buscar en todas las columnas..."
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-2 pl-9 pr-9 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />
                {searchInput && (
                    <button
                        type="button"
                        onClick={() => setSearchInput("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto rounded-lg border border-neutral-800">
                <table className="w-full text-sm">
                    <thead className="bg-neutral-900 sticky top-0">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-3 text-left whitespace-nowrap border-b border-neutral-800"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={categoriesColumns.length}
                                    className="px-4 py-8 text-center text-neutral-500"
                                >
                                    Cargando categorías...
                                </td>
                            </tr>
                        ) : table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={categoriesColumns.length}
                                    className="px-4 py-8 text-center text-neutral-500"
                                >
                                    No se encontraron categorías.
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-neutral-800/60 last:border-0 hover:bg-neutral-900/60 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-3">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between px-2">
                {/* Contador de resultados */}
                <p className="text-xs text-neutral-500">
                    Mostrando {table.getRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} categorías
                    {table.getFilteredRowModel().rows.length !== (data ?? EMPTY_CATEGORIES).length && 
                        ` (filtrados de ${(data ?? EMPTY_CATEGORIES).length})`
                    }
                </p>

                {/* Controles de paginación */}
                <div className="flex items-center gap-2">
                    {/* Selector de registros por página */}
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm text-neutral-100 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    >
                        {[5, 10, 20, 30, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize} por página
                            </option>
                        ))}
                    </select>

                    {/* Botones de navegación */}
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className="p-1.5 rounded-md hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-colors"
                            title="Primera página"
                        >
                            <CaretDoubleLeft size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-1.5 rounded-md hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-colors"
                            title="Página anterior"
                        >
                            <CaretLeft size={16} />
                        </button>

                        {/* Indicador de página actual */}
                        <span className="px-3 py-1 text-sm text-neutral-300 min-w-[80px] text-center">
                            Página {table.getState().pagination.pageIndex + 1} de{" "}
                            {table.getPageCount()}
                        </span>

                        <button
                            type="button"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-1.5 rounded-md hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-colors"
                            title="Página siguiente"
                        >
                            <CaretRight size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            className="p-1.5 rounded-md hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-colors"
                            title="Última página"
                        >
                            <CaretDoubleRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}