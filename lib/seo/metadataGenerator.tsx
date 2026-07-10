/**
 * @fileoverview Constantes y helpers para generación de metadatos SEO.
 *   Proporciona funciones sync y async para title y description
 *   consistentes en todas las páginas.
 * @module lib/seo/metadataGenerator
 *
 * @description
 * - APP_NAME y APP_DESCRIPTION constantes globales
 * - Funciones sync (generate*) y async (generateAsync*) disponibles
 * - Las versiones async son necesarias para generateMetadata de Next.js
 *
 * @remarks
 * Las funciones async no realizan operaciones asíncronas reales.
 * Podrían simplificarse a solo versiones sync y convertirse
 * donde sea necesario.
 */

export const APP_NAME = "NextJS Tanstack Query|Table";
export const APP_DESCRIPTION =
    "NextJS Tanstack Query|Table Probando el funcionamiento y por supuesto ApReNdIeNdO!.";

/**
 * Genera título con formato: "Título | APP_NAME" o solo APP_NAME.
 * @param title - Título específico de la página (opcional)
 * @returns String formateado
 */
const generateTitle = (title?: string) => {
    return title ? `${title} | ${APP_NAME}` : APP_NAME;
};

/**
 * Genera descripción con fallback a APP_DESCRIPTION.
 * @param description - Descripción específica (opcional)
 * @returns String descriptivo
 */
const generateDescription = (description?: string) => {
    return description || APP_DESCRIPTION;
};

/**
 * Versión async de generateTitle para usar en generateMetadata.
 */
const generateAsyncTitle = async (
    title?: string,
): Promise<string> => {
    return title ? `${title} | ${APP_NAME}` : APP_NAME;
};

/**
 * Versión async de generateDescription para usar en generateMetadata.
 */
const generateAsyncDescription = async (
    description?: string,
): Promise<string> => {
    return description || APP_DESCRIPTION;
};

export {
    generateTitle,
    generateDescription,
    generateAsyncTitle,
    generateAsyncDescription,
};
