import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/onboarding/(routes)/')({
  beforeLoad: function () {
    throw redirect({ to: '/onboarding/shopify' });
  },
  component: function RouteComponent() {
    return null;
  },
});
