# Checklist de Integración - Productos

## 📋 Antes de Implementar
- [ ] Verificar que existe `features/products/` con estructura base
- [ ] Confirmar que `prismaDB` tiene el modelo `Product`
- [ ] Verificar que `IGeneralResponse` está definido
- [ ] Confirmar que `slugify` utility existe

## 📝 Implementación (Orden sugerido)

### Fase 1: Validaciones
- [ ] Crear `validations/product.schema.ts`
- [ ] Crear `validations/index.ts`

### Fase 2: Server Actions
- [ ] `actions/create-product.action.ts`
- [ ] `actions/update-product.action.ts`
- [ ] `actions/get-product-by-id.action.ts` (incluir `category` en respuesta)
- [ ] `actions/delete-product.action.ts`
- [ ] Actualizar `actions/index.ts` (agregar exports)

### Fase 3: Queries
- [ ] `queries/product-detail.query.ts`
- [ ] `queries/create-product.mutation.ts`
- [ ] `queries/update-product.mutation.ts`
- [ ] `queries/delete-product.mutation.ts`
- [ ] Actualizar `queries/index.ts`

### Fase 4: Componentes
- [ ] `components/product-form.tsx` (con selector de categorías)
- [ ] `components/product-detail.tsx`
- [ ] Actualizar `components/index.ts`

### Fase 5: Páginas
- [ ] `app/products/new/page.tsx`
- [ ] `app/products/[productId]/page.tsx`
- [ ] `app/products/[productId]/edit/page.tsx`

## 🔗 Dependencias
- ✅ `app/products/page.tsx` ya existe (tabla de productos)
- ✅ `features/products/actions/get-all-products.action.ts` ya existe
- ✅ `features/products/queries/get-all-products.query.ts` ya existe
- ✅ `features/products/components/table/` ya existe (table + columns)
- ✅ `features/categories/` existe (necesario para selector de categorías)
- ✅ `features/shared/components/ui/` tiene Button, Input, Label, SingleFormError
- [ ] Confirmar que existe un componente Select en `features/shared/components/ui/` (o crear adaptación con select nativo)

## 🚀 Post-Implementación
- [ ] Probar flujo completo: Crear → Listar → Editar → Ver → Eliminar
- [ ] Verificar revalidación de datos en tiempo real
- [ ] Probar manejo de errores (producto no encontrado, datos inválidos, categoría no existe)
- [ ] Verificar formateo correcto del precio (Decimal → Number → COP)
- [ ] Probar que slug se genera automáticamente al crear/editar
- [ ] Verificar responsive design
