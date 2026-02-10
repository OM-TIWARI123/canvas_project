/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ADMIN_APP_URL: string;
  readonly VITE_USER_APP_URL: string;
  readonly VITE_SHOPIFY_CLIENT_ID: string;
  readonly VITE_SHOPIFY_INSTALL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
