declare module 'global' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        VITE_API_URL: string;
        VITE_ADMIN_APP_URL: string;
        VITE_USER_APP_URL: string;
        VITE_SHOPIFY_CLIENT_ID: string;
        VITE_SHOPIFY_INSTALL_URL: string;
      }
    }
  }
}
