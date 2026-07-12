# Queries - TanStack Query

## Objetivo
Implementar hooks de TanStack Query para operaciones de lectura y mutación.

## Archivos a Crear
- `features/categories/queries/category-detail.query.ts`
- `features/categories/queries/create-category.mutation.ts`
- `features/categories/queries/update-category.mutation.ts`
- `features/categories/queries/delete-category.mutation.ts`

## Query Keys
```typescript
// category-detail.query.ts
export const categoryDetailQueryKey = (categoryId: string) =>
    ["categories", "detail", categoryId] as const;
1. useCategoryDetailQuery
typescript
export function useCategoryDetailQuery(categoryId: string) {
    return useQuery({
        queryKey: categoryDetailQueryKey(categoryId),
        queryFn: async () => {
            const response = await getCategoryByIdAction(categoryId);
            if (!response.success || !response.data) {
                throw new Error(response.message || "Error al obtener la categoría");
            }
            return response.data;
        },
        enabled: !!categoryId,
        retry: 1,
    });
}
2. useCreateCategoryMutation
typescript
export function useCreateCategoryMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CategoryFormData) => createCategoryAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            queryClient.invalidateQueries({ queryKey: categoryListQueryKey });
            toast.success("Categoría creada exitosamente");
        },
        onError: () => toast.error("Error inesperado"),
    });
}
3. useUpdateCategoryMutation
Parámetros: { categoryId: string, data: CategoryFormData }
Invalidaciones: categoryListQueryKey y categoryDetailQueryKey(categoryId)

4. useDeleteCategoryMutation
Parámetros: categoryId: string
Invalidaciones: categoryListQueryKey

Actualizar Barril
Actualizar features/categories/queries/index.ts para exportar todos los hooks.