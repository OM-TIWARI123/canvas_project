import { ApiData } from '@/utils/types.util';

export interface SubscriptionPlan {
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year' | 'week' | 'day';
  quantity: number;
  nextBillingDate: string;
  daysUntilNextBill: number;
  addons: Array<{
    name: string;
    price: number;
    quantity: number;
    currency: string;
    interval: string;
    nextBillingDate: string;
    daysUntilNextBill: number;
  }>;
}

export interface Subscription {
  id: string;
  status: string;
  plan: SubscriptionPlan;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentMethod {
  id: string;
  brand?: string;
  cardNumber?: string;
  expiry: {
    month?: number;
    year?: number;
  };
  cardType?: string;
  billingDetails: {
    name?: string | null;
    email?: string | null;
    address?: {
      city?: string | null;
      country?: string | null;
      line1?: string | null;
      line2?: string | null;
      postal_code?: string | null;
      state?: string | null;
    } | null;
  };
}

export interface Invoice {
  id: string;
  number: string | null;
  amount: number;
  created: number;
  status: string | null;
  pdf: string | null;
  currency: string;
  description: string | null;
  dueDate: number | null;
  paidDate: number | null;
  customerEmail: string | null;
  customerName: string | null;
  url: string | null;
}

export type GetBillingDetailsRequest = ApiData<
  undefined,
  {
    data: Subscription[];
    manageSubscriptionUrl: string;
  }
>;

export type GetPaymentMethodsRequest = ApiData<
  undefined,
  {
    data: PaymentMethod[];
  }
>;

export type GetInvoicesRequest = ApiData<
  undefined,
  {
    data: Invoice[];
  }
>;
