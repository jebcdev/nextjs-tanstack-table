/**
 * @fileoverview Barrel export para los queries de categorías.
 * @module features/categories/queries
 */

export {
    CATEGORIES_QUERY_KEY,
    useCategoriesQuery,
} from "./get-all-categories.query";

export {
    categoryListQueryKey,
    categoryDetailQueryKey,
    useCategoryDetailQuery,
} from "./category-detail.query";

export { useCreateCategoryMutation } from "./create-category.mutation";
export { useUpdateCategoryMutation } from "./update-category.mutation";
export { useDeleteCategoryMutation } from "./delete-category.mutation";
