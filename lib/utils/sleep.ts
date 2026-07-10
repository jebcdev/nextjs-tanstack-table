/**
 * @fileoverview Función sleep que pausa la ejecución por un tiempo dado.
 *   Útil para simular latencia, delays en desarrollo, o throttling.
 * @module lib/utils/sleep
 *
 * @param ms - Milisegundos a esperar
 * @returns Promise<void> que se resuelve después del tiempo especificado
 *
 * @example
 * await sleep(2000); // Espera 2 segundos
 */

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}