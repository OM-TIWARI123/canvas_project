import { config } from 'dotenv';
import { z } from '@repo/utils/utils/zod';

config({ path: '.env.local', quiet: true });

const envSchema = z.object({
  // Node Environment
  NODE_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),

  // Application
  ALLOWED_ORIGINS: z
    .string()
    .transform((val) => val.split(',').map((origin) => origin.trim())),

  // Database
  DATABASE_URL: z.string(),

  // BetterAuth
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  COOKIE_DOMAIN: z.string(),

  // SMTP
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform((val) => parseInt(val)),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_NAME: z.string(),
  SMTP_MAIL: z.string(),
  SMTP_REPLY_TO: z.string(),

  // APP URL
  API_URL: z.url(),
  ADMIN_APP_URL: z.url(),
  USER_APP_URL: z.url(),

  // Shopify
  SHOPIFY_HOSTNAME: z.string(),
  SHOPIFY_CLIENT_ID: z.string(),
  SHOPIFY_CLIENT_SECRET: z.string(),
  SHOPIFY_SCOPES: z.string(),

  // Stripe
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_BETTERAUTH_WEBHOOK_SECRET: z.string(),
  
  STRIPE_FREE_PRICE_ID: z.string(),
  STRIPE_STARTER_PRICE_ID: z.string(),
  STRIPE_PRO_PRICE_ID: z.string(),
});

const { data, success, error } = envSchema.safeParse(process.env);

if (!success || !data) {
  console.error(error);
  process.exit(1);
}

const env = data;

export default env;
