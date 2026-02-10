import { relations } from 'drizzle-orm';
import {
  uuid,
  text,
  index,
  boolean,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { userSchema } from './auth.schema';

export const shopifyConnectionSchema = pgTable(
  'shopify_connection',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: text('user_id')
      .notNull()
      .references(() => userSchema.id, { onDelete: 'cascade' }),

    shopDomain: varchar('shop_domain', { length: 255 }).notNull().unique(),

    shopName: varchar('shop_name', { length: 255 }),
    shopCurrency: varchar('shop_currency', { length: 10 }),
    shopCountry: varchar('shop_country', { length: 100 }),
    shopCountryCode: varchar('shop_country_code', { length: 10 }),

    accessToken: text('access_token').notNull(),
    scopes: varchar('scopes', { length: 1000 }),

    isActive: boolean('is_active').default(true),
    installedAt: timestamp('installed_at', { mode: 'string' }).defaultNow(),
    uninstalledAt: timestamp('uninstalled_at', { mode: 'string' }),

    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('shopify_connection_user_id_idx').on(table.userId),
    index('shopify_connection_shop_domain_idx').on(table.shopDomain),
  ],
);

export const shopifyConnectionRelations = relations(
  shopifyConnectionSchema,
  ({ one }) => ({
    user: one(userSchema, {
      fields: [shopifyConnectionSchema.userId],
      references: [userSchema.id],
    }),
  }),
);
