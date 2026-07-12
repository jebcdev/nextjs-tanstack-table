"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { Button } from "@/features/shared/components/ui";
import { cn } from "@/lib/utils";

interface ProductsHeaderProps {
    title: string;
    showBack?: boolean;
    showNew?: boolean;
    className?: string;
}

export function ProductsHeader({
    title,
    showBack,
    showNew,
    className,
}: ProductsHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <div className="flex items-center gap-3">
                {showBack && (
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/products">
                            <ArrowLeft size={16} />
                            Volver
                        </Link>
                    </Button>
                )}
                <h1 className="text-lg font-semibold">{title}</h1>
            </div>
            {showNew && (
                <Button asChild>
                    <Link href="/products/new">
                        <Plus size={16} />
                        Nuevo Producto
                    </Link>
                </Button>
            )}
        </div>
    );
}
