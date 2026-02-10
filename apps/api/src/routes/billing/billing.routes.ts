import { Hono } from 'hono';
import { validator } from '@/middlewares/validator.middleware';
import { isAuthenticated } from '@/middlewares/auth.middleware';

import {
  getBillingDetails,
  getPaymentMethods,
  getCustomerInvoices,
} from './billing.handlers';
import {
  billingDetailsValidator,
  paymentMethodsValidator,
  customerInvoicesValidator,
} from './billing.validators';

import { AppBindings } from '@/types/app.types';

const billing = new Hono<AppBindings>();

billing.get(
  '/details',
  isAuthenticated,
  validator(billingDetailsValidator),
  getBillingDetails,
);

billing.get(
  '/payment-methods',
  isAuthenticated,
  validator(paymentMethodsValidator),
  getPaymentMethods,
);

billing.get(
  '/invoices',
  isAuthenticated,
  validator(customerInvoicesValidator),
  getCustomerInvoices,
);

export default billing;
