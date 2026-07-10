/**
 * @fileoverview Componente de tabla para categorías con TanStack Table.
 *   Incluye búsqueda global con debounce, ordenamiento por columnas
 *   y paginación completa (primera/anterior/siguiente/última).
 * @module features/categories/components/table/categories-table
 *
 * @description
 * - Client Component con estado local para sorting, filtro y paginación
 * - Búsqueda global con debounce de 300ms
 * - Filtro custom que busca en todos los campos relevantes
 * - Maneja estados: carga, error, vacío, filtrado sin resultados
 * - Paginación configurable: 5, 10, 20, 30, 50 items por página
 */

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

/** Array vacío constante para evitar undefined en el data de la tabla */
const EMPTY_CATEGORIES: Category[] = [];

/**
 * Filtro global personalizado.
 * Busca el texto en TODOS los campos relevantes de la categoría:
 * name, slug, description, isActive (activo/inactivo), createdAt.
 *
 * @param row - Fila actual con datos originales
 * @param _columnId - ID de columna (no usado, filtro global)
 * @param filterValue - Texto de búsqueda
 * @returns true si alguna propiedad coincide con el texto de búsqueda
 */
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

    // Debounce de 300ms: separa la escritura del usuario del recálculo
    // de la tabla para evitar re-renderizados en cada tecla
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
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    // Estado de error: muestra un banner rojo con el mensaje de error
    if (isError) {
        return (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                Error al cargar categorías: {error.message}
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {/* Barra de búsqueda global con icono lupa y botón de limpiar */}
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
                {/* Botón para limpiar el input solo cuando hay texto */}
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

            {/* Contenedor de la tabla con scroll horizontal */}
            <div className="overflow-x-auto rounded-lg border border-neutral-800">
                <table className="w-full text-sm">
                    {/* Header sticky para que no se pierda al hacer scroll */}
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
                        {/* Estado: carga */}
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
                            /* Estado: sin datos (después de carga) */
                            <tr>
                                <td
                                    colSpan={categoriesColumns.length}
                                    className="px-4 py-8 text-center text-neutral-500"
                                >
                                    No se encontraron categorías.
                                </td>
                            </tr>
                        ) : (
                            /* Estado normal: filas de datos */
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

            {/* Barra de paginación inferior */}
            <div className="flex items-center justify-between px-2">
                {/* Contador de resultados con información de filtrado */}
                <p className="text-xs text-neutral-500">
                    Mostrando {table.getRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} categorías
                    {table.getFilteredRowModel().rows.length !== (data ?? EMPTY_CATEGORIES).length && 
                        ` (filtrados de ${(data ?? EMPTY_CATEGORIES).length})`
                    }
                </p>

                {/* Controles de paginación */}
                <div className="flex items-center gap-2">
                    {/* Selector de items por página */}
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

                    {/* Botones: primera ← anterior | indicador | siguiente → última */}
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

                        {/* Indicador: "Página X de Y" */}
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