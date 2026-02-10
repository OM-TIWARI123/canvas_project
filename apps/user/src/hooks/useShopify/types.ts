import { ApiData } from '@/utils/types.util';

export type InitiateShopifyOAuthRequest = ApiData<
  {
    shop: string;
  },
  undefined
>;

export type ShopifyStatusRequest = ApiData<
  undefined,
  {
    connected: boolean;
    shopDomain: string | null;
    shopName: string | null;
  }
>;
