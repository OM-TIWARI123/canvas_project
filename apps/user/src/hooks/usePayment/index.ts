// Node Modules
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

// Lib/Utils
import { auth } from '@/lib/auth';

// Types
import type { UpgradeRequest } from './types';

export function usePayment() {
  const { data } = auth.useSession();

  const upgrade = useCallback(
    async (payload: UpgradeRequest['payload']) => {
      if (!data?.user.id) return;

      const { error } = await auth.subscription.upgrade({
        plan: payload.plan,
        referenceId: data.user.id,
        successUrl: import.meta.env.VITE_USER_APP_URL + '/onboarding/shopify',
        cancelUrl:
          import.meta.env.VITE_USER_APP_URL + '/onboarding/choose-plan',
        returnUrl:
          import.meta.env.VITE_USER_APP_URL + '/onboarding/choose-plan',
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    [data?.user.id],
  );

  const upgradeMutation = useMutation({
    mutationFn: upgrade,
  });

  return {
    upgradeMutation,
  };
}
