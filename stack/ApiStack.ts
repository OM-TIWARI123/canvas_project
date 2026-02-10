/// <reference path="../apps/api/env.d.ts" />
/// <reference path="../.sst/platform/config.d.ts" />

export const api = new sst.aws.ApiGatewayV2('DSPLNApi', {
  domain: {
    name:
      process.env.ENVIRONMENT === 'staging'
        ? 'staging.api.dspln.kapidron.tech'
        : 'api.dspln.kapidron.tech',
    dns: sst.cloudflare.dns(),
  },
  cors: {
    allowMethods: ['*'],
    maxAge: '600 seconds',
    allowCredentials: true,
    exposeHeaders: ['Content-Length'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowOrigins: process.env.ALLOWED_ORIGINS.split(','),
  },
});

api.route('ANY /{proxy+}', {
  handler: 'apps/api/src/lambda.handler',
  timeout: '300 seconds',
  environment: {
    // Node Environment
    NODE_ENV: process.env.NODE_ENV,

    // Application
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,

    // Database
    DATABASE_URL: process.env.DATABASE_URL,

    // BetterAuth
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,

    // SMTP
    SMTP_NAME: process.env.SMTP_NAME,
    SMTP_MAIL: process.env.SMTP_MAIL,
    SMTP_REPLY_TO: process.env.SMTP_REPLY_TO,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,

    // APP URL
    API_URL: process.env.API_URL,
    ADMIN_APP_URL: process.env.ADMIN_APP_URL,
    USER_APP_URL: process.env.USER_APP_URL,

    // Shopify
    SHOPIFY_HOSTNAME: process.env.SHOPIFY_HOSTNAME,
    SHOPIFY_CLIENT_ID: process.env.SHOPIFY_CLIENT_ID,
    SHOPIFY_CLIENT_SECRET: process.env.SHOPIFY_CLIENT_SECRET,
    SHOPIFY_SCOPES: process.env.SHOPIFY_SCOPES,

    // Stripe
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_BETTERAUTH_WEBHOOK_SECRET:
      process.env.STRIPE_BETTERAUTH_WEBHOOK_SECRET,
    STRIPE_FREE_PRICE_ID: process.env.STRIPE_FREE_PRICE_ID,
    STRIPE_STARTER_PRICE_ID: process.env.STRIPE_STARTER_PRICE_ID,
    STRIPE_PRO_PRICE_ID: process.env.STRIPE_PRO_PRICE_ID,
  },
});
