"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { Button } from "@/features/shared/components/ui";
import { cn } from "@/lib/utils";

interface CategoriesHeaderProps {
    title: string;
    showBack?: boolean;
    showNew?: boolean;
    className?: string;
}

export function CategoriesHeader({
    title,
    showBack,
    showNew,
    className,
}: CategoriesHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <div className="flex items-center gap-3">
                {showBack && (
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/categories">
                            <ArrowLeft size={16} />
                            Volver
                        </Link>
                    </Button>
                )}
                <h1 className="text-lg font-semibold">{title}</h1>
            </div>
            {showNew && (
                <Button asChild>
                    <Link href="/categories/new">
                        <Plus size={16} />
                        Nueva Categoría
                    </Link>
                </Button>
            )}
        </div>
    );
}
