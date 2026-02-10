// Node Modules
import { useCallback } from 'react';
import { queryOptions } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import { ReactQueryKeys } from '@/types/react-query-keys';
import type {
  GetBillingDetailsRequest,
  GetPaymentMethodsRequest,
  GetInvoicesRequest,
} from './types';

// Re-export types for components to use
export type {
  Subscription,
  SubscriptionPlan,
  PaymentMethod,
  Invoice,
} from './types';

export function useBilling() {
  const api = useRequest();

  const getBillingDetails = useCallback(async () => {
    const response =
      await api.get<GetBillingDetailsRequest['response']>('/billing/details');
    return response.data.data;
  }, [api]);

  const getPaymentMethods = useCallback(async () => {
    const response = await api.get<GetPaymentMethodsRequest['response']>(
      '/billing/payment-methods',
    );
    return response.data.data;
  }, [api]);

  const getInvoices = useCallback(async () => {
    const response =
      await api.get<GetInvoicesRequest['response']>('/billing/invoices');
    return response.data.data;
  }, [api]);

  const billingDetailsQueryOptions = queryOptions({
    queryKey: [ReactQueryKeys.GET_BILLING_DETAILS],
    queryFn: getBillingDetails,
  });

  const paymentMethodsQueryOptions = queryOptions({
    queryKey: [ReactQueryKeys.GET_PAYMENT_METHODS],
    queryFn: getPaymentMethods,
  });

  const invoicesQueryOptions = queryOptions({
    queryKey: [ReactQueryKeys.GET_INVOICES],
    queryFn: getInvoices,
  });

  return {
    billingDetailsQueryOptions,
    paymentMethodsQueryOptions,
    invoicesQueryOptions,
  };
}
