import { createServerFn } from '@tanstack/react-start';

import { getUser } from './get-user-details';
import { getSubscription } from './get-subscription';
import { getShopifyStatus } from './get-integration-status';

export const getOnboardingRedirect = createServerFn().handler(async () => {
  const user = await getUser();
  if (!user) return { url: '/login' };

  const hasSubscription = await getSubscription({
    data: { userId: user.user.id },
  });
  if (!hasSubscription) {
    return { url: '/onboarding/choose-plan' };
  }

  const shopifyStatus = await getShopifyStatus();
  if (!shopifyStatus.connected) {
    return { url: '/onboarding/shopify' };
  }

  return { url: '/dashboard' };
});
