import env from '@/env';
import Stripe from 'stripe';

export interface StripeServiceProps {
  secretKey: string;
}

export class StripeService {
  private stripe: Stripe;

  constructor(props: StripeServiceProps) {
    this.stripe = new Stripe(props.secretKey);
  }

  constructWebhookEvent(rawBody: string, signature: string, secret: string) {
    return this.stripe.webhooks.constructEvent(rawBody, signature, secret);
  }

  getClient() {
    return this.stripe;
  }
}

export const stripeService = new StripeService({
  secretKey: env.STRIPE_SECRET_KEY,
});
