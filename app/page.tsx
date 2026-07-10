/**
 * @fileoverview Página de inicio con temática cyberpunk/Matrix.
 *   Muestra un canvas con efecto Matrix rain, animación de glitch,
 *   y tarjetas de navegación a las secciones principales.
 * @module app/page
 *
 * @description
 * - Propósito: Landing page visual impactante como puerta de entrada
 * - Funcionalidades: Matrix rain (canvas), glitch text, navegación
 * - Dependencias: Phosphor Icons, Next.js Link
 * - Patrones: Client Component con múltiples efectos visuales
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

// Rutas de navegación disponibles desde la landing
const NAV_ITEMS = [
  { href: "/categories", label: "Categorías", desc: "Explorar y gestionar categorías de productos" },
  { href: "/products", label: "Productos", desc: "Catálogo completo con filtros y paginación" },
];

export default function HomePage() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "TanStack Query + TanStack Table · Data Driven · SSR";

  // Efecto de máquina de escribir en el subtítulo
  useEffect(() => {
    document.title = "Inicio | NextJS Tanstack Query|Table";
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Efecto Matrix rain en canvas — renderiza katakana y dígitos
  useEffect(() => {
    const canvas = document.getElementById("rain-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajusta tamaño del canvas al viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const columns = Math.floor(canvas.width / 14);
    const drops: number[] = Array(columns).fill(1);
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

    // Dibuja una frame de la lluvia de caracteres
    const draw = () => {
      ctx.fillStyle = "rgba(10, 0, 21, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = "13px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 60);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#0a0015]">
      <style>{`
        @keyframes glitch {
          0%, 100% { text-shadow: 3px 0 #00ff41, -3px 0 #b800ff; }
          20% { text-shadow: -3px 0 #00ff41, 3px 0 #b800ff; }
          40% { text-shadow: 3px 0 #b800ff, -3px 0 #00ff41; }
          60% { text-shadow: -3px 0 #b800ff, 3px 0 #00ff41; }
          80% { text-shadow: 2px 0 #00ff41, -2px 0 #b800ff; }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: #b800ff; box-shadow: 0 0 15px rgba(184,0,255,0.2), inset 0 0 15px rgba(184,0,255,0.05); }
          50% { border-color: #00ff41; box-shadow: 0 0 25px rgba(0,255,65,0.15), inset 0 0 25px rgba(0,255,65,0.05); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <canvas id="rain-canvas" className="absolute inset-0 opacity-[0.12] pointer-events-none z-0" />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,0,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,0,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-[0.015]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,1) 2px, rgba(0,255,65,1) 4px)",
        }}
      />

      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[#b800ff] opacity-[0.08] blur-[120px] pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#00ff41] opacity-[0.08] blur-[120px] pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse shadow-[0_0_6px_#00ff41]" />
          <span className="text-[10px] tracking-[0.3em] text-[#00ff41]/60 uppercase font-mono">
            SYSTEM ONLINE
          </span>
        </div>
        <div className="absolute top-8 right-8">
          <span className="text-[10px] tracking-[0.3em] text-[#b800ff]/60 uppercase font-mono">
            v0.1.0
          </span>
        </div>
        <div className="absolute bottom-8 left-8 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-[#00ff41]"
              style={{ animation: `blink 1.5s ${i * 0.3}s infinite` }}
            />
          ))}
        </div>
        <div className="absolute bottom-8 right-8">
          <span className="text-[10px] tracking-[0.2em] text-[#00ff41]/40 font-mono">
            NEXT·TANSTACK
          </span>
        </div>

        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold font-mono tracking-tight mb-4"
            style={{ animation: "glitch 4s infinite" }}
          >
            <span className="text-[#b800ff]">JEBC</span>
            <span className="text-[#00ff41]">-DeV</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#b800ff] to-transparent" />
            <span className="text-[#00ff41]/30 text-[10px]">◆</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent" />
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#00ff41]/70 h-5">
            <span>{displayText}</span>
            <span
              className="inline-block w-[2px] h-[14px] bg-[#00ff41] ml-1 align-middle"
              style={{ animation: "blink 1s infinite" }}
            />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative p-6 bg-[#0d001f]/80 backdrop-blur border transition-all duration-500"
              style={{ animation: "borderPulse 3s infinite" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#00ff41";
                el.style.boxShadow =
                  "0 0 30px rgba(0,255,65,0.25), inset 0 0 30px rgba(0,255,65,0.1)";
                el.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "";
                el.style.boxShadow = "";
                el.style.transform = "";
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.25em] text-[#b800ff]/60 uppercase font-mono">
                  ACCESS
                </span>
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="text-[#00ff41] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                />
              </div>
              <h3 className="text-base sm:text-lg font-mono font-bold text-white mb-1">
                {item.label}
              </h3>
              <p className="text-[11px] text-gray-500 font-mono leading-relaxed">
                {item.desc}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#b800ff] via-[#00ff41] to-[#b800ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {[
            { label: "QUERY", value: "TanStack Query" },
            { label: "TABLE", value: "TanStack Table" },
            { label: "FRAMEWORK", value: "Next.js 16" },
            { label: "DB", value: "PostgreSQL" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-[9px] tracking-[0.35em] text-[#b800ff]/50 uppercase font-mono">
                {stat.label}
              </span>
              <span className="text-xs text-[#00ff41]/70 font-mono">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
