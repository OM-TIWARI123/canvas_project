/// <reference path="../apps/user/env.d.ts" />
/// <reference path="../.sst/platform/config.d.ts" />

export const userApp = new sst.aws.TanStackStart('DSPLNUser', {
  path: 'apps/user',
  domain: {
    name:
      process.env.ENVIRONMENT === 'staging'
        ? 'staging.dspln.kapidron.tech'
        : 'dspln.kapidron.tech',
    redirects:
      process.env.ENVIRONMENT === 'staging'
        ? ['www.staging.dspln.kapidron.tech']
        : ['www.dspln.kapidron.tech'],
    dns: sst.cloudflare.dns(),
  },
  environment: {
    VITE_API_URL: process.env.VITE_API_URL,
    VITE_ADMIN_APP_URL: process.env.VITE_ADMIN_APP_URL,
    VITE_USER_APP_URL: process.env.VITE_USER_APP_URL,
    VITE_SHOPIFY_CLIENT_ID: process.env.VITE_SHOPIFY_CLIENT_ID,
    VITE_SHOPIFY_INSTALL_URL: process.env.VITE_SHOPIFY_INSTALL_URL,
  },
  buildCommand: 'pnpm build',
});

new awsnative.lambda.Permission('User:InvokePermission', {
  action: 'lambda:InvokeFunction',
  functionName: userApp.nodes.server!.name,
  principal: '*',
  invokedViaFunctionUrl: true,
});
