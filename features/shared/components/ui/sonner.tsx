/**
 * @fileoverview Wrapper personalizado de Sonner Toaster.
 *   Configura iconos de Phosphor, tema dinámico (next-themes)
 *   y estilos consistentes con las variables CSS del proyecto.
 * @module features/shared/components/ui/sonner
 *
 * @description
 * - Usa next-themes para sincronizar el tema con el sistema
 * - Reemplaza iconos default de sonner por Phosphor Icons
 * - Usa variables CSS del proyecto para estilos consistentes
 *
 * @remarks
 * Actualmente no se usa en layout.tsx — se importa Toaster directo de sonner.
 * Pendiente decidir cuál wrapper usar.
 */

"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Iconos personalizados de Phosphor para cada tipo de toast
      icons={{
        success: (
          <CheckCircleIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <WarningIcon className="size-4" />
        ),
        error: (
          <XCircleIcon className="size-4" />
        ),
        loading: (
          <SpinnerIcon className="size-4 animate-spin" />
        ),
      }}
      // Estilos vinculados a las variables CSS del theme global
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
