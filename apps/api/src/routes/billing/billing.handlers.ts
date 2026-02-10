// Env
import db from '@/db';
import env from '@/env';

// Node Modules
import { eq } from 'drizzle-orm';

// Services/Lib
import { userSchema } from '@services/database/schemas';
import { stripe, createProductMap } from '@/utils/stripe';

// Constants/Utils
import sendResponse from '@/utils/response';
import HttpError from '@/utils/error/http-error';
import { formatSubscriptionDetails } from './billing.utils';

// Validators
import type {
  BillingDetailsContext,
  PaymentMethodsContext,
  CustomerInvoicesContext,
} from './billing.validators';

async function getUserStripeCustomerId(userId: string) {
  const result = await db
    .select({ stripeCustomerId: userSchema.stripeCustomerId })
    .from(userSchema)
    .where(eq(userSchema.id, userId))
    .limit(1);

  return result[0]?.stripeCustomerId ?? null;
}

export async function getBillingDetails(ctx: BillingDetailsContext) {
  const user = ctx.get('user')!;
  const stripeCustomerId = await getUserStripeCustomerId(user.id);

  if (!stripeCustomerId) {
    throw new HttpError(
      400,
      'No Stripe customer ID found for your account.',
      'BAD_REQUEST',
    );
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: 'active',
  });

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${env.USER_APP_URL}/dashboard/billing`,
  });

  const productMap = await createProductMap(subscriptions);

  const detailedSubscriptions = subscriptions.data
    .map((sub) => formatSubscriptionDetails(sub, productMap))
    .filter(Boolean);

  return sendResponse(ctx, 200, 'Billing details retrieved successfully', {
    data: detailedSubscriptions,
    manageSubscriptionUrl: portalSession.url,
  });
}

export async function getPaymentMethods(ctx: PaymentMethodsContext) {
  const user = ctx.get('user')!;
  const stripeCustomerId = await getUserStripeCustomerId(user.id);

  if (!stripeCustomerId) {
    throw new HttpError(
      400,
      'No Stripe customer ID found for your account.',
      'BAD_REQUEST',
    );
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: stripeCustomerId,
  });

  const simplifiedMethods = paymentMethods.data.map((method) => ({
    id: method.id,
    brand: method.card?.brand,
    cardNumber: method.card?.last4,
    expiry: {
      month: method.card?.exp_month,
      year: method.card?.exp_year,
    },
    cardType: method.card?.funding,
    billingDetails: method.billing_details,
  }));

  return sendResponse(ctx, 200, 'Payment methods retrieved successfully', {
    data: simplifiedMethods,
  });
}

export async function getCustomerInvoices(ctx: CustomerInvoicesContext) {
  const user = ctx.get('user')!;
  const stripeCustomerId = await getUserStripeCustomerId(user.id);

  if (!stripeCustomerId) {
    throw new HttpError(
      400,
      'No Stripe customer ID found for your account.',
      'BAD_REQUEST',
    );
  }

  const invoices = await stripe.invoices.list({
    customer: stripeCustomerId,
    limit: 20,
  });

  const simplifiedInvoices = invoices.data.map((invoice) => ({
    id: invoice.id,
    number: invoice.number,
    amount: invoice.total,
    created: invoice.created,
    status: invoice.status,
    pdf: invoice.invoice_pdf,
    currency: invoice.currency,
    description: invoice.description,
    dueDate: invoice.due_date,
    paidDate: invoice.status_transitions.paid_at,
    customerEmail: invoice.customer_email,
    customerName: invoice.customer_name,
    url: invoice.hosted_invoice_url,
  }));

  return sendResponse(ctx, 200, 'Invoices retrieved successfully', {
    data: simplifiedInvoices,
  });
}
