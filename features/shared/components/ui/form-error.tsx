/**
 * @fileoverview Componente para mostrar errores de formulario.
 *   Renderiza un mensaje de error estilizado o nada si no hay mensaje.
 * @module features/shared/components/ui/form-error
 *
 * @description
 * - Solo se renderiza si hay un mensaje de error
 * - Diseño minimalista con | mensaje *
 * - Animación pulse para llamar la atención
 */

"use client";

type Props = {
    /** Mensaje de error a mostrar. Si es undefined/null, no renderiza nada. */
    message?: string;
};

/**
 * SingleFormError — muestra un error de formulario.
 * @param {Props} props
 * @param {string} [props.message] - Mensaje de error
 * @returns {JSX.Element | null} Elemento span o null
 */
export const SingleFormError = ({ message }: Props) => {
    if (!message) return null;

    return (
        <span className="text-sm text-red-500 mt-1 block animate-pulse">
            | {message} *
        </span>
    );
};