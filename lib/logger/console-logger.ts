/**
 * @fileoverview Logger condicional que solo emite en desarrollo.
 *   Usa console.error (stderr) y tiene fallback seguro por si
 *   los argumentos no son serializables.
 * @module lib/logger/console-logger
 *
 * @description
 * - Solo imprime si NEXT_PUBLIC_ENVIRONMENT === "development"
 * - No hace nada si no hay argumentos
 * - Doble try/catch como fallback contra errores de serialización
 *
 * @remarks
 * La variable NEXT_PUBLIC_ENVIRONMENT debería estandarizarse con NODE_ENV.
 * Actualmente no está definida en .env.template.
 */

export const consoleLogger = (...args: unknown[]): void => {
    // Solo loggea en entorno de desarrollo
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "development") {
        return;
    }
    if (args.length === 0) {
        return;
    }
    try {
        console.error(...args);
    } catch (_error) {
        // Fallback si algún argumento causa error al serializar
        try {
            console.error(
                "consoleLogger failed to log arguments:",
                args,
            );
        } catch (_fallbackError) {
            // Silencioso si también falla
        }
    }
};
