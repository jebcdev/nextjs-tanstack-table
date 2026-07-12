/**
 * @fileoverview Función slugify para convertir texto a slugs URL-friendly.
 *   Soporta caracteres especiales del español (tildes, ñ, etc.)
 *   y símbolos comunes (&, @, %, +).
 * @module lib/utils/slugify
 *
 * @description
 * - Mapa de transliteración para caracteres acentuados y especiales
 * - Normalización Unicode NFD para eliminar diacríticos
 * - Limpieza de caracteres no alfanuméricos
 * - Reemplazo de espacios por guiones
 * - Elimina guiones múltiples e iniciales/finales
 *
 * @remarks
 * Se usa en las Server Actions de categorías para generar slugs automáticos
 * a partir del nombre durante creación y edición.
 */

const CHAR_MAP: Record<string, string> = {
    á: "a",
    à: "a",
    â: "a",
    ä: "a",
    ã: "a",
    å: "a",
    æ: "ae",
    é: "e",
    è: "e",
    ê: "e",
    ë: "e",
    í: "i",
    ì: "i",
    î: "i",
    ï: "i",
    ó: "o",
    ò: "o",
    ô: "o",
    ö: "o",
    õ: "o",
    ø: "o",
    ú: "u",
    ù: "u",
    û: "u",
    ü: "u",
    ñ: "n",
    ç: "c",
    ß: "ss",
    "&": "and",
    "@": "at",
    "%": "percent",
    "+": "plus",
};

/**
 * Convierte texto a slug URL-safe.
 *
 * @param text - Texto a convertir
 * @returns Slug en minúsculas, guiones como separadores
 *
 * @example
 * slugify("¡Hola Mundo!") // "hola-mundo"
 * slugify("Teléfono & Café") // "telefono-and-cafe"
 */
export function slugify(text: string): string {
    if (!text || !text.trim()) return "";

    return text
        .trim()
        .toLowerCase()
        // Transliteración: á→a, ñ→n, &→and, etc.
        .replace(/./g, (c) => CHAR_MAP[c] ?? c)
        // Eliminar acentos residuales (descomposición NFD)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // Eliminar caracteres no permitidos
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        // Eliminar guiones al inicio y final
        .replace(/^-|-$/g, "");
}
