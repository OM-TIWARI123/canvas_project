import { Context } from 'hono';
import { z } from '@repo/utils/utils/zod';
import { InputToDataByTarget } from 'hono/types';

import auth from '@/services/auth';
import { ZodValidatorSchema, AllowedKeys } from '@/utils/zod-validator-schema';

export interface AppBindings {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

export type AppContext = Context<AppBindings>;

export type TypedContext<T extends ZodValidatorSchema> = AppContext & {
  req: AppContext['req'] & {
    valid<K extends AllowedKeys>(
      key: K,
    ): InputToDataByTarget<
      {
        [P in K]: T[P] extends z.ZodTypeAny ? z.infer<T[P]> : never;
      },
      K
    >;
  };
};
