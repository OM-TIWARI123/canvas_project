/// <reference path="../apps/admin/env.d.ts" />
/// <reference path="../.sst/platform/config.d.ts" />

export const adminApp = new sst.aws.TanStackStart('DSPLNAdmin', {
  path: 'apps/admin',
  domain: {
    name:
      process.env.ENVIRONMENT === 'staging'
        ? 'staging.admin.dspln.kapidron.tech'
        : 'admin.dspln.kapidron.tech',
    redirects:
      process.env.ENVIRONMENT === 'staging'
        ? ['www.staging.admin.dspln.kapidron.tech']
        : ['www.admin.dspln.kapidron.tech'],
    dns: sst.cloudflare.dns(),
  },
  environment: {
    VITE_API_URL: process.env.VITE_API_URL,
    VITE_ADMIN_APP_URL: process.env.VITE_ADMIN_APP_URL,
    VITE_USER_APP_URL: process.env.VITE_USER_APP_URL,
  },
  buildCommand: 'pnpm build',
  transform: {
    server: {
      transform: { function(args, opts, name) {} },
    },
  },
});

new awsnative.lambda.Permission('Admin:InvokePermission', {
  action: 'lambda:InvokeFunction',
  functionName: adminApp.nodes.server!.name,
  principal: '*',
  invokedViaFunctionUrl: true,
});
