import { AxiosError } from 'axios';
import { ApiError } from '@/utils/types.util';

export function sanitizeError(error: unknown) {
  if (error instanceof AxiosError) {
    return {
      title: (error.response?.data as ApiError)?.error,
      description: (error.response?.data as ApiError)?.message || error.message,
    };
  }

  if (error instanceof Error) {
    return {
      title: error.message,
    };
  }

  return {
    title: 'An unknown error occurred',
    description: 'Please try again later',
  };
}
