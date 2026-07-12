# Next.js TanStack Query + Table

Proyecto de aprendizaje integrando **TanStack Query** para manejo de estado asíncrono y **TanStack Table** para tablas de datos con filtrado, ordenamiento y paginación, sobre **Next.js 16** con **Prisma ORM** + **PostgreSQL**.

[GitHub — jebcdev/nextjs-tanstack-table](https://github.com/jebcdev/nextjs-tanstack-table)

---

## Stack

| Capa        | Tecnología                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16 (App Router)             |
| Queries     | TanStack Query v5                   |
| Tablas      | TanStack Table v8                   |
| ORM         | Prisma 7 + PostgreSQL               |
| Formularios | React Hook Form + Zod               |
| Estilos     | Tailwind CSS v4 + tw-animate-css    |
| UI          | Radix UI + shadcn/ui                |
| Notificaciones | shadcn/ui Toast (sonner)         |
| Paquetería  | pnpm                                |

---

## Requisitos

- **Node.js** >= 20
- **pnpm** >= 9 (`npm i -g pnpm`)
- **PostgreSQL** 14+ (recomiendo [Neon](https://neon.tech) para desarrollo serverless)

---

## Clonar e instalar

```bash
git clone https://github.com/jebcdev/nextjs-tanstack-table.git
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
NEXT_PUBLIC_ENVIRONMENT="development"
DATABASE_URL="postgresql://user:password@localhost:5432/nextjs-tanstack-table?schema=public"
```

---

## Base de datos

```bash
pnpm seed
```

> El script `seed` del `package.json` hace todo automáticamente: borra migraciones previas, regenera el cliente, resetea la BD, aplica migraciones y ejecuta el seeder.

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
├── categories/
│   ├── page.tsx                  → Listado con tabla
│   ├── new/page.tsx              → Crear categoría
│   └── [categoryId]/
│       ├── page.tsx              → Detalle
│       └── edit/page.tsx         → Editar
├── products/
│   ├── page.tsx                  → Listado con tabla
│   ├── new/page.tsx              → Crear producto
│   └── [productId]/
│       ├── page.tsx              → Detalle
│       └── edit/page.tsx         → Editar
├── page.tsx                      → Home
├── layout.tsx                    → Layout root
└── globals.css                   → Estilos globales + tema dark

features/
├── categories/                   → Feature completa
│   ├── actions/                  → Server Actions (CRUD)
│   ├── components/
│   │   ├── table/                → Tabla + columnas (TanStack Table)
│   │   ├── categories-header.tsx → Header con Volver/Nuevo
│   │   ├── category-form.tsx     → Formulario (React Hook Form + Zod)
│   │   ├── category-detail.tsx   → Vista detalle
│   │   ├── create-category-form-container.tsx  → Wrapper mutación
│   │   └── update-category-form-container.tsx  → Wrapper mutación
│   ├── queries/                  → TanStack Query hooks
│   └── validations/              → Schemas Zod
├── products/                     → Feature completa (misma estructura)
└── shared/                       → Componentes compartidos
    ├── components/ui/            → shadcn/ui (Button, Input, Dialog, etc.)
    ├── types/                    → IGeneralResponse<T>
    └── ...

prisma/
├── schema.prisma                 → Modelos Category y Product (1:N)
└── migrations/                   → Migraciones SQL
```

---

## Features implementadas

### CRUD de Categorías
- **Validaciones** Zod: name (3-50 chars), description (max 200), isActive
- **Server Actions**: create, update, get-by-id, delete (con verificación de productos asociados)
- **TanStack Query**: queries con staleTime 10min, mutations con invalidación de cache y toasts
- **Tabla**: TanStack Table con ordenamiento, filtro global con debounce, paginación
- **Formulario**: React Hook Form + zodResolver, validación en blur
- **Detalle**: nombre, slug, badge activo/inactivo, descripción, metadatos

### CRUD de Productos
- **Validaciones** Zod: name (3-50 chars), description (max 200), price (positivo, 2 decimales), categoryId
- **Server Actions**: create, update, get-by-id (incluye categoría), delete
- **TanStack Query**: queries con staleTime 10min, mutations con invalidación de cache y toasts
- **Tabla**: TanStack Table con columna de precio formateado en COP
- **Formulario**: selector de categorías (Radix UI Select), precio con step 0.01
- **Detalle**: nombre, slug, precio COP, badge de categoría, metadatos

### Navegación
- **CategoriesHeader / ProductsHeader**: componente reutilizable con:
  - Botón "Volver" (icono ArrowLeft) → /categories o /products
  - Botón "Nuevo" (icono Plus) → /new
- Headers usados en todas las páginas (listado, nuevo, detalle, editar)

### Acciones en tablas
- **Ver** → Navega al detalle (`/[id]`)
- **Editar** → Navega al formulario de edición (`/[id]/edit`)
- **Eliminar** → Diálogo de confirmación (`ConfirmDeleteDialog`) con mutación TanStack Query

### Mutaciones con feedback
- Los formularios usan **contenedores Client Component** que delegan en los hooks de mutación
- Cada mutación exitosa: invalida el cache de TanStack Query + muestra toast success
- Cada error: muestra toast error sin invalidar cache
- El diálogo de eliminar solo se cierra si la operación fue exitosa

---

## Patrón de respuesta unificado

Todas las Server Actions retornan `IGeneralResponse<T>`:

```typescript
type IGeneralResponse<T = undefined> =
  | { success: true;  error?: false; message: string; data: T      }
  | { success: false; error: true;   message: string; data?: never };
```

---

## Aprendizajes cubiertos

- [x] TanStack Query: `useQuery`, `staleTime`, `gcTime`, server actions como queryFn
- [x] TanStack Query: `useMutation`, invalidación de cache en éxito, toasts de feedback
- [x] TanStack Table: ordenamiento, filtro global con debounce, paginación
- [x] Prisma + PostgreSQL con Neon adapter
- [x] Server Actions con patrón response unificado (`IGeneralResponse`)
- [x] Zod: validación compartida cliente y servidor
- [x] React Hook Form + zodResolver
- [x] shadcn/ui: Button, Input, Label, Textarea, Select, Dialog, Badge, Toast
- [x] Radix UI: Select, Dialog, Slot (asChild)
- [x] SEO dinámico con metadatos async
- [x] Manejo de errores y estados vacíos
- [x] Navegación con headers reutilizables
- [x] Confirmación antes de eliminar con diálogo modal
- [x] Dark mode fijo con estética cyberpunk
