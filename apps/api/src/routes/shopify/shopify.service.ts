import db from '@/db';

import { eq } from 'drizzle-orm';
import { shopifyConnectionSchema } from '@services/database/schemas';

export class ShopifyDataService {
  async upsertConnection(data: {
    userId: string;
    shopDomain: string;
    shopName?: string;
    shopCurrency?: string;
    shopCountry?: string;
    shopCountryCode?: string;
    accessToken: string;
    scopes: string;
  }) {
    const [result] = await db
      .insert(shopifyConnectionSchema)
      .values({
        userId: data.userId,

        shopDomain: data.shopDomain,

        shopName: data.shopName,
        shopCurrency: data.shopCurrency,
        shopCountry: data.shopCountry,
        shopCountryCode: data.shopCountryCode,

        accessToken: data.accessToken,
        scopes: data.scopes,

        isActive: true,
      })
      .onConflictDoUpdate({
        target: shopifyConnectionSchema.shopDomain,
        set: {
          accessToken: data.accessToken,
          scopes: data.scopes,

          shopName: data.shopName,
          shopCurrency: data.shopCurrency,
          shopCountry: data.shopCountry,
          shopCountryCode: data.shopCountryCode,

          isActive: true,
          uninstalledAt: null,
          updatedAt: new Date().toISOString(),
        },
      })
      .returning();

    return result;
  }

  async findByUserId(userId: string) {
    return db.query.shopifyConnectionSchema.findFirst({
      where: eq(shopifyConnectionSchema.userId, userId),
    });
  }
}

export const shopifyDataService = new ShopifyDataService();
