---
trigger: always_on
---

# DSPLN - Print-on-Demand SaaS Platform

Multi-tenant POD platform connecting Shopify stores. Merchants design apparel, publish to Shopify, orders auto-routed for fulfillment with Stripe billing.

**Type**: Multi-tenant SaaS | **Deploy**: SST (AWS) | **Similar to**: Printify/Customily (6 products)

---

## 📁 Project Structure

```
dspln/
├── apps/
│   ├── admin/     # Admin dashboard (TanStack Start)
│   ├── api/       # Backend API (Hono + Lambda)
│   └── user/      # Merchant dashboard (TanStack Start)
├── packages/
│   ├── ui/        # Shared components (@repo/ui)
│   └── utils/     # Shared utilities (@repo/utils)
├── services/
│   ├── betterauth/ database/ email/
├── stack/         # SST infra
```

---

## Business Domain

### Multi-Tenancy

- **Merchant**: Isolated via `organizationId` - own store/products/orders only
- **Admin**: Platform-wide access (fulfillment, billing)

### Core Entities

```
Organization: id, name, ownerId, shopifyStoreUrl, stripeCustomerId
Product: id, organizationId, name, baseProductId, designData, variants[]
ShopifyConnection: id, organizationId, accessToken, shop, scopes[]
Order: id, organizationId, shopifyOrderId, status, lineItems[], billingStatus
```

### Products (6)

T-Shirts, Hoodies, Sweatshirts, Tank Tops, Long Sleeves, Crop Tops (size/color variants)

---

## Core Workflows

**Shopify OAuth**: Initiate → Redirect → Callback → Store encrypted token
**Designer**: Select base → Upload logos/text → Save JSON → Generate mockups → Publish with metafields
**Orders**: Webhook → HMAC validate → Create order → Stripe charge → Fulfill → Push tracking

---

## 🛠️ API (Hono)

### Route Structure

```
routes/{feature}/
├── {feature}.routes.ts      # Routes + middleware
├── {feature}.validators.ts  # Zod schemas
├── {feature}.handlers.ts    # Business logic
```

### Validator Example

```typescript
import z from 'zod/v4';
import { createValidatorSchema } from '@/utils/zod-validator-schema';
export const createProductValidator = createValidatorSchema({
  json: z.object({
    name: z.string().min(1),
    baseProductId: z.string().uuid(),
    designData: z.object({ canvasJSON: z.string() }),
  }),
});
export type CreateProductContext = TypedContext<typeof createProductValidator>;
```

### Handler Example

```typescript
export async function createProduct(ctx: CreateProductContext) {
  const { name, baseProductId, designData } = ctx.req.valid('json');
  const organizationId = ctx.get('organization').id; // Always scope!
  const product = await db
    .insert(products)
    .values({ name, baseProductId, organizationId, designData })
    .returning();
  return sendResponse(ctx, 201, 'Product created', { data: product[0] });
}
```

### Middleware Order

`isAuthenticated` → `requireOrganization` → `validator(schema)` → Handler

---

## 🔌 Integrations

### Shopify (`services/shopify/`)

- Use `@shopify/shopify-api`
- HMAC validate ALL webhooks
- Store encrypted access tokens
- Link via metafields
- Handle rate limits with backoff

### Stripe (`services/stripe/`)

- Create customer on onboarding
- Test mode until production
- Idempotency keys for charges
- Log all billing events

---

## ⚛️ Frontend Hooks (TanStack Query)

```
hooks/
├── useAuth/ useProducts/ useDesigner/ useShopify/ useOrders/
└── useRequest.ts
```

### Query Hook

```typescript
export function useGetProducts() {
  const api = useRequest();
  const getProducts = useCallback(
    async (params) => {
      const { data } = await api.get<GetProductsResponse>('/products', {
        params,
      });
      return data.data;
    },
    [api],
  );
  const getProductsQueryOptions = () =>
    queryOptions({
      queryKey: [ReactQueryKeys.GET_PRODUCTS],
      queryFn: () => getProducts({}),
    });
  return { getProducts, getProductsQueryOptions };
}
```

### Mutation Hook

```typescript
export function usePublishProduct() {
  const api = useRequest();
  const publishMutation = useMutation({
    mutationFn: (productId: string) =>
      api.post(`/products/${productId}/publish`, {}),
    meta: {
      successMessage: 'Published to Shopify',
      invalidateQueries: [ReactQueryKeys.GET_PRODUCTS],
    },
  });
  return { publishMutation };
}
```

---

## 🛣️ Routes (TanStack Router)

```
routes/
├── (auth)/(routes)/login.tsx, register.tsx
├── dashboard/route.tsx + (routes)/index, products/, designer/, orders, settings
├── admin/(routes)/orders, merchants, fulfillment
```

### Auth Guard

```typescript
export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context }) => {
    const session = await context.auth.getSession();
    if (!session) throw redirect({ to: '/login' });
    if (!session.organization) throw redirect({ to: '/onboarding' });
    return { session };
  },
});
```

---

## 🎨 Designer

- Use **Fabric.js** or **Konva.js**
- Store as JSON, generate mockups server-side

```typescript
interface DesignData {
  canvasJSON: string;
  printAreas: { position: 'front' | 'back'; objects: CanvasObject[] }[];
  thumbnailUrl: string;
}
```

---

## 🧩 Components

```
components/
├── auth/ common/ dashboard/ designer/ products/ orders/ shopify/
```

---

## 🌍 Environment

### Backend (`apps/api/src/env.ts`)

```typescript
z.object({
  DATABASE_URL,
  BETTER_AUTH_URL,
  BETTER_AUTH_SECRET,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SCOPES,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
});
```

### Frontend: `import.meta.env.VITE_API_URL`, `VITE_SHOPIFY_API_KEY`

---

## Database

### Multi-Tenant Pattern

```typescript
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
});
// Always filter: where: eq(products.organizationId, currentOrgId)
```

---

## 📋 Checklists

### New API Endpoint

1. `{feature}.validators.ts` - Zod schemas
2. `{feature}.handlers.ts` - handlers with org scoping
3. `{feature}.routes.ts` - with `requireOrganization`
4. Mount in `app.ts`

### New Frontend Feature

1. `hooks/use{Feature}/types.ts` + `index.ts`
2. Query key in `react-query-keys.ts`
3. Components in `components/{feature}/`
4. Route in `routes/`

### Commands

```bash
pnpm dev | pnpm db:generate | pnpm db:migrate | pnpm deploy:staging | pnpm deploy:prod
```

---

## Shopify Webhooks

| Topic              | Action                    |
| ------------------ | ------------------------- |
| `orders/create`    | Create order, charge      |
| `orders/cancelled` | Cancel, refund            |
| `app/uninstalled`  | Deactivate, pause billing |

---

## Security

- Encrypt Shopify tokens at rest
- HMAC validate webhooks
- Scope ALL queries by `organizationId`
- Stripe webhooks for payment confirmation
- Rate limit endpoints
- Sanitize design uploads
