// Node Module
import { z } from '@repo/ui/lib/form';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

// Lib
import { auth } from '@/lib/auth';

export const getSubscription = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data: { userId } }) => {
    const { data } = await auth.subscription.list({
      fetchOptions: {
        headers: getRequestHeaders(),
      },
      query: {
        referenceId: userId,
      },
    });

    return data ? data.length > 0 : false;
  });
