# Next.js TanStack Query + Table

Proyecto de aprendizaje integrando **TanStack Query** para manejo de estado asíncrono y **TanStack Table** para tablas de datos con filtrado, ordenamiento y paginación, sobre **Next.js 16** con **Prisma ORM** + **PostgreSQL**.

---

## Stack

| Capa        | Tecnología                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16 (App Router)             |
| Queries     | TanStack Query v5                   |
| Tablas      | TanStack Table v8                   |
| ORM         | Prisma 7 + PostgreSQL               |
| Estilos     | Tailwind CSS v4 + tw-animate-css    |
| UI          | Radix UI + shadcn                   |
| Paquetería  | pnpm                                |

---

## Requisitos

- **Node.js** >= 20
- **pnpm** >= 9 (`npm i -g pnpm`)
- **PostgreSQL** 14+ (recomiendo [Neon](https://neon.tech) para desarrollo serverless)

---

## Clonar e instalar

```bash
git clone <repo-url>
cd nextjs-tanstack-table

pnpm install
```

---

## Configurar variables de entorno

Copia el template y edita con tus credenciales:

```bash
cp .env.template .env
```

```env
# .env
NEXT_PUBLIC_ENVIRONMENT="development"
DATABASE_URL="postgresql://user:password@localhost:5432/nextjs-tanstack-table?schema=public"
```

Si usas **Neon**, la connection string la obtienes del dashboard de tu proyecto.

---

## Base de datos

### 1. Generar el cliente Prisma

```bash
pnpm dlx prisma generate
```

Esto genera el cliente en `lib/generated/prisma/`.

### 2. Correr migraciones

```bash
pnpm dlx prisma migrate dev --name init
```

Esto crea las tablas `categories` y `products` en tu base de datos.

### 3. Sembrar datos de prueba

```bash
pnpm seed
```

> El script `seed` del `package.json` hace todo automáticamente: borra migraciones previas, regenera el cliente, resetea la BD, aplica migraciones y ejecuta el seeder.

O si prefieres hacerlo paso a paso:

```bash
# 1. Generar cliente
pnpm dlx prisma generate

# 2. Resetear BD (borra datos + aplica migraciones)
pnpm dlx prisma migrate reset --force

# 3. Aplicar migraciones
pnpm dlx prisma migrate dev --name full_db

# 4. Ejecutar seeder
pnpm dlx tsx lib/db/seeders/index.ts
```

---

## Desarrollo

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Comandos útiles

| Comando       | Descripción                                  |
| ------------- | -------------------------------------------- |
| `pnpm dev`    | Inicia servidor de desarrollo                |
| `pnpm build`  | Construye para producción                    |
| `pnpm start`  | Sirve el build de producción                 |
| `pnpm lint`   | Ejecuta ESLint                               |
| `pnpm seed`   | Resetea BD + migraciones + seed de datos     |

---

## Estructura del proyecto

```
app/
├── categories/page.tsx      → Página de categorías (tabla)
├── products/page.tsx        → Página de productos (tabla)
├── page.tsx                 → Home cyberpunk neon
├── layout.tsx               → Layout root
├── globals.css              → Estilos globales + tema dark
└── ...

features/
├── categories/              → Feature categorías (actions, queries, components/table)
├── products/                → Feature productos (actions, queries, components/table)
└── shared/                  → Componentes compartidos (ui/, providers, types)

lib/
├── db/prismaDB.ts           → Conexión Prisma
├── db/seeders/              → Seeders de datos
├── generated/prisma/        → Cliente Prisma generado (no se版的)
└── ...

prisma/
├── schema.prisma            → Schema de datos
└── migrations/              → Migraciones SQL
```

---

## Aprendizajes cubiertos

- [x] TanStack Query: `useQuery`, `staleTime`, `gcTime`, server actions como queryFn
- [x] TanStack Table: ordenamiento, filtro global con debounce, paginación
- [x] Prisma + PostgreSQL con Neon adapter
- [x] Server Actions con patrón response unificado (`IGeneralResponse`)
- [x] shadcn/ui + Radix + Tailwind v4
- [x] SEO dinámico con metadatos async
- [x] Manejo de errores y estados vacíos
- [x] Dark mode fijo con estética cyberpunk
