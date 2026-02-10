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
    // Home
    '/': { title: 'DSPLN - Print on Demand for Shopify' },

    // Auth
    '/login': { title: 'Login | DSPLN' },
    '/signup': { title: 'Sign Up | DSPLN' },
    '/forgot-password': { title: 'Forgot Password | DSPLN' },
    '/reset-password': { title: 'Reset Password | DSPLN' },

    // Onboarding
    '/onboarding': { title: 'Get Started | DSPLN' },
    '/onboarding/shopify': { title: 'Connect Shopify | DSPLN' },
    '/onboarding/choose-plan': { title: 'Choose Plan | DSPLN' },

    // Dashboard
    '/dashboard': { title: 'Dashboard | DSPLN' },
    '/dashboard/products': { title: 'Products | DSPLN' },
    '/dashboard/designer': { title: 'Designer | DSPLN' },
    '/dashboard/orders': { title: 'Orders | DSPLN' },
    '/dashboard/shopify': { title: 'Shopify | DSPLN' },
    '/dashboard/billing': { title: 'Billing | DSPLN' },
    '/dashboard/settings': { title: 'Settings | DSPLN' },
  };

  if (!pathMap[path]) {
    return {
      meta: [
        {
          title: 'DSPLN',
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
