// Env
import env from '@/env';

// Node Modules
import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Services/Handlers/Middlewares
import auth from '@/services/auth';
import onError from '@/handlers/error';
import notFound from '@/handlers/not-found';
import { addUserToContext } from '@/middlewares/auth.middleware';

// Routes
import health from '@/routes/health/health.routes';
import shopify from '@/routes/shopify/shopify.routes';
import billing from '@/routes/billing/billing.routes';

// Types
import type { AppBindings } from '@/types/app.types';

const app = new Hono<AppBindings>();

app.use(
  '/api/*',
  cors({
    origin: env.ALLOWED_ORIGINS,
    allowHeaders: ['Content-Type', 'Authorization', 'X-Organization-ID'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
);
app.use('/api/*', addUserToContext);

app.get('/', (c) => {
  return c.text('DSPLN API is running');
});

app.on(['GET', 'POST'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

app.route('/api/health', health);
app.route('/api/shopify', shopify);
app.route('/api/billing', billing);

app.notFound(notFound);
app.onError(onError);

export default app;
