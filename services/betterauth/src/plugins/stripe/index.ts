// Node Modules
import { stripe } from '@better-auth/stripe';

// Functions
import getStripeClient from './stripe';
import getSubscriptionPlans from './plans';

// Types
import type { Database } from '@services/database/index';

interface StripePluginProps {
  db: Database;
  env: {
    STRIPE_SECRET_KEY: string;
    STRIPE_BETTERAUTH_WEBHOOK_SECRET: string;

    STRIPE_FREE_PRICE_ID: string;
    STRIPE_STARTER_PRICE_ID: string;
    STRIPE_PRO_PRICE_ID: string;
  };
}

export default function stripePlugin({ db, env }: StripePluginProps) {
  const stripeClient = getStripeClient(env.STRIPE_SECRET_KEY);

  return stripe({
    stripeClient,
    stripeWebhookSecret: env.STRIPE_BETTERAUTH_WEBHOOK_SECRET,
    createCustomerOnSignUp: true,
    subscription: {
      enabled: true,
      plans: getSubscriptionPlans(env),
    },
  });
}
