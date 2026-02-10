import { AnyRouteMatch } from '@tanstack/react-router';

import type { AppRoute } from '@/router';

type Head = {
  links?: AnyRouteMatch['links'];
  scripts?: AnyRouteMatch['headScripts'];
  meta?: AnyRouteMatch['meta'];
};

type PathMap = Record<AppRoute, { title: string }>;

export function getMetadata(path: AppRoute): Head {
  const pathMap: Partial<PathMap> = {
    // Auth
    '/login': { title: 'Login | DSPLN Admin' },
    '/forgot-password': { title: 'Forgot Password | DSPLN Admin' },
    '/reset-password': { title: 'Reset Password | DSPLN Admin' },

    // Dashboard
    '/dashboard': { title: 'Dashboard | DSPLN Admin' },
    '/dashboard/merchants': { title: 'Merchants | DSPLN Admin' },
    '/dashboard/orders': { title: 'Orders | DSPLN Admin' },
    '/dashboard/fulfillment': { title: 'Fulfillment | DSPLN Admin' },
    '/dashboard/base-products': { title: 'Base Products | DSPLN Admin' },
    '/dashboard/inventory': { title: 'Inventory | DSPLN Admin' },
    '/dashboard/settings': { title: 'Settings | DSPLN Admin' },
  };

  if (!pathMap[path]) {
    return {
      meta: [
        {
          title: 'DSPLN Admin',
        },
      ],
    };
  }

  return {
    meta: [
      {
        title: pathMap[path].title,
      },
    ],
  };
}
