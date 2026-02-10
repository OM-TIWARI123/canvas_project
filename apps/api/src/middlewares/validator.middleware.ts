import { z } from '@repo/utils/utils/zod';
import { MiddlewareHandler } from 'hono';
import { zValidator } from '@hono/zod-validator';

import type {
  AllowedKeys,
  ZodValidatorSchema,
} from '@/utils/zod-validator-schema';
import HttpError from '@/utils/error/http-error';

export function validator<T extends ZodValidatorSchema>(
  schema: T,
): MiddlewareHandler {
  return async (c, next) => {
    for (const [key, zodSchema] of Object.entries(schema)) {
      if (zodSchema) {
        const typedKey = key as AllowedKeys;
        await zValidator(typedKey, zodSchema, (result) => {
          if (!result.success) {
            const prettyError = z.prettifyError(result.error);
            throw new HttpError(400, prettyError, 'BAD_REQUEST');
          }
        })(c, async () => {});
      }
    }

    return next();
  };
}
