"use client";

import Link from "next/link";
import { Button } from "@/features/shared/components/ui";
import { Badge } from "@/features/shared/components/ui/badge";
import { Product } from "@/lib/generated/prisma/browser";

interface ProductDetailProps {
    product: Product & { category?: { name: string } };
    editHref?: string;
}

export function ProductDetail({ product, editHref }: ProductDetailProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <code className="mt-0.5 block text-xs text-neutral-500">
                        {product.slug}
                    </code>
                </div>

                {editHref && (
                    <Link href={editHref}>
                        <Button variant="outline" size="sm">
                            Editar
                        </Button>
                    </Link>
                )}
            </div>

            <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-semibold">
                    ${Number(product.price).toLocaleString("es-CO", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>

                {product.category && (
                    <Badge variant="secondary">{product.category.name}</Badge>
                )}
            </div>

            {product.description && (
                <div>
                    <h3 className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Descripción
                    </h3>
                    <p className="text-sm">{product.description}</p>
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
                            }).format(new Date(product.createdAt))}
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
                            }).format(new Date(product.updatedAt))}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
