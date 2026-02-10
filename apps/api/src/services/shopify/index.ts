import env from '@/env';

import axios from 'axios';
import crypto from 'crypto';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion, Shopify } from '@shopify/shopify-api';

export interface ShopifyServiceProps {
  hostName: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  apiUrl: string;
}

export class ShopifyService {
  private shopify: Shopify;
  private clientId: string;
  private clientSecret: string;
  private scopes: string[];
  private apiUrl: string;

  constructor(props: ShopifyServiceProps) {
    this.clientId = props.clientId;
    this.clientSecret = props.clientSecret;
    this.scopes = props.scopes;
    this.apiUrl = props.apiUrl;

    this.shopify = shopifyApi({
      apiKey: props.clientId,
      apiSecretKey: props.clientSecret,
      scopes: props.scopes,
      hostName: props.hostName,
      apiVersion: ApiVersion.January25,
      isEmbeddedApp: false,
      future: {
        customerAddressDefaultFix: true,
        unstable_managedPricingSupport: true,
      },
    });
  }

  getOAuthUrl(shop: string, state: string) {
    const redirectUri = `${this.apiUrl}/api/shopify/oauth/callback`;
    const scopes = this.scopes.join(',');

    return (
      `https://${shop}/admin/oauth/authorize?` +
      `client_id=${this.clientId}` +
      `&scope=${scopes}` +
      `&state=${state}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`
    );
  }

  async validateHmac(url: string) {
    const params = new URL(url).searchParams;

    const hmac = params.get('hmac');
    if (!hmac) return false;

    params.delete('hmac');
    params.delete('signature');

    const message = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const generated = crypto
      .createHmac('sha256', this.clientSecret)
      .update(message)
      .digest('hex');

    try {
      return crypto.timingSafeEqual(Buffer.from(generated), Buffer.from(hmac));
    } catch {
      return false;
    }
  }

  async getAccessToken(shop: string, code: string) {
    const response = await axios.post<{
      access_token: string;
      scope: string;
    }>(`https://${shop}/admin/oauth/access_token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
    });

    return {
      accessToken: response.data.access_token,
      scopes: response.data.scope,
    };
  }

  getClient() {
    return this.shopify;
  }

  async getShopInfo(shop: string, accessToken: string) {
    const response = await axios.get<{
      shop: {
        name: string;
        currency: string;
        country: string;
        country_code: string;
      };
    }>(`https://${shop}/admin/api/${ApiVersion.January25}/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });

    return {
      name: response.data.shop.name,
      currency: response.data.shop.currency,
      country: response.data.shop.country,
      countryCode: response.data.shop.country_code,
    };
  }
}

export const shopifyService = new ShopifyService({
  hostName: env.SHOPIFY_HOSTNAME,
  clientId: env.SHOPIFY_CLIENT_ID,
  clientSecret: env.SHOPIFY_CLIENT_SECRET,
  scopes: env.SHOPIFY_SCOPES.split(','),
  apiUrl: env.API_URL,
});
