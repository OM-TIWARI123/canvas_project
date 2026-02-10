export default function getSubscriptionPlans(env: {
  STRIPE_FREE_PRICE_ID: string;
  STRIPE_STARTER_PRICE_ID: string;
  STRIPE_PRO_PRICE_ID: string;
}) {
  return [
    {
      group: 'merchant',
      name: 'merchant/free',
      priceId: env.STRIPE_FREE_PRICE_ID,
    },
    {
      group: 'merchant',
      name: 'merchant/starter',
      priceId: env.STRIPE_STARTER_PRICE_ID,
    },
    {
      group: 'merchant',
      name: 'merchant/pro',
      priceId: env.STRIPE_PRO_PRICE_ID,
    },
  ];
}
