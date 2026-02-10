import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

import { BetterAuth } from '@services/betterauth';

export const auth = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [inferAdditionalFields<BetterAuth>()],
});
