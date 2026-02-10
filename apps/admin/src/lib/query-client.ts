import { toast } from '@repo/ui/lib/sonner';
import { MutationCache, QueryClient } from '@tanstack/react-query';

import { sanitizeError } from '@/utils/error.utils';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: function (_data, _variables, _context, mutationMeta) {
      if (mutationMeta?.meta?.successMessage) {
        toast.success(mutationMeta.meta.successMessage, {
          description: mutationMeta.meta.successDescription,
        });
      }
    },
    onError: function (error, _variables, _context, mutationMeta) {
      if (mutationMeta?.meta?.errorMessage) {
        toast.error(mutationMeta.meta.errorMessage, {
          description: mutationMeta.meta.errorDescription,
        });
      } else {
        const err = sanitizeError(error);
        toast.error(err.title, {
          description: err.description,
        });
      }
    },
    onSettled: function (_data, _error, _variables, _context, mutationMeta) {
      if (mutationMeta?.meta?.invalidateQueries) {
        for (const key of mutationMeta.meta.invalidateQueries) {
          queryClient.invalidateQueries({ queryKey: [key] });
        }
      }
      if (mutationMeta?.meta?.removeQueries) {
        for (const key of mutationMeta.meta.removeQueries) {
          queryClient.removeQueries({ queryKey: [key] });
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  },
});
