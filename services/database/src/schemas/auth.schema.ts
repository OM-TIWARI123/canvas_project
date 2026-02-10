import { relations } from 'drizzle-orm';
import {
  text,
  index,
  boolean,
  pgTable,
  varchar,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';

export const userSchema = pgTable(
  'user',
  {
    id: text('id').notNull().primaryKey(),

    stripeCustomerId: text('stripe_customer_id'),

    name: varchar('name', { length: 255 }).notNull(),
    role: varchar('role', { length: 255 }).default('user'),
    image: varchar('image', { length: 255 }),

    banned: boolean('banned').default(false),
    banReason: varchar('ban_reason', { length: 255 }),
    banExpires: timestamp('ban_expires', { mode: 'string' }),

    email: varchar('email', { length: 255 }).notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),

    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('user_email_idx').on(table.email)],
);

export const sessionSchema = pgTable(
  'session',
  {
    id: text('id').notNull().primaryKey(),

    userId: text('user_id')
      .notNull()
      .references(() => userSchema.id),

    token: varchar('token', { length: 255 }).notNull().unique(),
    impersonatedById: text('impersonated_by_id').references(
      () => userSchema.id,
    ),
    expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
    ipAddress: varchar('ip_address', { length: 255 }).notNull(),
    userAgent: varchar('user_agent', { length: 255 }).notNull(),

    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('session_token_idx').on(table.token),
    index('session_user_id_idx').on(table.userId),
  ],
);

export const accountSchema = pgTable(
  'account',
  {
    id: text('id').notNull().primaryKey(),

    userId: text('user_id')
      .notNull()
      .references(() => userSchema.id),
    accountId: varchar('account_id', { length: 255 }).notNull(),
    providerId: varchar('provider_id', { length: 255 }).notNull(),

    accessToken: varchar('access_token', { length: 1000 }),
    refreshToken: varchar('refresh_token', { length: 1000 }),
    accessTokenExpiresAt: timestamp('access_token_expires_at', {
      mode: 'string',
    }),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
      mode: 'string',
    }),

    scope: varchar('scope', { length: 500 }),
    idToken: varchar('id_token', { length: 2000 }),
    password: varchar('password', { length: 255 }),

    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('account_user_id_idx').on(table.userId)],
);

export const verificationSchema = pgTable(
  'verification',
  {
    id: text('id').notNull().primaryKey(),

    identifier: varchar('identifier', { length: 255 }).notNull(),
    value: varchar('value', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),

    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
);

export const subscriptionSchema = pgTable(
  'subscription',
  {
    id: text('id').notNull().primaryKey(),

    plan: varchar('plan', { length: 255 }).notNull(),
    referenceId: text('reference_id').notNull(),
    stripeCustomerId: text('stripe_customer_id'),
    stripeSubscriptionId: text('stripe_subscription_id'),

    status: varchar('status', { length: 255 }).notNull(),
    periodStart: timestamp('period_start', { mode: 'string' }),
    periodEnd: timestamp('period_end', { mode: 'string' }),
    cancelAtPeriodEnd: boolean('cancel_at_period_end'),

    seats: integer('seats'),

    trialStart: timestamp('trial_start', { mode: 'string' }),
    trialEnd: timestamp('trial_end', { mode: 'string' }),

    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('subscription_reference_id_idx').on(table.referenceId),
    index('subscription_stripe_customer_id_idx').on(table.stripeCustomerId),
    index('subscription_stripe_subscription_id_idx').on(
      table.stripeSubscriptionId,
    ),
  ],
);

export const userRelations = relations(userSchema, ({ many }) => ({
  sessions: many(sessionSchema),
  accounts: many(accountSchema),
  subscriptions: many(subscriptionSchema),
}));

export const sessionRelations = relations(sessionSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [sessionSchema.userId],
    references: [userSchema.id],
  }),
}));

export const accountRelations = relations(accountSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [accountSchema.userId],
    references: [userSchema.id],
  }),
}));

export const subscriptionRelations = relations(
  subscriptionSchema,
  ({ one }) => ({
    user: one(userSchema, {
      fields: [subscriptionSchema.referenceId],
      references: [userSchema.id],
    }),
  }),
);
