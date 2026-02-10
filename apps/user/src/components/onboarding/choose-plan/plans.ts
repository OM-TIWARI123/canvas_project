export enum PlanId {
  FREE = 'merchant/free',
  STARTER = 'merchant/starter',
  PRO = 'merchant/pro',
}

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  currency: string;
  popular: boolean;
  description: string;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: PlanId.FREE,
    name: 'Free',
    price: 0,
    currency: '$',
    popular: false,
    description: 'Try it out',
    features: [
      'Up to 5 products',
      'Shopify integration',
      'Basic mockup generator',
      'Community support',
    ],
  },
  {
    id: PlanId.STARTER,
    name: 'Starter',
    price: 29,
    currency: '$',
    popular: true,
    description: 'Perfect for getting started',
    features: [
      'Up to 50 products',
      'Shopify integration',
      '6 base product types',
      'Basic mockup generator',
      'Email support',
    ],
  },
  {
    id: PlanId.PRO,
    name: 'Pro',
    price: 79,
    currency: '$',
    popular: false,
    description: 'For growing businesses',
    features: [
      'Unlimited products',
      'Priority Shopify sync',
      'All base product types',
      'Advanced mockup generator',
      'Bulk order management',
      'Priority support',
      'Analytics dashboard',
    ],
  },
];

export function getPlanById(id: PlanId): Plan {
  const plan = plans.find((plan) => plan.id === id);
  if (!plan) {
    throw new Error(`Plan with id "${id}" not found`);
  }
  return plan;
}
