import { useRef } from 'react';
import { api } from '@/lib/api';

export function useRequest(
  headers: Record<string, string> = {},
  baseURL?: string,
  withCredentials: boolean = true,
) {
  const apiRef = useRef(api(headers, baseURL, withCredentials));

  return apiRef.current;
}
