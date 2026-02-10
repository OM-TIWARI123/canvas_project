import axios from 'axios';

export function api(
  headers: Record<string, string> = {},
  baseURL?: string,
  withCredentials: boolean = true,
) {
  return axios.create({
    baseURL: baseURL ?? `${import.meta.env.VITE_API_URL}/api`,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    withCredentials,
  });
}

interface ApiFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_URL;

  const url = new URL(`${baseUrl}/api${path}`);
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url.toString(), {
    method: options.method ?? 'GET',
    headers,
    body:
      options.body && options.method !== 'GET'
        ? JSON.stringify(options.body)
        : undefined,
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }

  return (await res.json()) as T;
}
