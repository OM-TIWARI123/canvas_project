import db from '@/db';
import env from '@/env';

import { emailService } from '@/services/email';

import createBetterAuth from '@services/betterauth';

const auth = createBetterAuth({
  db,
  emailService,
  env: {
    ALLOWED_ORIGINS: env.ALLOWED_ORIGINS,

    BETTER_AUTH_URL: env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
    COOKIE_DOMAIN: env.COOKIE_DOMAIN,

    STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
    STRIPE_BETTERAUTH_WEBHOOK_SECRET: env.STRIPE_BETTERAUTH_WEBHOOK_SECRET,
    
    STRIPE_FREE_PRICE_ID: env.STRIPE_FREE_PRICE_ID,
    STRIPE_STARTER_PRICE_ID: env.STRIPE_STARTER_PRICE_ID,
    STRIPE_PRO_PRICE_ID: env.STRIPE_PRO_PRICE_ID,
  },
});

export default auth;
