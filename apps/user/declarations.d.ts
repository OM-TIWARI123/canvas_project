import { AxiosError } from 'axios';
import { ApiError } from '@/utils/types.util';
import { QueryKey } from '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiError>;
    mutationMeta: {
      successMessage?: string;
      successDescription?: string;
      errorMessage?: string;
      errorDescription?: string;
      invalidateQueries?: QueryKey;
      removeQueries?: QueryKey;
    };
  }
}
