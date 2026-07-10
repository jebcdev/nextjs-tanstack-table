/**
 * @fileoverview Componente de carga (suspense fallback).
 *   Barras animadas + texto pulsante para indicar carga de página.
 * @module app/loading
 *
 * @description
 * - Se muestra automáticamente cuando Next.js está cargando una ruta
 * - Props personalizables para mensaje y clases
 * - Diseño minimalista con barras verticales animadas
 */

"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
    /** Texto a mostrar junto a las barras animadas */
    message?: string;
    /** Clases adicionales para el contenedor */
    className?: string;
}

/**
 * Loading — componente de carga con barras animadas.
 * @param {LoadingProps} props
 * @param {string} [props.message="Cargando"] - Mensaje de carga
 * @param {string} [props.className] - Clases adicionales
 */
export default function Loading({
    message = "Cargando",
    className,
}: LoadingProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-6 py-20 w-full",
                className,
            )}
        >
            {/* 5 barras animadas con delay progresivo para efecto de onda */}
            <div className="flex items-end gap-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                    <span
                        key={i}
                        className="w-0.5 bg-emerald-400 rounded-full animate-loading-bar"
                        style={{ animationDelay: `${i * 0.12}s` }}
                    />
                ))}
            </div>

            {/* Texto con animación pulse */}
            <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500 animate-pulse">
                {message}
                <span className="animate-ellipsis" />
            </p>
        </div>
    );
}