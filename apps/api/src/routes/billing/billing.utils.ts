import Stripe from 'stripe';
import { calculateDaysUntil, formatDate } from '@/utils/date';

export function formatSubscriptionDetails(
  sub: Stripe.Subscription,
  productMap: Map<string, string>,
) {
  const basePlan = sub.items.data[0];
  const addonPlans = sub.items.data.slice(1);

  const base = {
    name: productMap.get(basePlan.price.product as string) || 'Unknown Plan',
    price: basePlan.price.unit_amount ? basePlan.price.unit_amount / 100 : 0,
    currency: basePlan.price.currency,
    interval: basePlan.price.recurring?.interval,
    quantity: basePlan.quantity,
    nextBillingDate: formatDate(new Date(basePlan.current_period_end * 1000)),
    daysUntilNextBill: calculateDaysUntil(basePlan.current_period_end),
  };

  const addons = addonPlans.map((item) => ({
    name: productMap.get(item.price.product as string) || 'Unknown Addon',
    price: item.price.unit_amount ? item.price.unit_amount / 100 : 0,
    quantity: item.quantity,
    currency: item.price.currency,
    interval: item.price.recurring?.interval,
    nextBillingDate: formatDate(new Date(item.current_period_end * 1000)),
    daysUntilNextBill: calculateDaysUntil(item.current_period_end),
  }));

  return {
    id: sub.id,
    status: sub.status,
    plan: {
      ...base,
      addons,
    },
    cancelAtPeriodEnd: sub.cancel_at_period_end,
  };
}
