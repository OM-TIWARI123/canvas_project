import app from '@/app';
import { serve } from '@hono/node-server';

serve({ fetch: app.fetch, port: 5000 }, (info) => {
  console.info(`Server is running on port ${info.port}`);
});
