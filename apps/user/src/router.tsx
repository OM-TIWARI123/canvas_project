import NProgress from 'nprogress';
import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

import { queryClient } from '@/lib/query-client';
import RootProvider from '@/providers/root-provider';

import NotFound from '@/components/core/not-found';
import CatchBoundary from '@/components/core/catch-boundary';

import { FileRouteTypes, routeTree } from '@/routeTree.gen';

NProgress.configure({ showSpinner: false });

export function getRouter() {
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <RootProvider queryClient={queryClient}>{props.children}</RootProvider>
      );
    },
    defaultErrorComponent: CatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  });

  router.subscribe('onBeforeLoad', ({ fromLocation, pathChanged }) => {
    fromLocation && pathChanged && NProgress.start();
  });
  router.subscribe('onLoad', () => {
    NProgress.done();
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

export type AppRoute = FileRouteTypes['to'];
