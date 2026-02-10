import Stripe from 'stripe';

export default function getStripeClient(STRIPE_SECRET_KEY: string) {
  return new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-12-15.clover',
  });
}
