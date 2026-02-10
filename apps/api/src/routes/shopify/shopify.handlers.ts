import env from '@/env';

import sendResponse from '@/utils/response';
import HttpError from '@/utils/error/http-error';
import { shopifyService } from '@/services/shopify';
import { shopifyDataService } from './shopify.service';

import type {
  StatusContext,
  OauthContext,
  OauthCallbackContext,
} from './shopify.validators';

export async function statusHandler(ctx: StatusContext) {
  const user = ctx.get('user')!;

  const connection = await shopifyDataService.findByUserId(user.id);

  return sendResponse(ctx, 200, 'Shopify connection status', {
    connected: !!connection && connection.isActive,
    shopDomain: connection?.shopDomain || null,
    shopName: connection?.shopName || null,
  });
}

export async function oauthHandler(ctx: OauthContext) {
  const user = ctx.get('user')!;
  const { shop } = ctx.req.valid('query');

  const isValidHmac = await shopifyService.validateHmac(ctx.req.raw.url);
  if (!isValidHmac) {
    throw new HttpError(401, 'Invalid HMAC signature', 'UNAUTHORIZED');
  }

  const authUrl = shopifyService.getOAuthUrl(shop, user.id);

  return ctx.redirect(authUrl);
}

export async function oauthCallbackHandler(ctx: OauthCallbackContext) {
  const { code, shop, state } = ctx.req.valid('query');

  const isValidHmac = await shopifyService.validateHmac(ctx.req.raw.url);
  if (!isValidHmac) {
    throw new HttpError(401, 'Invalid HMAC signature', 'UNAUTHORIZED');
  }

  const { accessToken, scopes } = await shopifyService.getAccessToken(
    shop,
    code,
  );
  const shopInfo = await shopifyService.getShopInfo(shop, accessToken);

  await shopifyDataService.upsertConnection({
    userId: state,
    shopDomain: shop,
    shopName: shopInfo.name,
    shopCurrency: shopInfo.currency,
    shopCountry: shopInfo.country,
    shopCountryCode: shopInfo.countryCode,
    accessToken,
    scopes,
  });

  return ctx.redirect(`${env.USER_APP_URL}/onboarding`);
}
