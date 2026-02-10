import { createAuthClient } from 'better-auth/react';
import { stripeClient } from '@better-auth/stripe/client';
import { inferAdditionalFields } from 'better-auth/client/plugins';

import { BetterAuth } from '@services/betterauth';

export const auth = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [
    inferAdditionalFields<BetterAuth>(),
    stripeClient({ subscription: true }),
  ],
});
