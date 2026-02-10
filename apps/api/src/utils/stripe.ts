import env from '@/env';
import Stripe from 'stripe';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
});

/**
 * Creates a mapping of Stripe product IDs to their names
 */
export async function createProductMap(
  subscriptions: Stripe.ApiList<Stripe.Subscription>,
) {
  const productMap = new Map<string, string>();

  for (const sub of subscriptions.data) {
    for (const item of sub.items.data) {
      const productId = item.price.product as string;
      if (!productMap.has(productId)) {
        const product = await stripe.products.retrieve(productId);
        productMap.set(productId, product.name);
      }
    }
  }

  return productMap;
}
