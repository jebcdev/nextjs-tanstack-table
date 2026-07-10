/**
 * @fileoverview Tipo unión discriminada para respuestas estandarizadas
 *   de Server Actions. Permite type narrowing: al verificar
 *   `result.success`, TypeScript sabe si `data` está disponible.
 * @module features/shared/types/general-response
 *
 * @description
 * - Caso éxito: { success: true, data: T, message: string }
 * - Caso error: { success: false, error: true, message: string }
 * - `data` es `never` en caso de error (no accesible)
 * - `error` es opcional en éxito (puede omitirse)
 *
 * @typeParam T - Tipo del data en caso de éxito (default: undefined)
 *
 * @example
 * type Response = IGeneralResponse<User[]>;
 * // Uso con type narrowing:
 * if (result.success) {
 *   result.data // TypeScript sabe que es User[]
 * }
 */

export type IGeneralResponse<T = undefined> =
  | { success: true;  error?: false; message: string; data: T      }
  | { success: false; error: true;   message: string; data?: never };