import { BetterAuthOptions } from 'better-auth';

export const userSchemaConfig = {
  additionalFields: {
    role: {
      type: 'string',
      required: false,
    },
  },
} satisfies BetterAuthOptions['user'];

export const verificationConfig =
  {} satisfies BetterAuthOptions['verification'];
