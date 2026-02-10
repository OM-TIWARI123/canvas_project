declare module 'global' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        // Node Environment
        NODE_ENV: 'development' | 'staging' | 'production';

        // Application
        ALLOWED_ORIGINS: string;

        // Database
        DATABASE_URL: string;

        // BetterAuth
        BETTER_AUTH_URL: string;
        BETTER_AUTH_SECRET: string;
        COOKIE_DOMAIN: string;

        // SMTP
        SMTP_NAME: string;
        SMTP_MAIL: string;
        SMTP_REPLY_TO: string;
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_USERNAME: string;
        SMTP_PASSWORD: string;

        // APP URL
        API_URL: string;
        ADMIN_APP_URL: string;
        USER_APP_URL: string;

        // Shopify
        SHOPIFY_HOSTNAME: string;
        SHOPIFY_CLIENT_ID: string;
        SHOPIFY_CLIENT_SECRET: string;
        SHOPIFY_SCOPES: string;

        // Stripe
        STRIPE_SECRET_KEY: string;
        STRIPE_BETTERAUTH_WEBHOOK_SECRET: string;
        STRIPE_FREE_PRICE_ID: string;
        STRIPE_STARTER_PRICE_ID: string;
        STRIPE_PRO_PRICE_ID: string;
      }
    }
  }
}
