# Checklist de Integración - Categorías

## 📋 Antes de Implementar
- [ ] Verificar que existe `features/categories/` con estructura base
- [ ] Confirmar que `prismaDB` tiene el modelo `Category`
- [ ] Verificar que `IGeneralResponse` está definido

## 📝 Implementación (Orden sugerido)

### Fase 1: Validaciones
- [ ] Crear `category.schema.ts`
- [ ] Exportar desde `validations/index.ts`

### Fase 2: Server Actions
- [ ] `create-category.action.ts`
- [ ] `update-category.action.ts`
- [ ] `get-category-by-id.action.ts`
- [ ] `delete-category.action.ts`
- [ ] Actualizar `actions/index.ts`

### Fase 3: Queries
- [ ] `category-detail.query.ts`
- [ ] `create-category.mutation.ts`
- [ ] `update-category.mutation.ts`
- [ ] `delete-category.mutation.ts`
- [ ] Actualizar `queries/index.ts`

### Fase 4: Componentes
- [ ] `category-form.tsx`
- [ ] `category-detail.tsx`
- [ ] Actualizar `components/index.ts`

### Fase 5: Páginas
- [ ] `categories/new/page.tsx`
- [ ] `categories/[categoryId]/page.tsx`
- [ ] `categories/[categoryId]/edit/page.tsx`

## 🔗 Dependencias
- ✅ `categories/list/page.tsx` ya existe (se actualizará con botones)
- ✅ `features/categories/queries/category-list.query.ts` ya existe

## 🚀 Post-Implementación
- [ ] Probar flujo completo: Crear → Listar → Editar → Ver → Eliminar
- [ ] Verificar revalidación de datos en tiempo real
- [ ] Probar manejo de errores (categoría no encontrada, datos inválidos)
- [ ] Verificar responsive design
