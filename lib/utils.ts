/**
 * @fileoverview Función utilitaria cn() para combinar clases de Tailwind.
 *   Usa clsx para condicionales y tailwind-merge para resolver conflictos.
 * @module lib/utils
 *
 * @description
 * - clsx: permite clases condicionales (objetos, arrays, strings)
 * - tailwind-merge: resuelve conflictos entre clases (ej: "px-4 px-6" → "px-6")
 * - Función estándar en proyectos shadcn/ui
 *
 * @example
 * cn("px-4", isActive && "bg-blue-500", ["flex", "items-center"])
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
