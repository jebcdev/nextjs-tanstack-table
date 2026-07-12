/**
 * @fileoverview Formulario reutilizable para crear/editar categorías.
 * @module features/categories/components/category-form
 */

"use client";

import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    categorySchema,
    type CategoryFormData,
} from "../validations";
import {
    Button,
    Input,
    Label,
    SingleFormError,
} from "@/features/shared/components/ui";
import { cn } from "@/lib/utils";

interface CategoryFormProps {
    defaultValues?: Partial<CategoryFormData>;
    onSubmit: (data: CategoryFormData) => void;
    isPending?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    cancelHref?: string;
    className?: string;
}

export function CategoryForm({
    defaultValues,
    onSubmit,
    isPending,
    submitLabel = "Guardar",
    cancelLabel = "Cancelar",
    cancelHref,
    className,
}: CategoryFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema as any) as unknown as Resolver<CategoryFormData>,
        defaultValues: {
            name: "",
            description: null,
            isActive: true,
            ...defaultValues,
        },
        mode: "onBlur",
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("space-y-6", className)}
        >
            <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    placeholder="Nombre de la categoría"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                />
                <SingleFormError message={errors.name?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <textarea
                    id="description"
                    placeholder="Descripción de la categoría (opcional)"
                    rows={3}
                    className={cn(
                        "h-20 w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 resize-y",
                        errors.description && "border-destructive"
                    )}
                    aria-invalid={!!errors.description}
                    {...register("description")}
                />
                <SingleFormError message={errors.description?.message} />
            </div>

            <div className="flex items-center gap-2">
                <input
                    id="isActive"
                    type="checkbox"
                    className="size-4 accent-primary"
                    {...register("isActive")}
                />
                <Label htmlFor="isActive">Categoría activa</Label>
            </div>

            <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Guardando..." : submitLabel}
                </Button>

                {cancelHref && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push(cancelHref)}
                        disabled={isPending}
                    >
                        {cancelLabel}
                    </Button>
                )}
            </div>
        </form>
    );
}
