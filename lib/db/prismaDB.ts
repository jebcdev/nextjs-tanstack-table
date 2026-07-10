/**
 * @fileoverview Configuración e inicialización del cliente Prisma.
 *   Usa @prisma/adapter-pg para conexión directa a PostgreSQL
 *   con el driver nativo de Node.js.
 * @module lib/db/prismaDB
 *
 * @description
 * - Conexión a PostgreSQL usando adapter-pg (driver nativo)
 * - La URL de conexión viene de DATABASE_URL en variables de entorno
 * - El cliente generado está en lib/generated/prisma/
 *
 * @see prisma/schema.prisma Para ver la definición de modelos
 */

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

// Adaptador PostgreSQL nativo — mejor performance que el pooler estándar
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

export { prismaDB };
