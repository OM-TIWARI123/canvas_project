import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getUser } from '@/functions/get-user-details';
import { getOnboardingRedirect } from '@/functions/onboarding-redirect';

export const Route = createFileRoute('/onboarding')({
  beforeLoad: async function ({ location }) {
    const redirectDecision = await getOnboardingRedirect();

    if (redirectDecision?.url && redirectDecision.url !== location.pathname) {
      throw redirect({ to: redirectDecision.url });
    }
  },
  loader: async function () {
    const user = await getUser();
    if (!user) {
      throw redirect({ to: '/login' });
    }

    return { session: user.session, user: user.user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
