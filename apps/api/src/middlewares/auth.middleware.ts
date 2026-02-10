import { Context, Next } from 'hono';

import auth from '@/services/auth';
import HttpError from '@/utils/error/http-error';

import { AppBindings } from '@/types/app.types';

export async function addUserToContext(ctx: Context<AppBindings>, next: Next) {
  const session = await auth.api.getSession({ headers: ctx.req.raw.headers });

  if (!session) {
    ctx.set('user', null);
    ctx.set('session', null);
    return next();
  }

  ctx.set('user', session.user);
  ctx.set('session', session.session);

  return next();
}

export async function isAuthenticated(ctx: Context<AppBindings>, next: Next) {
  const user = ctx.get('user');
  const session = ctx.get('session');
  if (!user || !session) {
    throw new HttpError(401, 'You are not authenticated', 'UNAUTHORIZED');
  }

  return next();
}

export async function isAdmin(ctx: Context<AppBindings>, next: Next) {
  const user = ctx.get('user');
  if (!user) {
    throw new HttpError(401, 'Authentication required', 'UNAUTHORIZED');
  }

  if (user.role !== 'admin') {
    throw new HttpError(
      403,
      'Access denied. Admin privileges required.',
      'FORBIDDEN',
    );
  }

  return next();
}
