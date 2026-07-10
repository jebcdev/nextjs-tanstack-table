/**
 * @fileoverview Header de navegación principal.
 *   Muestra el logo de la marca y enlaces a las rutas principales.
 *   Detecta la ruta activa para resaltar el botón correspondiente.
 * @module features/shared/components/ui/main-header
 *
 * @description
 * - Sticky header con backdrop blur
 * - Navegación: Inicio, Categorías, Productos
 * - Botón activo usa variant "secondary", inactivo usa "ghost"
 * - Usa usePathname() para determinar la ruta activa
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export const MainHeader = () => {
  const pathname = usePathname();

  // Rutas de navegación — configuración centralizada para escalabilidad
  const navigationRoutes = [
    { name: "Inicio", path: "/" },
    { name: "Categorías", path: "/categories" },
    { name: "Productos", path: "/products" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Logo / Marca */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-sans font-bold text-xl tracking-tight text-foreground hover:opacity-90 transition-opacity">
            JEBC<span className="text-primary">-DeV</span>
          </Link>
        </div>

        {/* Navegación Principal — compara pathname para active state */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navigationRoutes.map((route) => {
            const isActive = pathname === route.path;
            
            return (
              <Button
                key={route.path}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "font-sans text-sm font-medium transition-colors",
                  isActive 
                    ? "text-foreground font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Link href={route.path}>
                  {route.name}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};