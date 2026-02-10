import { z } from '@repo/utils/utils/zod';

import { createValidatorSchema } from '@/utils/zod-validator-schema';
import type { TypedContext } from '@/types/app.types';

export const statusValidator = createValidatorSchema({});
export type StatusContext = TypedContext<typeof statusValidator>;

export const oauthValidator = createValidatorSchema({
  query: z.object({
    shop: z.string().min(1, 'Shop is required'),
    hmac: z.string().min(1, 'HMAC is required'),
    timestamp: z.string().min(1, 'Timestamp is required'),
  }),
});
export type OauthContext = TypedContext<typeof oauthValidator>;

export const oauthCallbackValidator = createValidatorSchema({
  query: z.object({
    code: z.string().min(1, 'Code is required'),
    shop: z.string().min(1, 'Shop domain is required'),
    host: z.string().min(1, 'Host is required'),
    state: z.string().min(1, 'State is required'),
  }),
});
export type OauthCallbackContext = TypedContext<typeof oauthCallbackValidator>;
