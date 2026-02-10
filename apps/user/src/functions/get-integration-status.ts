import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { apiFetch } from '@/lib/api';

import type { ShopifyStatusRequest } from '@/hooks/useShopify/types';

export const getShopifyStatus = createServerFn().handler(async () => {
  try {
    const response = await apiFetch<ShopifyStatusRequest['response']>(
      '/shopify/status',
      {
        method: 'GET',
        headers: getRequestHeaders(),
      },
    );

    return response.data;
  } catch {
    return { connected: false, shopDomain: null, shopName: null };
  }
});
