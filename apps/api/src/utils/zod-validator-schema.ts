import { z } from '@repo/utils/utils/zod';
import { ValidationTargets } from 'hono';

export type AllowedKeys = keyof ValidationTargets;

export type ZodValidatorSchema = Partial<Record<AllowedKeys, z.core.$ZodType>>;

type NoExtraKeys<T, U extends keyof any = AllowedKeys> =
  Exclude<keyof T, U> extends never ? T : never;

export function createValidatorSchema<T extends ZodValidatorSchema>(
  schema: NoExtraKeys<T>,
): T {
  return schema;
}
