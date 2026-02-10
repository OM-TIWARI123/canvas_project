import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export default function sendResponse(
  c: Context,
  statusCode: ContentfulStatusCode,
  message: string,
  data?: Record<string, unknown>,
) {
  return c.json(
    {
      success: statusCode < 400,
      message,
      ...(data && { data }),
    },
    statusCode,
  );
}
