"use client";

import { useRouter } from "next/navigation";
import { useForm, useController, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    productSchema,
    type ProductFormData,
} from "../validations";
import {
    Button,
    Input,
    Label,
    SingleFormError,
} from "@/features/shared/components/ui";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/features/shared/components/ui/select";
import { cn } from "@/lib/utils";

interface ProductFormProps {
    defaultValues?: Partial<ProductFormData>;
    categories: Array<{ id: string; name: string }>;
    onSubmit: (data: ProductFormData) => void;
    isPending?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    cancelHref?: string;
    className?: string;
}

export function ProductForm({
    defaultValues,
    categories,
    onSubmit,
    isPending,
    submitLabel = "Guardar",
    cancelLabel = "Cancelar",
    cancelHref,
    className,
}: ProductFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema) as unknown as Resolver<ProductFormData>,
        defaultValues: {
            name: "",
            description: null,
            price: undefined as unknown as number,
            categoryId: "",
            ...defaultValues,
        },
        mode: "onBlur",
    });

    const { field: categoryField } = useController({
        name: "categoryId",
        control,
        rules: { required: true },
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
                    placeholder="Nombre del producto"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                />
                <SingleFormError message={errors.name?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <textarea
                    id="description"
                    placeholder="Descripción del producto (opcional)"
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

            <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("price", { valueAsNumber: true })}
                    aria-invalid={!!errors.price}
                />
                <SingleFormError message={errors.price?.message} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="categoryId">Categoría</Label>
                <Select
                    value={categoryField.value}
                    onValueChange={categoryField.onChange}
                >
                    <SelectTrigger
                        id="categoryId"
                        className="w-full"
                        aria-invalid={!!errors.categoryId}
                    >
                        <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <SingleFormError message={errors.categoryId?.message} />
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
