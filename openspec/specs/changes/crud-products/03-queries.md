# Queries - TanStack Query

## Objetivo
Implementar hooks de TanStack Query para mutaciones CRUD de productos.

## Archivos a Crear
- `features/products/queries/product-detail.query.ts`
- `features/products/queries/create-product.mutation.ts`
- `features/products/queries/update-product.mutation.ts`
- `features/products/queries/delete-product.mutation.ts`

## Archivos a Actualizar
- `features/products/queries/index.ts` (agregar exports)

## Query Keys

```typescript
// product-detail.query.ts
export const productListQueryKey = ["products"] as const;

export const productDetailQueryKey = (productId: string) =>
    ["products", "detail", productId] as const;
```

### 1. useProductDetailQuery
```typescript
export function useProductDetailQuery(productId: string) {
    return useQuery<Product>({
        queryKey: productDetailQueryKey(productId),
        queryFn: async () => {
            const response = await getProductByIdAction(productId);
            if (!response.success || !response.data) {
                throw new Error(response.message || "Error al obtener el producto");
            }
            return response.data;
        },
        enabled: !!productId,
        retry: 1,
    });
}
```

### 2. useCreateProductMutation
- **mutationFn:** `(data: ProductFormData) => createProductAction(data)`
- **Invalidaciones:** `productListQueryKey`
- **Toast:** éxito "Producto creado exitosamente", error con mensaje del servidor

### 3. useUpdateProductMutation
- **Parámetros:** `{ productId: string, data: ProductFormData }`
- **Invalidaciones:** `productListQueryKey` y `productDetailQueryKey(productId)`

### 4. useDeleteProductMutation
- **mutationFn:** `(productId: string) => deleteProductAction(productId)`
- **Invalidaciones:** `productListQueryKey`

## Barril (`queries/index.ts`)
```typescript
export {
    PRODUCTS_QUERY_KEY,
    useProductsQuery,
} from "./get-all-products.query";

export {
    productListQueryKey,
    productDetailQueryKey,
    useProductDetailQuery,
} from "./product-detail.query";

export { useCreateProductMutation } from "./create-product.mutation";
export { useUpdateProductMutation } from "./update-product.mutation";
export { useDeleteProductMutation } from "./delete-product.mutation";
```
