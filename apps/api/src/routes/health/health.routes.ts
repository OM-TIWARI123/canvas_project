import { Hono } from 'hono';

import sendResponse from '@/utils/response';

import { AppBindings } from '@/types/app.types';

const health = new Hono<AppBindings>();

health.get('/check', (ctx) => {
  return sendResponse(ctx, 200, 'ok');
});

export default health;
