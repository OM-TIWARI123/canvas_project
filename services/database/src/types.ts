import {
  // Auth
  userSchema,
} from './schemas';

export type User = typeof userSchema.$inferSelect;
