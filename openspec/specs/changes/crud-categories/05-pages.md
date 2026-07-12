# Páginas - Next.js App Router

## Objetivo
Implementar las páginas para CRUD de categorías.

## Rutas a Crear

### 1. Nueva Categoría
**Ruta:** `app/(dashboard)/categories/new/page.tsx`
**Tipo:** Server Component
**Acción:** `createCategoryAction`
**Redirección:** `/categories` en éxito

### 2. Editar Categoría
**Ruta:** `app/(dashboard)/categories/[categoryId]/edit/page.tsx`
**Tipo:** Server Component con params
**Acción:** `updateCategoryAction`
**Redirección:** `/categories/[categoryId]` en éxito

### 3. Detalle Categoría
**Ruta:** `app/(dashboard)/categories/[categoryId]/page.tsx`
**Tipo:** Server Component con params
**Fetch:** `getCategoryByIdAction`
**Not Found:** Si no existe la categoría

## Estructura de cada página
```typescript
// Ejemplo: new/page.tsx
export default async function NewCategoryPage() {
    async function handleSubmit(data: CategoryFormData) {
        "use server";
        const result = await createCategoryAction(data);
        if (result.success) {
            redirect("/categories");
        }
        return result;
    }

    return (
        <div className="container max-w-4xl mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Nueva Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                    <CategoryForm
                        onSubmit={handleSubmit}
                        submitLabel="Crear categoría"
                        onCancel={() => redirect("/categories")}
                    />
                </CardContent>
            </Card>
        </div>
    );
}