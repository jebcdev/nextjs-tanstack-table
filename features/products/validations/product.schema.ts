import { z } from "zod";

export const productSchema = z.object({
    name: z.string()
        .min(1, "El nombre es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre no puede exceder 50 caracteres"),

    description: z.string()
        .max(200, "La descripción no puede exceder 200 caracteres")
        .optional()
        .nullable(),

    price: z.number()
        .positive("El precio debe ser mayor a 0")
        .multipleOf(0.01, "El precio debe tener máximo 2 decimales"),

    categoryId: z.string()
        .min(1, "La categoría es requerida"),
});

export type ProductFormData = z.input<typeof productSchema>;
