import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import {
  userSchema,
  sessionSchema,
  accountSchema,
  verificationSchema,
  subscriptionSchema,
} from '@services/database/schemas';
import {
  createCookieConfig,
  sessionConfig,
  createEmailPasswordConfig,
  createEmailVerificationConfig,
  userSchemaConfig,
  verificationConfig,
} from './configs';
import { adminPlugin, stripePlugin } from './plugins';

import type EmailService from '@services/email';
import type { Database } from '@services/database/index';

interface CreateBetterAuthProps {
  db: Database;
  emailService: EmailService;
  env: {
    ALLOWED_ORIGINS: string[];

    BETTER_AUTH_URL: string;
    BETTER_AUTH_SECRET: string;
    COOKIE_DOMAIN: string;

    STRIPE_SECRET_KEY: string;
    STRIPE_BETTERAUTH_WEBHOOK_SECRET: string;
    STRIPE_FREE_PRICE_ID: string;
    STRIPE_STARTER_PRICE_ID: string;
    STRIPE_PRO_PRICE_ID: string;
  };
}

export default function createBetterAuth({
  db,
  emailService,
  env,
}: CreateBetterAuthProps) {
  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: env.ALLOWED_ORIGINS,
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: {
        user: userSchema,
        session: sessionSchema,
        account: accountSchema,
        verification: verificationSchema,
        subscription: subscriptionSchema,
      },
    }),
    user: userSchemaConfig,
    verification: verificationConfig,
    plugins: [openAPI(), adminPlugin(), stripePlugin({ db, env })],
    emailAndPassword: createEmailPasswordConfig(emailService),
    emailVerification: createEmailVerificationConfig(emailService),
    session: sessionConfig,
    advanced: {
      useSecureCookies: true,
      cookies: createCookieConfig(env.COOKIE_DOMAIN),
    },
  });
}

export type BetterAuth = ReturnType<typeof createBetterAuth>;
