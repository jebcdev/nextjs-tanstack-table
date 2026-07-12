/**
 * @fileoverview Componente para visualizar el detalle de una categoría.
 * @module features/categories/components/category-detail
 */

"use client";

import Link from "next/link";
import { Button } from "@/features/shared/components/ui";
import { Category } from "@/lib/generated/prisma/browser";
import { cn } from "@/lib/utils";

interface CategoryDetailProps {
    category: Category;
    editHref?: string;
}

export function CategoryDetail({ category, editHref }: CategoryDetailProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">{category.name}</h2>
                    <span
                        className={cn(
                            "mt-1 inline-block rounded-none px-2 py-0.5 text-xs font-medium",
                            category.isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        )}
                    >
                        {category.isActive ? "Activa" : "Inactiva"}
                    </span>
                </div>

                {editHref && (
                    <Link href={editHref}>
                        <Button variant="outline" size="sm">
                            Editar
                        </Button>
                    </Link>
                )}
            </div>

            {category.description && (
                <div>
                    <h3 className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Descripción
                    </h3>
                    <p className="text-sm">{category.description}</p>
                </div>
            )}

            <div className="border-t border-border pt-4">
                <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Metadatos
                </h3>
                <dl className="space-y-1 text-sm">
                    <div className="flex gap-2">
                        <dt className="text-muted-foreground min-w-24">Creado:</dt>
                        <dd>
                            {new Intl.DateTimeFormat("es-ES", {
                                dateStyle: "long",
                                timeStyle: "short",
                            }).format(new Date(category.createdAt))}
                        </dd>
                    </div>
                    <div className="flex gap-2">
                        <dt className="text-muted-foreground min-w-24">
                            Actualizado:
                        </dt>
                        <dd>
                            {new Intl.DateTimeFormat("es-ES", {
                                dateStyle: "long",
                                timeStyle: "short",
                            }).format(new Date(category.updatedAt))}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
