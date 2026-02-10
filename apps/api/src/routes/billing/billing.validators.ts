import { createValidatorSchema } from '@/utils/zod-validator-schema';

import type { TypedContext } from '@/types/app.types';

export const billingDetailsValidator = createValidatorSchema({});

export const paymentMethodsValidator = createValidatorSchema({});

export const customerInvoicesValidator = createValidatorSchema({});

export type BillingDetailsContext = TypedContext<
  typeof billingDetailsValidator
>;
export type PaymentMethodsContext = TypedContext<
  typeof paymentMethodsValidator
>;
export type CustomerInvoicesContext = TypedContext<
  typeof customerInvoicesValidator
>;
