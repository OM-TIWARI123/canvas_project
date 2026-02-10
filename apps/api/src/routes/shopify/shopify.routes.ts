import { Hono } from 'hono';
import { validator } from '@/middlewares/validator.middleware';
import { isAuthenticated } from '@/middlewares/auth.middleware';

import { AppBindings } from '@/types/app.types';

import {
  oauthValidator,
  oauthCallbackValidator,
  statusValidator,
} from './shopify.validators';
import {
  oauthHandler,
  oauthCallbackHandler,
  statusHandler,
} from './shopify.handlers';

const shopify = new Hono<AppBindings>();

shopify.get(
  '/status',
  isAuthenticated,
  validator(statusValidator),
  statusHandler,
);
shopify.get('/oauth', isAuthenticated, validator(oauthValidator), oauthHandler);
shopify.get(
  '/oauth/callback',
  validator(oauthCallbackValidator),
  oauthCallbackHandler,
);

export default shopify;
