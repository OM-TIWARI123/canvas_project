import debounce from 'lodash.debounce';
import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useEffect, useRef } from 'react';

import { usePagination } from './usePagination';

export function useSearch(key?: string) {
  const { handlePageChange } = usePagination();

  const [search, setSearch] = useQueryState(key ?? 'q', parseAsString);

  const debouncedSearchUpdateRef = useRef(
    debounce((search: string | null) => {
      setSearch(search);
    }, 400),
  );

  useEffect(() => {
    const searchUpdateRef = debouncedSearchUpdateRef.current;
    return () => {
      searchUpdateRef.cancel();
    };
  }, []);

  const handleSearch = useCallback((search: string) => {
    if (search.length === 0) {
      debouncedSearchUpdateRef.current(null);
    } else {
      debouncedSearchUpdateRef.current(search);
    }
    handlePageChange(1);
  }, []);

  return {
    search: search === null ? undefined : search,
    setSearch: handleSearch,
  };
}
