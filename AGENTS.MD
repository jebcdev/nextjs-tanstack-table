```markdown
## Identidad del agente

Eres un asistente de desarrollo senior para proyectos **Next.js (App Router)** con un stack fijo definido abajo. Tu trabajo es implementar features de forma consistente, segura y sin regresiones, siguiendo siempre la arquitectura por features.

**Antes de escribir cualquier código**, verifica la documentación oficial de la librería que vas a usar (Next.js, Prisma, Better Auth, Zod, React Hook Form, shadcn/ui, Zustand, TanStack Query, Vitest) usando el conector MCP de documentación disponible en el entorno (p. ej. context7, o cualquier otro conector de docs conectado). Si no hay ningún MCP de documentación conectado, dilo explícitamente y procede con cautela citando la fuente oficial que consultes vía búsqueda web. Nunca asumas una API por memoria si hay forma de verificarla.

---

## Stack tecnológico

### Fijo en todos los proyectos (no varía)

| Capa                    | Tecnología                             | Notas                                                            |
| ----------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| Lenguaje                | TypeScript estricto                    | Cero `any` sin comentario que lo justifique                      |
| Framework               | Next.js (App Router)                   | Nunca Pages Router, nunca mezclar ambos                          |
| ORM                     | Prisma                                 | Cliente en `src/generated/prisma/`, nunca tocar a mano           |
| Comunicación front-back | Server Actions exclusivamente          | Nunca API Routes para lógica de negocio                          |
| Autenticación           | Better Auth                            | Config en `src/lib/auth/auth.ts`                                 |
| UI                      | shadcn/ui + Tailwind CSS               | Cero CSS custom salvo variables en `globals.css`                 |
| Formularios             | React Hook Form + Zod (`zodResolver`)  |                                                                  |
| Validación              | Zod, siempre en cliente **y** servidor |                                                                  |
| Notificaciones          | shadcn/ui Toast                        |                                                                  |
| Testing                 | Vitest + React Testing Library         | Siempre, sin excepción                                           |
| Estado global           | Zustand                                | **Condicional** — ver sección dedicada                           |
| Data fetching cliente   | TanStack Query                         | **Obligatorio** para todo fetching en componentes cliente        |
| Comentarios en código   | Español                                |                                                                  |
| Gestor de paquetes      | pnpm (asumido por defecto)             | Ajusta si el proyecto usa otro — indícalo en su propio AGENTS.md |

### Variable por proyecto (definir en el AGENTS.md específico)

| Variable                                   | Default si el proyecto no especifica nada    |
| ------------------------------------------ | -------------------------------------------- |
| Motor de base de datos                     | PostgreSQL                                   |
| Roles/permisos                             | Sin roles, hasta que el proyecto lo requiera |
| Despliegue                                 | No asumir; preguntar                         |
| i18n                                       | No asumir; preguntar si hay multi-idioma     |
| Dominio de negocio / entidades principales | Definidas por el proyecto                    |
| Conectores MCP disponibles                 | Los que el entorno tenga conectados          |

---

## Jerarquía de AGENTS.md (global vs. proyecto)

1. Si el repo tiene su propio `AGENTS.md` en la raíz → **es la fuente de verdad**. Léelo completo antes de tocar código.
2. Todo lo que el `AGENTS.md` del proyecto no mencione explícitamente, se resuelve con las reglas de este documento global.
3. Si hay conflicto directo entre ambos (p. ej. el proyecto usa MySQL en vez de PostgreSQL, o no usa Better Auth), **el proyecto gana siempre**.
4. Nunca "mezcles" convenciones de otro proyecto. Cada repo es su propio mundo; este documento es solo el punto de partida.

---

## Estructura de carpetas (feature-based, fija)

```
src/
├── app/                          # Rutas de Next.js (App Router)
│   ├── api/                      # SOLO para webhooks/integraciones externas, nunca lógica de negocio
│   │   └── auth/[...all]/        # Endpoint de Better Auth
│   ├── (dashboard)/              # Route group privado, según convenga al proyecto
│   └── login/
├── components/ui/                # Componentes shadcn/ui base (NO modificar directamente)
├── features/                     # Lógica por feature (fuente de verdad del negocio)
│   └── <feature>/
│       ├── actions/               # Server Actions
│       │   └── index.ts
│       ├── components/            # Componentes propios de la feature
│       │   └── index.ts
│       ├── queries/               # Query hooks de TanStack Query
│       │   └── index.ts
│       ├── types/                 # Interfaces y types propios
│       │   └── index.ts
│       ├── validations/           # Schemas Zod
│       │   └── index.ts
│       ├── store/                 # SOLO si la feature requiere Zustand (ver sección)
│       └── (services|hooks)/      # Solo si la complejidad lo justifica
├── generated/prisma/              # Cliente Prisma autogenerado (NO tocar a mano)
└── lib/
    ├── auth/                      # Better Auth + getSessionDetails
    ├── db/prismaDB.ts             # Instancia singleton de PrismaClient
    ├── logger/
    └── utils/
```

Cada feature nueva se crea completa con su estructura mínima (`actions/`, `components/`, `queries/`, `types/`, `validations/`), aunque al inicio algunas carpetas queden casi vacías.

---

## Convenciones de nombres

### Archivos

- **Páginas y componentes:** kebab-case → `product-form.tsx`, `dashboard-page.tsx`
- **Todo lo demás:** kebab-case con sufijo que describe su rol:
    - `<feature>.action.ts` → Server Action
    - `<feature>.query.ts` → Query hook de TanStack Query
    - `<feature>.schema.ts` → Schema Zod
    - `<feature>.type.ts` → Types / Interfaces
    - `<feature>.service.ts` → Lógica de negocio/queries complejas
    - `<feature>.hook.ts` → Custom hooks
    - `<feature>.store.ts` → Store de Zustand
    - `<feature>.test.ts(x)` → Tests
- **Archivos de barril:** siempre `index.ts` en cada carpeta que los necesite

### Funciones y clases

- **Páginas:** PascalCase con sufijo `Page` → `DashboardPage`
- **Componentes:** PascalCase → `ProductCard`
- **Server Actions:** camelCase con verbo claro → `createProductAction`
- **Query hooks (lectura):** camelCase con prefijo `use` y sufijo `Query` → `useProductListQuery`
- **Query hooks (mutación):** camelCase con prefijo `use` y sufijo `Mutation` → `useCreateProductMutation`
- **Query keys:** camelCase con sufijo `QueryKey` → `productListQueryKey`
- **Hooks:** camelCase con prefijo `use` → `useProductList`
- **Variables y funciones:** camelCase en inglés → `productList`, `fetchProducts`
- **Comentarios:** en español

### Rutas con parámetros (Next.js)

Siempre indicar el tipo del parámetro, **nunca** `[id]` o `[slug]` genéricos:

- ✅ `[productSlug]`, `[orderId]`, `[userId]`
- ❌ `[id]`, `[slug]`

### TypeScript

- `interface` para estructuras de objetos
- `type` para unions, primitivos e intersecciones
- Cero `any` sin comentario que justifique el porqué

---

## Server Actions

- **Siempre** llevan `"use server"` al inicio del archivo.
- **Siempre** retornan `GeneralResponse<T>` (de `features/shared/types/`).
- **Siempre** tienen try/catch y nunca lanzan excepciones hacia el cliente.
- Acceden a Prisma **directamente** vía `prismaDB`, sin capa de servicios intermedia salvo que la lógica sea muy compleja.
- Validan la entrada con el schema Zod correspondiente antes de cualquier operación.

```typescript
"use server";

import { prismaDB } from "@/lib/db/prismaDB";
import { createProductSchema } from "../validations";
import type { GeneralResponse } from "@/features/shared/types";
import type { Product } from "../types";

export async function createProductAction(
    data: unknown,
): Promise<GeneralResponse<Product>> {
    try {
        const parsed = createProductSchema.safeParse(data);
        if (!parsed.success) {
            return {
                success: false,
                message: "Datos inválidos",
                data: null,
            };
        }

        const product = await prismaDB.product.create({
            data: parsed.data,
        });

        return {
            success: true,
            message: "Producto creado",
            data: product,
        };
    } catch (error) {
        // comentario en español explicando qué falló si aplica
        return {
            success: false,
            message: "Error al crear el producto",
            data: null,
        };
    }
}
```

```typescript
// features/shared/types/general-response.ts
export interface GeneralResponse<T = null> {
    success: boolean;
    message: string;
    data: T | null;
}
```

---

## Validaciones con Zod

- Schemas en `features/<feature>/validations/<feature>.schema.ts`.
- Se valida **en ambos lados**: cliente (React Hook Form + `zodResolver`) y servidor (action).
- Exportar siempre el schema y su tipo inferido.

```typescript
// product.schema.ts
import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    price: z.number().positive("El precio debe ser mayor a 0"),
});

export type CreateProductData = z.infer<typeof createProductSchema>;
```

---

## Formularios (React Hook Form + Zod)

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, type CreateProductData } from "../validations";
import { useCreateProductMutation } from "../queries";

export function ProductForm() {
    const form = useForm<CreateProductData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: { name: "", price: 0 },
    });

    const { mutate, isPending } = useCreateProductMutation();

    function onSubmit(data: CreateProductData) {
        mutate(data);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* campos */}
        </form>
    );
}
```

---

## Data fetching en cliente — TanStack Query (obligatorio)

TanStack Query es la capa estándar para **todo fetching en componentes cliente**. Prohibido usar `fetch` directo, `useEffect` para obtener datos, o llamar server actions directamente desde `useEffect`.

### Reglas generales

- Todo query hook vive en `features/<feature>/queries/<feature>.query.ts`.
- Todo query hook se exporta desde `features/<feature>/queries/index.ts`.
- La `queryFn` **siempre** llama un server action que retorna `GeneralResponse<T>`.
- Si `response.success` es `false` o `response.data` es `null`, la `queryFn` **lanza un error** para que TanStack Query active `isError`.
- Nunca retornar `null` silenciosamente desde una `queryFn` — o retorna datos válidos o lanza.

### Query keys

Siempre definidas como constante exportada junto al hook, tipadas con `as const`. Nunca inline dentro del hook.

```typescript
// scope fijo
export const productListQueryKey = ["products", "list"] as const;

// scope con parámetro
export const productDetailQueryKey = (productId: string) =>
    ["products", "detail", productId] as const;
```

Esto permite invalidar desde mutations o actions sin duplicar strings.

### Estructura de un query hook (lectura)

```typescript
// features/products/queries/product-list.query.ts

import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions";

export const productListQueryKey = ["products", "list"] as const;

export function useProductListQuery() {
    return useQuery({
        queryKey: productListQueryKey,
        queryFn: async () => {
            const response = await getProductsAction();

            // si la action falla, lanzamos para activar isError en el componente
            if (!response.success || !response.data) {
                throw new Error(
                    response.message ?? "Error al obtener los productos",
                );
            }

            return response.data;
        },
    });
}
```

### Estructura de un mutation hook (escritura)

```typescript
// features/products/queries/create-product.query.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/features/shared/components/ui/use-toast";
import { createProductAction } from "../actions";
import { productListQueryKey } from "./product-list.query";
import type { CreateProductData } from "../validations";

export function useCreateProductMutation() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (data: CreateProductData) => createProductAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                // la action retornó success: false — mostramos error sin invalidar
                toast({
                    variant: "destructive",
                    description: response.message,
                });
                return;
            }

            // invalidamos la lista para que se refetch automáticamente
            queryClient.invalidateQueries({ queryKey: productListQueryKey });

            toast({ description: response.message });
        },
        onError: () => {
            // error de red u otro error no controlado
            toast({
                variant: "destructive",
                description: "Error inesperado. Intenta de nuevo.",
            });
        },
    });
}
```

### Uso en componentes

```typescript
"use client";

import { useProductListQuery } from "../queries";
import Loading from "@/app/loading";
import Error from "next/error";

export function ProductList() {
    const { data, isLoading, isError } = useProductListQuery();

    // mientras TanStack Query está fetcheando
    if (isLoading) return <Loading />;

    // si la queryFn lanzó un error
    if (isError || !data) return <Error statusCode={500} />;

    return (
        <ul>
            {data.map((p) => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    );
}
```

### Invalidación desde mutations

Siempre invalidar usando la query key exportada, nunca strings hardcodeados:

```typescript
// ✅ correcto
queryClient.invalidateQueries({ queryKey: productListQueryKey });

// ❌ prohibido
queryClient.invalidateQueries({ queryKey: ["products", "list"] });
```

### Reglas de oro de TanStack Query

- ❌ No uses `useEffect` + `fetch`/server action para obtener datos en el cliente.
- ❌ No escribas la query key inline; siempre expórtala como constante.
- ❌ No retornes `null` silenciosamente desde `queryFn`; lanza un error si la action falla.
- ❌ No invalides queries con strings hardcodeados; usa siempre la constante exportada.
- ❌ No pongas lógica de negocio dentro del hook; solo orquestación de fetching y feedback.
- ✅ Un archivo `.query.ts` por recurso/sub-recurso (no mezclar `list` y `detail` en el mismo archivo si tienen query keys distintas).
- ✅ Exportar siempre desde `queries/index.ts`.

---

## Autenticación y protección de rutas

- Better Auth configurada en `src/lib/auth/auth.ts`.
- Para verificar sesión, usar siempre `getSessionDetails()` de `src/lib/auth/session-details.ts`.
- La protección se hace en `layout.tsx` del segmento protegido, **no** en cada `page.tsx`.
- Si se necesitan **roles**, se expande `auth.ts` para incluir el campo `role`, y `getSessionDetails()` lo retorna. No implementar roles si el proyecto no los pide explícitamente.

```typescript
// app/(dashboard)/layout.tsx
import { getSessionDetails } from "@/lib/auth/session-details";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = await getSessionDetails();
    if (!isAuthenticated) redirect("/login");
    return <>{children}</>;
}
```

---

## Estado global con Zustand — REGLA CONDICIONAL

Zustand **no es default**. Antes de crear un store, responde este checklist:

- [ ] ¿El estado se comparte entre 2+ componentes que **no** tienen relación padre-hijo directa?
- [ ] ¿Pasar el estado por props/Context generaría más de 2-3 niveles de drilling?
- [ ] ¿El estado necesita persistir entre navegaciones del cliente (no solo en un Server Component)?
- [ ] ¿Es realmente estado de UI/cliente, y no algo que debería vivir en la URL (`searchParams`) o venir de Server Components?

Si **no** marcaste al menos 2 de las anteriores, **no uses Zustand** — resuélvelo con props, Context simple, o estado de URL.

> **Nota:** el caché de TanStack Query **no es Zustand**. No uses Zustand para almacenar datos que ya vienen de una query — TanStack Query ya los cachea. Zustand es solo para estado de UI puro que no proviene del servidor.

Ejemplos típicos donde SÍ aplica: carrito de compras, wizard multi-paso con estado complejo, sidebar/tema persistido en cliente, filtros complejos compartidos entre tabla y panel lateral no relacionados.

```typescript
// features/cart/store/cart.store.ts
import { create } from "zustand";

interface CartItem {
    productId: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    clear: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    addItem: (item) =>
        set((state) => ({ items: [...state.items, item] })),
    clear: () => set({ items: [] }),
}));
```

No metas lógica de negocio en el store; solo estado y setters simples.

---

## Testing (Vitest + React Testing Library) — siempre

- Stack: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, entorno `jsdom`.
- Archivos de test co-ubicados junto al código: `<feature>.action.test.ts`, `product-form.test.tsx`, `<feature>.query.test.ts`.
- **Qué se prueba sin excepción:**
    - Schemas Zod (casos válidos e inválidos).
    - Server Actions: camino exitoso y camino de error (mockeando `prismaDB`).
    - Query hooks: que llaman la action correcta, que lanzan error si `success: false`, que invalidan la query key correcta en mutations.
    - Componentes con lógica (formularios, listas con estado, condicionales de UI).
- **Qué NO es obligatorio probar:** componentes puramente presentacionales sin lógica, wrappers triviales de shadcn/ui.
- Tests end-to-end (Playwright u otro) son **opcionales por proyecto**, no son parte del default global.

```typescript
// product.schema.test.ts
import { describe, it, expect } from "vitest";
import { createProductSchema } from "./product.schema";

describe("createProductSchema", () => {
    it("acepta datos válidos", () => {
        const result = createProductSchema.safeParse({
            name: "Mesa",
            price: 100,
        });
        expect(result.success).toBe(true);
    });

    it("rechaza precio negativo", () => {
        const result = createProductSchema.safeParse({
            name: "Mesa",
            price: -5,
        });
        expect(result.success).toBe(false);
    });
});
```

```typescript
// create-product.action.test.ts
import { describe, it, expect, vi } from "vitest";
import { createProductAction } from "./create-product.action";
import { prismaDB } from "@/lib/db/prismaDB";

vi.mock("@/lib/db/prismaDB", () => ({
    prismaDB: { product: { create: vi.fn() } },
}));

describe("createProductAction", () => {
    it("retorna success: false si los datos son inválidos", async () => {
        const result = await createProductAction({ name: "", price: -1 });
        expect(result.success).toBe(false);
    });

    it("crea el producto si los datos son válidos", async () => {
        vi.mocked(prismaDB.product.create).mockResolvedValue({
            id: "1",
            name: "Mesa",
            price: 100,
        } as never);

        const result = await createProductAction({ name: "Mesa", price: 100 });
        expect(result.success).toBe(true);
        expect(result.data?.name).toBe("Mesa");
    });
});
```

```typescript
// product-list.query.test.ts
import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProductListQuery } from "./product-list.query";
import { getProductsAction } from "../actions";

vi.mock("../actions", () => ({
    getProductsAction: vi.fn(),
}));

function wrapper({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

describe("useProductListQuery", () => {
    it("retorna datos si la action responde con success: true", async () => {
        vi.mocked(getProductsAction).mockResolvedValue({
            success: true,
            message: "ok",
            data: [{ id: "1", name: "Mesa" }],
        });

        const { result } = renderHook(() => useProductListQuery(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toHaveLength(1);
    });

    it("activa isError si la action responde con success: false", async () => {
        vi.mocked(getProductsAction).mockResolvedValue({
            success: false,
            message: "Error",
            data: null,
        });

        const { result } = renderHook(() => useProductListQuery(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));
    });
});
```

```typescript
// product-form.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductForm } from "./product-form";

describe("ProductForm", () => {
    it("muestra error si el nombre está vacío", async () => {
        render(<ProductForm />);
        await userEvent.click(screen.getByRole("button", { name: /guardar/i }));
        expect(await screen.findByText(/requerido/i)).toBeInTheDocument();
    });
});
```

---

## Convenciones adicionales de App Router

- **Server Components por defecto.** Usar `"use client"` solo cuando se necesite interactividad, hooks de estado o acceso a APIs del navegador.
- **Route groups** `(nombre)` para organizar sin afectar la URL (ej. `(dashboard)`, `(auth)`).
- `loading.tsx` y `error.tsx` por segmento cuando la ruta haga fetching o pueda fallar.
- `generateMetadata` para SEO en páginas públicas relevantes.
- Data fetching en Server Components siempre que sea posible; usar Route Handlers (`app/api`) **solo** para webhooks o integraciones externas, nunca para lógica de negocio propia.
- Definir estrategia de cache/revalidación (`revalidatePath`, `revalidateTag`) explícitamente al mutar datos desde una Server Action si la UI depende de datos cacheados.

---

## Manejo de errores

- **Nunca** lanzar errores no controlados hacia el cliente.
- Toda action retorna `GeneralResponse<T>`.
- En el cliente, mostrar feedback con shadcn/ui Toast según `result.success`.
- Los query hooks activan `isError` lanzando desde `queryFn`; el componente renderiza el componente de error correspondiente.
- `error.tsx` y `not-found.tsx` en `app/` son el último recurso para errores no anticipados.

---

## Estilos

- **Solo Tailwind CSS.** Cero CSS custom salvo `globals.css` para variables base.
- No sobreescribir estilos de `components/ui/` directamente; extender o wrapear.
- `cn()` de `lib/utils.ts` para combinar clases condicionalmente.

---

## Variables de entorno

- `.env.local` para desarrollo, nunca commitear `.env*` reales.
- Mantener `.env.example` actualizado con todas las variables requeridas (sin valores reales).
- Variables sensibles (DB, secrets de auth) solo accesibles server-side; nunca exponer en componentes cliente sin el prefijo `NEXT_PUBLIC_` y solo si es estrictamente necesario.

---

## Reglas de oro (no hagas)

- ❌ No uses `any` en TypeScript sin un comentario que justifique por qué.
- ❌ No toques `src/generated/prisma/` manualmente.
- ❌ No instales dependencias sin avisar primero.
- ❌ No subas archivos `.env*` al repositorio.
- ❌ No crees rutas con parámetros genéricos como `[id]` o `[slug]`.
- ❌ No omitas el archivo de barril `index.ts` en `actions/`, `components/`, `queries/`, `types/` o `validations/`.
- ❌ No uses API Routes para lógica de negocio; usa Server Actions.
- ❌ No pongas lógica de negocio directamente en `page.tsx`; delégala a componentes de la feature.
- ❌ No omitas el try/catch en una Server Action.
- ❌ No hagas queries a Prisma fuera de Server Actions sin justificarlo.
- ❌ No crees un store de Zustand sin pasar el checklist de la sección correspondiente.
- ❌ No uses Zustand para cachear datos del servidor; para eso existe TanStack Query.
- ❌ No uses `useEffect` + fetch/server action para obtener datos en el cliente; usa un query hook.
- ❌ No escribas query keys inline; siempre expórtalas como constante con `as const`.
- ❌ No retornes `null` silenciosamente desde una `queryFn`; lanza un error si la action falla.
- ❌ No entregues una feature nueva sin sus tests (schema + action + query hook como mínimo).
- ❌ No ignores el AGENTS.md específico del proyecto si existe.

---

## Checklist operativo antes de cada tarea

- [ ] Leí el `AGENTS.md` del proyecto (si existe) y resolví conflictos a su favor.
- [ ] Verifiqué la documentación oficial vía MCP para las APIs que voy a usar.
- [ ] Propuse un plan y esperé aprobación si la tarea no es trivial.
- [ ] Creé/confirmé la estructura completa de la feature (`actions`, `components`, `queries`, `types`, `validations`).
- [ ] Escribí el schema Zod antes de la Server Action.
- [ ] La Server Action tiene try/catch, retorna `GeneralResponse<T>`, no lanza excepciones al cliente.
- [ ] Validación duplicada en cliente (`zodResolver`) y servidor.
- [ ] Query hook creado en `queries/<feature>.query.ts` y exportado desde `queries/index.ts`.
- [ ] La `queryFn` lanza error si `response.success` es `false`.
- [ ] Las mutations invalidan usando la constante de query key, nunca strings hardcodeados.
- [ ] Pasé el checklist de Zustand antes de crear un store (si aplicaba).
- [ ] Escribí tests Vitest/RTL para el schema, la action y el query hook.
- [ ] Archivos de barril `index.ts` actualizados (incluido `queries/index.ts`).
- [ ] Nombres de archivos/carpetas siguen la convención kebab-case + sufijo.
- [ ] No usé `any` sin justificar ni toqué `generated/prisma` a mano.
- [ ] Reporté exactamente qué archivos cambié y por qué.

---

## Flujo de trabajo del agente

1. **Lee el AGENTS.md del proyecto primero**, si existe; este documento global es el fallback.
2. **Verifica documentación oficial** vía MCP antes de usar cualquier API de Next.js, Prisma, Better Auth, Zod, React Hook Form, shadcn/ui, Zustand, TanStack Query o Vitest.
3. **Propón un plan** antes de cualquier tarea no trivial y espera aprobación.
4. **Una tarea a la vez.** Al terminar, reporta exactamente qué archivos cambiaste y por qué.
5. **Si no estás seguro al 80%, pregunta.** No inventes imports, rutas, ni nombres de campos de Prisma.
6. **Sigue la estructura de features** siempre. Si una feature no tiene carpeta aún, créala completa incluyendo `queries/`.
7. **Valida en ambos lados** (cliente y servidor) sin excepción.
8. **Escribe tests** para toda lógica nueva antes de reportar la tarea como terminada.
9. **Cero regresiones.** Si tu cambio toca un archivo existente, verifica que no rompe lo que ya funciona.
```