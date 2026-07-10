/**
 * @fileoverview Punto de entrada del seeder de base de datos.
 *   Ejecuta seedCategoriesAndProducts() y maneja errores.
 * @module lib/db/seeders/index
 *
 * @description
 * - Script ejecutable con tsx: `pnpm tsx lib/db/seeders/index.ts`
 * - También se ejecuta via script de npm: `pnpm seed`
 *
 * @remarks
 * El script "seed" en package.json limpia migraciones, regenera
 * Prisma client, fuerza reset y luego ejecuta este seeder.
 */

"use server";

import { seedCategoriesAndProducts } from "./categories-products.seeder";

const main = async () => {
    console.log("🌱 Starting seed...");

    await seedCategoriesAndProducts();

    console.log("✅ Seed completed!");
};

main().catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
});
